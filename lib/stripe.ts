import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_CONFIG = {
  PRICE_ID_PRO: process.env.STRIPE_PRICE_ID_PRO!,
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
} as const
