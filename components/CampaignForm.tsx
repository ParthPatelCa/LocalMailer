import { useState } from 'react'
import { ArrowLeft, Save, Send, Calendar, Eye, FileText, Users, Target } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
}

export default function CampaignForm() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    previewText: '',
    templateId: '',
    segmentId: '',
    content: '',
    scheduledAt: '',
    fromName: '',
    fromEmail: '',
    replyTo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1: Details, 2: Content, 3: Recipients, 4: Send
  const router = useRouter()

  const templates: Template[] = [
    {
      id: 'launch',
      name: 'Product Launch',
      description: 'Announce your new product or course',
      category: 'announcement',
      preview: 'Clean layout with hero image and clear CTA'
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      description: 'Regular updates for your audience',
      category: 'newsletter',
      preview: 'Simple text-focused design with sections'
    },
    {
      id: 'update',
      name: 'Product Update',
      description: 'Share updates and improvements',
      category: 'update',
      preview: 'Feature highlights with visual elements'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (action: 'draft' | 'schedule' | 'send') => {
    setIsSubmitting(true)
    setError('')

    try {
      const payload = {
        ...formData,
        status: action === 'send' ? 'sending' : action === 'schedule' ? 'scheduled' : 'draft'
      }

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        router.push('/dashboard/campaigns')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create campaign')
      }
    } catch (error) {
      setError('Failed to create campaign. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Campaign Details</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-field mt-1"
                  placeholder="Q1 Product Update"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Internal name for this campaign
                </p>
              </div>

              <div>
                <label htmlFor="fromName" className="block text-sm font-medium text-gray-700">
                  From Name
                </label>
                <input
                  type="text"
                  id="fromName"
                  name="fromName"
                  className="input-field mt-1"
                  placeholder="Your Name"
                  value={formData.fromName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Email Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="input-field mt-1"
                placeholder="🚀 Exciting updates from [Your Project]"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="previewText" className="block text-sm font-medium text-gray-700">
                Preview Text
              </label>
              <input
                type="text"
                id="previewText"
                name="previewText"
                className="input-field mt-1"
                placeholder="Quick preview text that appears in email clients..."
                value={formData.previewText}
                onChange={handleInputChange}
              />
              <p className="mt-1 text-sm text-gray-500">
                This text appears next to the subject line in email clients
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Choose Template</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.templateId === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, templateId: template.id }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <p className="text-xs text-gray-500">{template.preview}</p>
                </div>
              ))}
            </div>

            {formData.templateId && (
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Email Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={12}
                  className="input-field mt-1"
                  placeholder="Write your email content here..."
                  value={formData.content}
                  onChange={handleInputChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  You can use Markdown formatting or HTML
                </p>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Select Recipients</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">All Subscribers</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Send to all active contacts (estimated: 1,234 recipients)
              </p>
            </div>

            <div>
              <label htmlFor="segmentId" className="block text-sm font-medium text-gray-700">
                Or choose a segment
              </label>
              <select
                id="segmentId"
                name="segmentId"
                className="input-field mt-1"
                value={formData.segmentId}
                onChange={handleInputChange}
              >
                <option value="">Send to all contacts</option>
                <option value="newsletter-subscribers">Newsletter Subscribers (892)</option>
                <option value="course-customers">Course Customers (156)</option>
                <option value="engaged-users">Engaged Users (445)</option>
              </select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review & Send</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Campaign Details</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Name:</strong> {formData.name}</li>
                    <li><strong>Subject:</strong> {formData.subject}</li>
                    <li><strong>From:</strong> {formData.fromName || 'Your Name'}</li>
                    <li><strong>Template:</strong> {templates.find(t => t.id === formData.templateId)?.name || 'None'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recipients</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Segment:</strong> {formData.segmentId || 'All Contacts'}</li>
                    <li><strong>Estimated reach:</strong> 1,234 contacts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
                Schedule for later (optional)
              </label>
              <input
                type="datetime-local"
                id="scheduledAt"
                name="scheduledAt"
                className="input-field mt-1"
                value={formData.scheduledAt}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Link>
      </div>

      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Create New Campaign
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Design and send emails to your audience.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <nav className="flex items-center justify-center" aria-label="Progress">
          <ol className="flex items-center space-x-5">
            {[
              { number: 1, name: 'Details' },
              { number: 2, name: 'Content' },
              { number: 3, name: 'Recipients' },
              { number: 4, name: 'Send' }
            ].map((stepItem, index) => (
              <li key={stepItem.name} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= stepItem.number
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {stepItem.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= stepItem.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepItem.name}
                </span>
                {index < 3 && (
                  <div className="ml-5 w-8 h-0.5 bg-gray-300"></div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {renderStep()}

          <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {step === 4 ? (
                <>
                  <button
                    onClick={() => handleSubmit('draft')}
                    disabled={isSubmitting}
                    className="btn-outline"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </button>
                  
                  {formData.scheduledAt ? (
                    <button
                      onClick={() => handleSubmit('schedule')}
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Campaign
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmit('send')}
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setStep(Math.min(4, step + 1))}
                  disabled={
                    (step === 1 && (!formData.name || !formData.subject)) ||
                    (step === 2 && !formData.templateId)
                  }
                  className="btn-primary"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
