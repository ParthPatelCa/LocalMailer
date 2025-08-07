# Product Requirements Document (PRD)
**Product Name:** LocalMailer  
**Version:** MVP 1.0  
**Target Audience:** Digital creators, newsletter writers, indie SaaS founders, Gumroad/Notion sellers, course creators

## 1. Overview
LocalMailer is a lightweight email marketing platform built for creators who want to communicate with their audience without paying for bloated tools like Mailchimp or ConvertKit. It’s designed for simplicity, speed, and affordability — with no contact limits, tier games, or unnecessary friction.

## 2. Goals & Success Metrics
| Goal                        | KPI                             | 6-Month Target        |
|-----------------------------|----------------------------------|------------------------|
| Validate product-market fit | Paying customers                | ≥ 250                 |
| Strong acquisition funnel   | Free-to-paid conversion         | ≥ 5%                  |
| High deliverability         | Inbox placement rate            | ≥ 98%                 |
| Efficient cost structure    | Profit margin per user          | ≥ 50%                 |

## 3. Target Users
- Newsletter writers (Substack, Beehiiv, Ghost users)
- Gumroad, Notion, or digital product sellers
- Online coaches and course creators
- Micro-SaaS builders
- Indie developers or solopreneurs

## 4. Problem Statement
Most email marketing platforms charge based on contact count, hide core features behind complex pricing tiers, or force users into bloated dashboards and workflows. Creators want to send emails quickly, clearly, and affordably — without paying for 20,000 inactive contacts or juggling 12 different tabs.

## 5. Value Proposition
> “Email marketing for creators. Flat pricing. Clean interface. No contact limits. Just send.”

## 6. User Stories (MVP)
| Priority | As a …             | I want to …                               | So that …                               |
|----------|--------------------|-------------------------------------------|-----------------------------------------|
| P0       | Creator             | Import my CSV contacts                    | I can bring my audience with me         |
| P0       | Creator             | Compose and send a campaign               | I can reach my list with updates        |
| P0       | Creator             | Choose a simple prebuilt template         | I can save time and look professional   |
| P1       | Creator             | View opens and clicks                     | I know what’s working                   |
| P1       | User                | Upgrade to Pro/Scale without friction     | I can grow without hitting limits       |
| P2       | Power user          | Track multiple projects/accounts          | I can manage campaigns cleanly          |

## 7. Scope

### 7.1 In-Scope (MVP)
- CSV contact importer with field mapping
- Markdown or WYSIWYG email composer
- 3 prebuilt templates (launch, newsletter, product update)
- Campaign scheduler with simple queue
- Stripe billing (Free / Starter / Pro / Scale)
- Resend (primary ESP), SES fallback integration
- Basic campaign analytics (opens/clicks)
- Responsive web app with dashboard

### 7.2 Out-of-Scope (MVP)
- Advanced segmentation
- Multi-language support
- Referral system
- Mobile apps
- A/B testing

## 8. Pricing Plan
| Plan     | Price/month | Contacts | Features                                            |
|----------|-------------|----------|-----------------------------------------------------|
| Free     | $0          | 500      | 1 campaign/mo, branding footer, no automations     |
| Starter  | $19         | 2,500    | Unlimited sends, 3 automations, unbranded emails   |
| Pro      | $39         | 10,000   | Advanced analytics, custom domain sender           |
| Scale    | $99+        | 25k+     | Multi-project, AI subject lines, custom IP support |

- Annual billing: 2 months free
- No overages, clean contact caps
- Free users can upgrade anytime in-app

## 9. Go-To-Market (GTM) Plan
| Channel           | Strategy                                                                 |
|-------------------|--------------------------------------------------------------------------|
| Reddit            | Post in r/emailmarketing, r/SaaS, r/Entrepreneur, r/Notion               |
| Indie Hackers     | Build-in-public updates + feedback loops                                 |
| Twitter/X         | Post before/after screenshots, short product demos                       |
| Gumroad + Notion  | Direct outreach to template sellers for early adopters                   |
| Facebook Groups   | Niche-specific groups (e.g. "Newsletter Creators")                       |
| AppSumo/Deal Sites| Consider lifetime deal for initial 100–250 users                         |

## 10. Technical Stack
| Layer         | Tool                            | Notes                                       |
|---------------|----------------------------------|---------------------------------------------|
| Frontend      | Next.js 14 + Tailwind            | App Router + responsive design              |
| Backend       | Next.js API routes               | Serverless-friendly                         |
| Auth          | NextAuth.js (email + Google)     | Magic link preferred for simplicity         |
| Database      | PostgreSQL + Prisma              | Contacts, users, campaigns, metrics         |
| Email         | Resend (MVP) + SES (fallback)    | Queue-based delivery                         |
| Payments      | Stripe                           | Tier-based billing, webhook handling        |
| Queue         | BullMQ (or custom wrapper)       | Campaign send queue                         |
| Analytics     | Custom events + webhook store    | Basic open/click tracking                   |

## 11. Non-Functional Requirements
- Inbox placement ≥ 98%
- Campaign creation response < 200ms
- 99.9% uptime
- Secure contact encryption at rest
- Scalability: handle 100k emails/hour peak

## 12. Risks & Mitigation
| Risk                        | Mitigation                                   |
|-----------------------------|----------------------------------------------|
| ESP cost growth             | Add SES routing fallback                     |
| Stripe webhook complexity   | Use Stripe’s CLI test tool                   |
| High free-user abuse        | Rate-limit sends + branding for Free users   |
| Copilot errors in JSX logic | Test all UI in isolation + write test cases  |

## 13. Metrics & Analytics
- Signup → First Campaign Time
- Campaign open + click rates
- Free-to-paid conversion %
- Plan-wise MRR and churn
- Send queue health and failure rate

## 14. Milestones
| Week | Deliverables                                              |
|------|-----------------------------------------------------------|
| 1–2  | Landing page, auth flow, pricing page                     |
| 3–4  | Contact importer, email editor, 1-click template loader   |
| 5–6  | Campaign scheduler, send queue, Resend integration        |
| 7–8  | Stripe billing + plan gating, dashboard polish            |
| 9–10 | MVP launch + analytics layer + Vercel deploy              |

## 15. Acceptance Criteria
- User signs up → creates contact list → sends campaign in <10 min  
- Campaign inbox placement is ≥98%  
- Upgrade flow via Stripe works without dev input  
- Campaign analytics show opens/clicks within 15 mins of send  
- Plan-based feature gating enforced across UI/API  

## 16. Component & File Implementation Plan
| File / Component               | Description                                                  | Priority |
|--------------------------------|--------------------------------------------------------------|----------|
| components/PricingTable.tsx    | Pricing table for landing page                              | P0       |
| components/CampaignForm.tsx    | Compose and schedule emails                                 | P0       |
| components/ContactImporter.tsx | Upload and import CSV contacts                              | P0       |
| lib/mailer.ts                  | Send email via Resend / SES                                 | P0       |
| lib/stripe.ts                  | Stripe helper and webhook logic                            | P1       |
| dashboard/campaigns/page.tsx   | Display sent campaign logs                                 | P1       |
| lib/analytics.ts               | Record opens/clicks from webhooks                          | P2       |
