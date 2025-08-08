import { useState } from 'react'
import { ArrowLeft, Save, Send, Calendar, Eye, FileText, Users, Target, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  emoji: string
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
  const [success, setSuccess] = useState('')
  const [step, setStep] = useState(1) // 1: Details, 2: Content, 3: Recipients, 4: Send
  const router = useRouter()

  const templates: Template[] = [
    {
      id: 'launch',
      name: 'Product Launch',
      description: 'Announce your new product or course',
      category: 'announcement',
      preview: 'Clean layout with hero image and clear CTA',
      emoji: '🚀'
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      description: 'Regular updates for your audience',
      category: 'newsletter',
      preview: 'Simple text-focused design with sections',
      emoji: '📰'
    },
    {
      id: 'update',
      name: 'Product Update',
      description: 'Share updates and improvements',
      category: 'update',
      preview: 'Feature highlights with visual elements',
      emoji: '🔄'
    }
  ]

  const steps = [
    { id: 1, name: 'Details', icon: FileText, description: 'Campaign info' },
    { id: 2, name: 'Content', icon: Eye, description: 'Email content' },
    { id: 3, name: 'Recipients', icon: Users, description: 'Target audience' },
    { id: 4, name: 'Send', icon: Send, description: 'Review & send' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(formData.name && formData.subject && formData.fromName && formData.fromEmail)
      case 2:
        return !!(formData.templateId && formData.content)
      case 3:
        return true // For now, no specific validation
      default:
        return true
    }
  }

  const handleSubmit = async (action: 'draft' | 'schedule' | 'send') => {
    setIsSubmitting(true)
    setError('')
    setSuccess('')

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
        setSuccess(`Campaign ${action === 'send' ? 'sent' : action === 'schedule' ? 'scheduled' : 'saved as draft'} successfully!`)
        setTimeout(() => {
          router.push('/dashboard/campaigns')
        }, 1500)
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

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      setError('Please fill in all required fields before continuing.')
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    setError('')
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
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Template</h3>
              <p className="text-sm text-gray-600">Select a template that matches your campaign type</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    formData.templateId === template.id
                      ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, templateId: template.id }))}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{template.emoji}</span>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    </div>
                    {formData.templateId === template.id && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <p className="text-xs text-gray-500 bg-gray-100 rounded-lg p-2">{template.preview}</p>
                </div>
              ))}
            </div>

            {formData.templateId && (
              <div className="bg-gray-50 rounded-xl p-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-3">
                  Email Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={12}
                  required
                  className="input-field font-mono text-sm"
                  placeholder="Write your email content here... You can use HTML or plain text."
                  value={formData.content}
                  onChange={handleInputChange}
                />
                <p className="mt-2 text-sm text-gray-500">
                  💡 Tip: Keep it personal and engaging. Most creators see better results with shorter, conversational emails.
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
    <div className="min-h-screen bg-gray-50">
      {/* Header with progress */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link
                href="/dashboard/campaigns"
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Create Campaign</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {step} of {steps.length}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="pb-6">
            <div className="flex items-center">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    step >= stepItem.id 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {step > stepItem.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <stepItem.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${step >= stepItem.id ? 'text-primary-600' : 'text-gray-400'}`}>
                      {stepItem.name}
                    </div>
                    <div className="text-xs text-gray-500">{stepItem.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 mx-4 h-0.5 ${step > stepItem.id ? 'bg-primary-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start animate-slide-up">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start animate-slide-up">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <p className="text-sm text-green-700 mt-1">{success}</p>
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-4">
            {step < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(step)}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => handleSubmit('draft')}
                  disabled={isSubmitting}
                  className="btn-secondary disabled:opacity-50 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('send')}
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Campaign
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
