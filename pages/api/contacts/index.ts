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
      const contacts = await prisma.contact.findMany({
        where: {
          userId: user.id
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          status: true,
          source: true,
          tags: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      // Transform the data to match the component interface
      const transformedContacts = contacts.map(contact => ({
        ...contact,
        tags: contact.tags || []
      }))

      return res.status(200).json(transformedContacts)
    }

    if (req.method === 'POST') {
      const { 
        email, 
        firstName, 
        lastName, 
        phone, 
        tags = [],
        source = 'manual'
      } = req.body

      if (!email) {
        return res.status(400).json({ error: 'Email is required' })
      }

      // Check if contact already exists
      const existingContact = await prisma.contact.findFirst({
        where: {
          userId: user.id,
          email: email.toLowerCase()
        }
      })

      if (existingContact) {
        return res.status(400).json({ error: 'Contact with this email already exists' })
      }

      // Create the contact
      const contact = await prisma.contact.create({
        data: {
          email: email.toLowerCase(),
          firstName: firstName || null,
          lastName: lastName || null,
          phone: phone || null,
          status: 'subscribed',
          source,
          tags: tags || [],
          userId: user.id
        }
      })

      // Fetch the complete contact
      const contactWithTags = await prisma.contact.findUnique({
        where: { id: contact.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          status: true,
          source: true,
          tags: true,
          createdAt: true
        }
      })

      const transformedContact = {
        ...contactWithTags,
        tags: contactWithTags?.tags || []
      }

      return res.status(201).json(transformedContact)
    }

    if (req.method === 'PUT') {
      const { contactId, ...updateData } = req.body

      if (!contactId) {
        return res.status(400).json({ error: 'Contact ID is required' })
      }

      // Verify contact belongs to user
      const existingContact = await prisma.contact.findFirst({
        where: {
          id: contactId,
          userId: user.id
        }
      })

      if (!existingContact) {
        return res.status(404).json({ error: 'Contact not found' })
      }

      // Update contact
      const updatedContact = await prisma.contact.update({
        where: { id: contactId },
        data: {
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          phone: updateData.phone,
          status: updateData.status
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          status: true,
          source: true,
          tags: true,
          createdAt: true
        }
      })

      const transformedContact = {
        ...updatedContact,
        tags: updatedContact.tags || []
      }

      return res.status(200).json(transformedContact)
    }

    if (req.method === 'DELETE') {
      const { contactId } = req.body

      if (!contactId) {
        return res.status(400).json({ error: 'Contact ID is required' })
      }

      // Verify contact belongs to user
      const existingContact = await prisma.contact.findFirst({
        where: {
          id: contactId,
          userId: user.id
        }
      })

      if (!existingContact) {
        return res.status(404).json({ error: 'Contact not found' })
      }

      // Delete contact (this will cascade delete related records)
      await prisma.contact.delete({
        where: { id: contactId }
      })

      return res.status(200).json({ message: 'Contact deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Contacts API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
