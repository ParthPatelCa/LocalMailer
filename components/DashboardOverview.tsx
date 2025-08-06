import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Users, Send, Mail, BarChart3, ArrowUpRight, Plus } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalContacts: number
  totalCampaigns: number
  totalSent: number
  openRate: number
}

export default function DashboardOverview() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalCampaigns: 0,
    totalSent: 0,
    openRate: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard stats
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-5">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Contacts',
      value: stats.totalContacts.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      name: 'Campaigns Sent',
      value: stats.totalCampaigns.toLocaleString(),
      icon: Send,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      name: 'Emails Delivered',
      value: stats.totalSent.toLocaleString(),
      icon: Mail,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      name: 'Average Open Rate',
      value: `${stats.openRate.toFixed(1)}%`,
      icon: BarChart3,
      change: '+5.2%',
      changeType: 'positive' as const,
    },
  ]

  const quickActions = [
    {
      name: 'Import Contacts',
      description: 'Import from Mailchimp or CSV',
      href: '/dashboard/contacts/import',
      icon: Users,
    },
    {
      name: 'Create Campaign',
      description: 'Send emails to your audience',
      href: '/dashboard/campaigns/new',
      icon: Send,
    },
    {
      name: 'Browse Templates',
      description: 'Ready-made email templates',
      href: '/dashboard/templates',
      icon: Mail,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {session?.user?.name?.split(' ')[0]}!
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Here's what's happening with your email marketing today.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href="/dashboard/campaigns/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.name} className="stats-card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4" />
                        <span className="sr-only">Increased by</span>
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {action.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {action.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Getting Started */}
      {stats.totalContacts === 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">
                Get started with LocalMailer
              </h3>
              <div className="mt-2 text-sm text-primary-700">
                <p>
                  Welcome to LocalMailer! To get started, import your contacts and create your first campaign.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <Link
                    href="/dashboard/contacts/import"
                    className="bg-primary-50 px-2 py-1.5 rounded-md text-sm font-medium text-primary-800 hover:bg-primary-100"
                  >
                    Import Contacts
                  </Link>
                  <Link
                    href="/dashboard/templates"
                    className="ml-3 bg-primary-50 px-2 py-1.5 rounded-md text-sm font-medium text-primary-800 hover:bg-primary-100"
                  >
                    Browse Templates
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
