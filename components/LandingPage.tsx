import { signIn } from 'next-auth/react'
import { Mail, DollarSign, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">LocalMailer</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="btn-primary"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Email Marketing That Speaks <span className="text-primary-600">Local</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Flat-fee email marketing for local businesses. Unlimited contacts, 
          industry-specific templates, and real human support—at 60% less than Mailchimp.
        </p>
        
        {/* Value Proposition */}
        <div className="bg-white rounded-lg p-6 mb-8 max-w-2xl mx-auto shadow-lg">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Save $600+ per year vs. Mailchimp
          </div>
          <div className="text-gray-600">
            When you have 1,000+ contacts, you pay $75/month with Mailchimp. 
            With LocalMailer, it's just <span className="font-bold text-primary-600">$25/month</span> - forever.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
          >
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <Link href="#demo" className="btn-secondary text-lg px-8 py-3">
            View Demo
          </Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Tired of Mailchimp's Rising Costs?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-red-600">Mailchimp Problems:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Jumps from $13 to $75/month at 500 contacts
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Charges for cleaned/bounced contacts
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Basic automations behind $20+ tiers
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Generic templates, poor local business support
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-green-600">LocalMailer Solution:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  Flat $25/month for unlimited contacts
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  No charges for inactive contacts
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  All automations included
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  Local business templates + human support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Local Businesses */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Built for Local Business Owners
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <DollarSign className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Predictable Pricing</h3>
            <p className="text-gray-600">
              Just $25/month for unlimited contacts. No surprises, no contact overages, 
              no tier upgrades needed.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Users className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Industry Templates</h3>
            <p className="text-gray-600">
              Ready-made templates for restaurants, gyms, salons, contractors, and tutors. 
              No design skills needed.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Zap className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Easy Mailchimp Import</h3>
            <p className="text-gray-600">
              One-click import from Mailchimp. Keep your contacts, ditch the high fees. 
              Switch in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Perfect for Your Business Type
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { type: 'Restaurants', use: 'Event promos, loyalty programs, seasonal menus' },
            { type: 'Fitness Studios', use: 'Class reminders, challenges, membership renewals' },
            { type: 'Salons & Spas', use: 'Appointment reminders, promotions, product launches' },
            { type: 'Contractors', use: 'Service reminders, seasonal offers, testimonials' },
            { type: 'Tutors & Coaches', use: 'Session updates, progress reports, referrals' },
            { type: 'Local Retail', use: 'Sales announcements, new arrivals, customer appreciation' },
          ].map((business) => (
            <div key={business.type} className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{business.type}</h3>
              <p className="text-gray-600 text-sm">{business.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Simple, Honest Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <div className="text-4xl font-bold text-primary-600 mb-4">$0</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                Up to 500 contacts
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                1,000 emails/month
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                Basic templates
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                Email support
              </li>
            </ul>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="btn-secondary w-full"
            >
              Start Free
            </button>
          </div>
          <div className="bg-primary-600 text-white p-8 rounded-xl shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <div className="text-4xl font-bold mb-4">$25</div>
            <div className="text-sm opacity-75 mb-6">per month, unlimited contacts</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="text-white mr-2 h-5 w-5" />
                Unlimited contacts
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-white mr-2 h-5 w-5" />
                Unlimited emails
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-white mr-2 h-5 w-5" />
                All industry templates
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-white mr-2 h-5 w-5" />
                Automation sequences
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-white mr-2 h-5 w-5" />
                Priority support
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-white mr-2 h-5 w-5" />
                Advanced analytics
              </li>
            </ul>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="bg-white text-primary-600 font-bold py-3 px-6 rounded-lg w-full hover:bg-gray-100 transition-colors"
            >
              Start Pro Trial
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-primary-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Save Money and Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 200+ local businesses already saving with LocalMailer
          </p>
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-6 w-6" />
            <span className="text-xl font-bold">LocalMailer</span>
          </div>
          <p className="text-gray-400 text-center">
            Email marketing for local businesses. Built with ❤️ for small business owners.
          </p>
          <div className="mt-6 text-center text-sm text-gray-500">
            © 2024 LocalMailer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
