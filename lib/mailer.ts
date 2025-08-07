// Email service provider abstraction for LocalMailer
// Based on PRD requirements: Resend (primary) + SES (fallback)

export interface EmailProvider {
  sendEmail(params: SendEmailParams): Promise<SendEmailResult>
  sendBulkEmail(params: SendBulkEmailParams): Promise<SendBulkEmailResult>
}

export interface SendEmailParams {
  to: string
  from: string
  fromName?: string
  replyTo?: string
  subject: string
  html: string
  text?: string
  trackOpens?: boolean
  trackClicks?: boolean
  campaignId?: string
  contactId?: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface SendBulkEmailParams {
  emails: SendEmailParams[]
  campaignId: string
}

export interface SendBulkEmailResult {
  success: boolean
  sent: number
  failed: number
  errors?: string[]
}

// Resend provider implementation
export class ResendProvider implements EmailProvider {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY!
  }

  async sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: params.fromName ? `${params.fromName} <${params.from}>` : params.from,
          to: [params.to],
          reply_to: params.replyTo,
          subject: params.subject,
          html: params.html,
          text: params.text,
          tags: [
            { name: 'campaign_id', value: params.campaignId || 'manual' },
            { name: 'contact_id', value: params.contactId || 'unknown' }
          ].filter(tag => tag.value !== 'manual' && tag.value !== 'unknown')
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        return { success: false, error }
      }

      const result = await response.json()
      return { success: true, messageId: result.id }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendBulkEmail(params: SendBulkEmailParams): Promise<SendBulkEmailResult> {
    // For Resend, we'll send emails in batches to avoid rate limits
    const batchSize = 50
    const batches = []
    
    for (let i = 0; i < params.emails.length; i += batchSize) {
      batches.push(params.emails.slice(i, i + batchSize))
    }

    let sent = 0
    let failed = 0
    const errors: string[] = []

    for (const batch of batches) {
      const promises = batch.map(email => this.sendEmail(email))
      const results = await Promise.allSettled(promises)

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          sent++
        } else {
          failed++
          const error = result.status === 'rejected' 
            ? result.reason 
            : result.value.error
          errors.push(`${batch[index].to}: ${error}`)
        }
      })

      // Add delay between batches to respect rate limits
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    return {
      success: failed === 0,
      sent,
      failed,
      errors: errors.length > 0 ? errors : undefined,
    }
  }
}

// Mock email provider for development
export class MockEmailProvider implements EmailProvider {
  async sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
    // Mock successful email sending for development
    console.log(`[MOCK EMAIL] Sending to: ${params.to}`)
    console.log(`[MOCK EMAIL] Subject: ${params.subject}`)
    console.log(`[MOCK EMAIL] From: ${params.fromName} <${params.from}>`)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return { 
      success: true, 
      messageId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` 
    }
  }

  async sendBulkEmail(params: SendBulkEmailParams): Promise<SendBulkEmailResult> {
    console.log(`[MOCK EMAIL] Bulk sending campaign: ${params.campaignId}`)
    console.log(`[MOCK EMAIL] Recipients: ${params.emails.length}`)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      success: true,
      sent: params.emails.length,
      failed: 0,
    }
  }
}

// Export the appropriate provider based on environment
export const emailProvider = process.env.RESEND_API_KEY && 
                              process.env.RESEND_API_KEY !== 'development-token'
  ? new ResendProvider()
  : new MockEmailProvider()

// Helper function to validate email addresses
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to extract name from email
export function extractNameFromEmail(email: string): string {
  const localPart = email.split('@')[0]
  return localPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
