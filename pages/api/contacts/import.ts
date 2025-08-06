import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface ParsedContact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  tags?: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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

    // Parse the uploaded file
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filter: ({ mimetype }) => {
        return mimetype === 'text/csv' || mimetype === 'application/csv'
      }
    })

    const [fields, files] = await form.parse(req)
    const file = Array.isArray(files.file) ? files.file[0] : files.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Read and parse CSV
    const csvContent = fs.readFileSync(file.filepath, 'utf-8')
    const lines = csvContent.split('\n').filter(line => line.trim())

    if (lines.length < 2) {
      return res.status(400).json({ error: 'CSV file must contain at least a header row and one data row' })
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''))
    const emailIndex = headers.findIndex(h => h.includes('email'))

    if (emailIndex === -1) {
      return res.status(400).json({ error: 'CSV file must contain an email column' })
    }

    const firstNameIndex = headers.findIndex(h => h.includes('first') && h.includes('name'))
    const lastNameIndex = headers.findIndex(h => h.includes('last') && h.includes('name'))
    const phoneIndex = headers.findIndex(h => h.includes('phone'))
    const tagsIndex = headers.findIndex(h => h.includes('tag'))

    // Parse contacts
    const contacts: ParsedContact[] = []
    const errors: string[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const email = values[emailIndex]?.toLowerCase()

      if (!email || !email.includes('@')) {
        errors.push(`Row ${i + 1}: Invalid email address`)
        continue
      }

      const contact: ParsedContact = {
        email,
        firstName: firstNameIndex >= 0 ? values[firstNameIndex] || undefined : undefined,
        lastName: lastNameIndex >= 0 ? values[lastNameIndex] || undefined : undefined,
        phone: phoneIndex >= 0 ? values[phoneIndex] || undefined : undefined,
        tags: tagsIndex >= 0 && values[tagsIndex] 
          ? values[tagsIndex].split(';').map(t => t.trim()).filter(t => t)
          : undefined
      }

      contacts.push(contact)
    }

    // Import contacts
    let successful = 0
    let failed = 0
    let duplicates = 0

    for (const contactData of contacts) {
      try {
        // Check if contact already exists
        const existingContact = await prisma.contact.findFirst({
          where: {
            userId: user.id,
            email: contactData.email
          }
        })

        if (existingContact) {
          duplicates++
          continue
        }

        // Create the contact
        const contact = await prisma.contact.create({
          data: {
            email: contactData.email,
            firstName: contactData.firstName || null,
            lastName: contactData.lastName || null,
            phone: contactData.phone || null,
            status: 'subscribed',
            source: 'import',
            tags: contactData.tags || [],
            userId: user.id
          }
        })

        successful++
      } catch (error) {
        console.error(`Failed to import contact ${contactData.email}:`, error)
        failed++
      }
    }

    // Clean up uploaded file
    fs.unlinkSync(file.filepath)

    return res.status(200).json({
      successful,
      failed,
      duplicates,
      errors: errors.slice(0, 10) // Return first 10 errors
    })

  } catch (error) {
    console.error('Import error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
