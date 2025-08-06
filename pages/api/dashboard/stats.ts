import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const userId = (session.user as any).id

    // Get stats in parallel
    const [
      totalContacts,
      totalCampaigns,
      campaignAnalytics,
    ] = await Promise.all([
      prisma.contact.count({
        where: { 
          userId,
          status: 'subscribed'
        }
      }),
      prisma.campaign.count({
        where: { 
          userId,
          status: 'sent'
        }
      }),
      prisma.campaignAnalytics.aggregate({
        where: {
          campaign: {
            userId
          }
        },
        _sum: {
          totalSent: true,
          totalOpened: true,
        }
      }),
    ])

    const totalSent = campaignAnalytics._sum.totalSent || 0
    const totalOpened = campaignAnalytics._sum.totalOpened || 0
    const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0

    const stats = {
      totalContacts,
      totalCampaigns,
      totalSent,
      openRate: Number(openRate.toFixed(1)),
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
