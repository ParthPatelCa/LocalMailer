import { signIn } from 'next-auth/react'
import { Mail, DollarSign, Users, Zap, CheckCircle, ArrowRight, Clock, Target, Smile } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LocalMailer</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/auth/signin" className="btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Email Marketing for
            <span className="text-blue-600"> Creators</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Stop paying for bloated tools like Mailchimp or ConvertKit. Clean interface, flat pricing, 
            no contact limits. Email marketing built for creators who want to just send.
          </p>
        
          {/* Value Proposition */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              "Flat pricing. Clean interface. No contact limits. Just send."
            </div>
            <div className="text-gray-600">
              Perfect for newsletter writers, course creators, and indie builders who want simple email marketing.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
            >
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link href="#pricing" className="btn-secondary text-lg px-8 py-3">
              View Pricing
            </Link>
          </div>
        </div>
      </main>

      {/* Problem Statement */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Creators Are Switching from Mailchimp & ConvertKit
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-red-600 mb-4">Old Tools Problems:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Pricing jumps at contact thresholds (500, 1k, 2.5k)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Pay for inactive subscribers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Complex dashboards with 20+ tabs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Basic features behind $100+ plans</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-green-600 mb-4">LocalMailer Solution:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  <span>Flat pricing starting at $19/month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  <span>No contact limits or overages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  <span>Clean, focused interface</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  <span>All features available from day one</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built for Digital Creators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Newsletter Writers</h3>
              <p className="text-gray-600">
                Substack, Beehiiv, Ghost users who want more control over their email lists.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Sellers</h3>
              <p className="text-gray-600">
                Gumroad, Notion template creators, and digital product sellers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Creators</h3>
              <p className="text-gray-600">
                Online coaches, educators, and micro-SaaS builders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need, Nothing You Don't
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Setup</h3>
              <p className="text-gray-600">
                Import your CSV contacts and send your first campaign in under 10 minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Templates</h3>
              <p className="text-gray-600">
                3 prebuilt templates: Launch announcements, newsletters, and product updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Target className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple Analytics</h3>
              <p className="text-gray-600">
                Track opens and clicks without getting lost in complex reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Creator-Friendly Pricing
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$0</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>500 contacts</li>
                <li>1 campaign/month</li>
                <li>Basic analytics</li>
                <li>Branded emails</li>
              </ul>
              <button className="btn-outline w-full">Start Free</button>
            </div>
            
            {/* Starter */}
            <div className="bg-white border-2 border-blue-500 rounded-lg p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$19</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>2,500 contacts</li>
                <li>Unlimited sends</li>
                <li>3 automations</li>
                <li>Unbranded emails</li>
              </ul>
              <button className="btn-primary w-full">Choose Starter</button>
            </div>
            
            {/* Pro */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$39</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>10,000 contacts</li>
                <li>Advanced analytics</li>
                <li>Custom domain</li>
                <li>Priority support</li>
              </ul>
              <button className="btn-outline w-full">Choose Pro</button>
            </div>
            
            {/* Scale */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scale</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$99</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>25,000+ contacts</li>
                <li>Multi-project</li>
                <li>AI subject lines</li>
                <li>Custom IP</li>
              </ul>
              <button className="btn-outline w-full">Choose Scale</button>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8">
            Annual billing: Save 2 months. No overages, clean contact caps.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Send Better Emails?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the creators who've switched to LocalMailer for simpler, more affordable email marketing.
          </p>
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg inline-flex items-center"
          >
            <Smile className="mr-2 h-5 w-5" />
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-lg font-bold">LocalMailer</span>
              </div>
              <p className="text-gray-400">
                Email marketing for creators. Simple, affordable, effective.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LocalMailer. Built for creators, by creators.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
