import { useState, useEffect } from 'react'
import { Plus, Send, Calendar, BarChart3, MoreVertical, Eye, Edit, Copy } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: string
  name: string
  subject: string
  status: string
  recipients: number
  openRate?: number
  clickRate?: number
  sentAt?: string
  scheduledAt?: string
  createdAt: string
}

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      if (response.ok) {
        const data = await response.json()
        setCampaigns(data)
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'sending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    return selectedStatus === 'all' || campaign.status === selectedStatus
  })

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Campaigns
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Create and manage your email marketing campaigns.
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <Link
            href="/dashboard/campaigns/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="stats-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Sent</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {campaigns.filter(c => c.status === 'sent').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Scheduled</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {campaigns.filter(c => c.status === 'scheduled').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Edit className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Drafts</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {campaigns.filter(c => c.status === 'draft').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Avg. Open Rate</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {campaigns.filter(c => c.openRate).length > 0 
                    ? `${Math.round(
                        campaigns.filter(c => c.openRate).reduce((acc, c) => acc + (c.openRate || 0), 0) / 
                        campaigns.filter(c => c.openRate).length
                      )}%`
                    : '0%'
                  }
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">All Campaigns</h3>
            <select
              className="input-field w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sending">Sending</option>
              <option value="sent">Sent</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Send className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns</h3>
            <p className="mt-1 text-sm text-gray-500">
              {campaigns.length === 0 
                ? "Get started by creating your first email campaign."
                : "No campaigns match your filter criteria."
              }
            </p>
            {campaigns.length === 0 && (
              <div className="mt-6">
                <Link
                  href="/dashboard/campaigns/new"
                  className="btn-primary inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Campaigns List */}
        {filteredCampaigns.length > 0 && (
          <div className="overflow-hidden">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {campaign.name}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 truncate">
                        Subject: {campaign.subject}
                      </p>
                      <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                        <span>Recipients: {campaign.recipients.toLocaleString()}</span>
                        {campaign.openRate !== undefined && (
                          <span>Open Rate: {campaign.openRate}%</span>
                        )}
                        {campaign.clickRate !== undefined && (
                          <span>Click Rate: {campaign.clickRate}%</span>
                        )}
                        {campaign.sentAt && (
                          <span>Sent: {new Date(campaign.sentAt).toLocaleDateString()}</span>
                        )}
                        {campaign.scheduledAt && (
                          <span>Scheduled: {new Date(campaign.scheduledAt).toLocaleDateString()}</span>
                        )}
                        {!campaign.sentAt && !campaign.scheduledAt && (
                          <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {campaign.status === 'sent' && (
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}/analytics`}
                          className="btn-outline text-sm"
                        >
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analytics
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="btn-outline text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                      {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}/edit`}
                          className="btn-outline text-sm"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      )}
                      <button className="btn-outline text-sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </button>
                      <button className="text-gray-400 hover:text-gray-500 p-1">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
