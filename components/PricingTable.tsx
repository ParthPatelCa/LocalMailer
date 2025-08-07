import { CheckCircle, Star } from 'lucide-react'

interface PlanFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: number
  period: string
  description: string
  contacts: string
  features: PlanFeature[]
  popular?: boolean
  cta: string
}

export default function PricingTable() {
  const plans: PricingPlan[] = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      contacts: '500 contacts',
      features: [
        { text: '1 campaign per month', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Branded emails', included: true },
        { text: 'Email support', included: true },
        { text: 'Automations', included: false },
        { text: 'Custom domain', included: false },
      ],
      cta: 'Start Free'
    },
    {
      name: 'Starter',
      price: 19,
      period: 'month',
      description: 'For growing creators',
      contacts: '2,500 contacts',
      features: [
        { text: 'Unlimited campaigns', included: true },
        { text: '3 automations', included: true },
        { text: 'Unbranded emails', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom domain', included: false },
      ],
      popular: true,
      cta: 'Choose Starter'
    },
    {
      name: 'Pro',
      price: 39,
      period: 'month',
      description: 'For established creators',
      contacts: '10,000 contacts',
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom domain sender', included: true },
        { text: 'A/B testing', included: true },
        { text: 'Multi-project', included: false },
        { text: 'AI subject lines', included: false },
      ],
      cta: 'Choose Pro'
    },
    {
      name: 'Scale',
      price: 99,
      period: 'month',
      description: 'For power users',
      contacts: '25,000+ contacts',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Multi-project management', included: true },
        { text: 'AI subject line optimization', included: true },
        { text: 'Custom IP support', included: true },
        { text: 'White-label options', included: true },
        { text: 'Dedicated support', included: true },
      ],
      cta: 'Choose Scale'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Creator-Friendly Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            No contact limits. No overages. Clean pricing that grows with you.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="text-gray-500">Monthly</span>
            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Annual (Save 2 months!)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-lg p-6 relative ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                <p className="text-blue-600 font-medium">{plan.contacts}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0">
                        <div className="h-2 w-2 bg-gray-300 rounded-full mx-auto mt-1.5"></div>
                      </div>
                    )}
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include unlimited email sends, 98%+ deliverability, and no hidden fees.
          </p>
          <p className="text-sm text-gray-500">
            Annual billing saves you 2 months. Switch or cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
