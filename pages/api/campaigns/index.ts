import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (req.method === 'GET') {
      const campaigns = await prisma.campaign.findMany({
        where: {
          userId: user.id
        },
        include: {
          analytics: {
            select: {
              totalSent: true,
              totalOpened: true,
              totalClicked: true
            }
          },
          _count: {
            select: {
              recipients: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      // Transform the data to match the component interface
      const transformedCampaigns = campaigns.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        subject: campaign.subject,
        status: campaign.status,
        recipients: campaign._count.recipients,
        openRate: campaign.analytics && campaign.analytics.totalSent > 0 
          ? Math.round((campaign.analytics.totalOpened / campaign.analytics.totalSent) * 100)
          : undefined,
        clickRate: campaign.analytics && campaign.analytics.totalSent > 0 
          ? Math.round((campaign.analytics.totalClicked / campaign.analytics.totalSent) * 100)
          : undefined,
        sentAt: campaign.sentAt?.toISOString(),
        scheduledAt: campaign.scheduledAt?.toISOString(),
        createdAt: campaign.createdAt.toISOString()
      }))

      return res.status(200).json(transformedCampaigns)
    }

    if (req.method === 'POST') {
      const { 
        name, 
        subject, 
        content, 
        templateId,
        segmentId,
        scheduledAt 
      } = req.body

      if (!name || !subject) {
        return res.status(400).json({ error: 'Name and subject are required' })
      }

      // Create the campaign
      const campaign = await prisma.campaign.create({
        data: {
          name,
          subject,
          content: content || {},
          htmlContent: '',
          templateId: templateId || null,
          segmentId: segmentId || null,
          status: scheduledAt ? 'scheduled' : 'draft',
          scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
          userId: user.id
        }
      })

      return res.status(201).json({
        id: campaign.id,
        name: campaign.name,
        subject: campaign.subject,
        status: campaign.status,
        recipients: 0,
        createdAt: campaign.createdAt.toISOString()
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Campaigns API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
