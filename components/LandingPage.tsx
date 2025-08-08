import { signIn } from 'next-auth/react'
import { Mail, DollarSign, Users, Zap, CheckCircle, ArrowRight, Clock, Target, Smile, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center group">
              <Mail className="h-8 w-8 text-primary-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-2 text-xl font-bold text-gray-900">LocalMailer</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Sign In
              </Link>
              <button
                onClick={handleGetStarted}
                disabled={isLoading}
                className="btn-primary inline-flex items-center disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    Get Started Free
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center animate-fade-in">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 animate-slide-up">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 1,000+ digital creators
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
            Email Marketing for
            <span className="text-primary-600 block sm:inline"> Creators</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop paying for bloated tools like Mailchimp or ConvertKit. Clean interface, flat pricing, 
            no contact limits. Email marketing built for creators who want to <em>just send</em>.
          </p>
        
          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto border border-primary-100 shadow-sm mt-12">
            <div className="text-2xl font-bold text-gray-900 mb-3">
              "Flat pricing. Clean interface. No contact limits. Just send."
            </div>
            <div className="text-gray-600 text-lg">
              Perfect for newsletter writers, course creators, and indie builders who want simple email marketing.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Starting...
                </>
              ) : (
                <>
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
            <Link href="#pricing" className="btn-secondary text-lg px-8 py-4 hover:shadow-md transition-all duration-300">
              View Pricing
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Free 14-day trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </main>

      {/* Problem Statement */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Creators Are Switching from Mailchimp & ConvertKit
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-red-600 mb-6 flex items-center">
                <span className="bg-red-100 p-2 rounded-full mr-3">❌</span>
                Old Tools Problems:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 font-semibold">✗</span>
                  <span className="text-gray-700">Pricing jumps at contact thresholds (500, 1k, 2.5k)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 font-semibold">✗</span>
                  <span className="text-gray-700">Pay for inactive subscribers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 font-semibold">✗</span>
                  <span className="text-gray-700">Complex dashboards with 20+ tabs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 font-semibold">✗</span>
                  <span className="text-gray-700">Basic features behind $100+ plans</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-green-600 mb-6 flex items-center">
                <span className="bg-green-100 p-2 rounded-full mr-3">✅</span>
                LocalMailer Solution:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Flat pricing starting at $19/month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">No contact limits or overages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Clean, focused interface</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All features available from day one</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-16">
            Built for Digital Creators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Newsletter Writers</h3>
              <p className="text-gray-600 leading-relaxed">
                Substack, Beehiiv, Ghost users who want more control over their email lists.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Sellers</h3>
              <p className="text-gray-600 leading-relaxed">
                Gumroad, Notion template creators, and digital product sellers.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Creators</h3>
              <p className="text-gray-600 leading-relaxed">
                Online coaches, educators, and micro-SaaS builders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-16">
            Everything You Need, Nothing You Don't
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-300 group">
              <Clock className="h-12 w-12 text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Setup</h3>
              <p className="text-gray-600 leading-relaxed">
                Import your CSV contacts and send your first campaign in under 10 minutes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-300 group">
              <Zap className="h-12 w-12 text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Clean Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                3 prebuilt templates: Launch announcements, newsletters, and product updates.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-300 group">
              <Target className="h-12 w-12 text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track opens and clicks without getting lost in complex reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            Simple, Creator-Friendly Pricing
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            No surprise fees, no contact limits, no feature gates. Pick a plan and start sending.
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Free */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-gray-500 mb-8">forever</div>
              <ul className="text-sm text-gray-600 space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  500 contacts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  1 campaign/month
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Branded emails
                </li>
              </ul>
              <button className="btn-outline w-full py-3">Start Free</button>
            </div>
            
            {/* Starter */}
            <div className="bg-white border-2 border-primary-500 rounded-2xl p-8 text-center relative hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$19</div>
              <div className="text-gray-500 mb-8">per month</div>
              <ul className="text-sm text-gray-600 space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  2,500 contacts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Unlimited sends
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  3 automations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Unbranded emails
                </li>
              </ul>
              <button className="btn-primary w-full py-3 shadow-lg">Choose Starter</button>
            </div>
            
            {/* Pro */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$39</div>
              <div className="text-gray-500 mb-8">per month</div>
              <ul className="text-sm text-gray-600 space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  10,000 contacts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Custom domain
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Priority support
                </li>
              </ul>
              <button className="btn-outline w-full py-3">Choose Pro</button>
            </div>
            
            {/* Scale */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scale</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$99</div>
              <div className="text-gray-500 mb-8">per month</div>
              <ul className="text-sm text-gray-600 space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  25,000+ contacts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Multi-project
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  AI subject lines
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Custom IP
                </li>
              </ul>
              <button className="btn-outline w-full py-3">Choose Scale</button>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-12 text-lg">
            Annual billing: Save 2 months. No overages, clean contact caps.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Send Better Emails?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join the creators who've switched to LocalMailer for simpler, more affordable email marketing.
          </p>
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-10 py-4 rounded-xl text-lg inline-flex items-center shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600 mr-3"></div>
                Starting Your Trial...
              </>
            ) : (
              <>
                <Smile className="mr-3 h-5 w-5" />
                Start Your Free Trial
              </>
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-primary-400" />
                <span className="ml-2 text-lg font-bold">LocalMailer</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Email marketing for creators. Simple, affordable, effective.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LocalMailer. Built for creators, by creators.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
