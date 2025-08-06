1. Overview

LocalMailer is an email-marketing SaaS purpose-built for local service businesses—restaurants, gyms, salons, contractors, and tutors. It undercuts Mailchimp’s rising prices by 60-70% while adding industry-specific templates, flat pricing, and human support.
2. Goals & Success Metrics
Goal	KPI	Target at 6 months
Validate product-market fit	Paying customers	≥ 200
Demonstrate cost advantage	Avg. savings vs. Mailchimp	≥ 60%
Stickiness	Monthly logo churn	≤ 5%
Efficient acquisition	CAC	≤ 1× first-month MRR
Reliable delivery	Avg. inbox placement	≥ 98%
3. Target Users

    Independent Restaurants – need event/seasonal promos and loyalty emails.

    Fitness Studios / Gyms – class reminders, challenge campaigns.

    Personal Services (beauty, tutoring, home services) – appointment reminders and review requests.

4. Problem Statement

Mailchimp’s entry plan jumps from $13 to $75/month once a list exceeds 500 contacts, charges for cleaned contacts, and withholds core automations behind higher tiers. Local businesses find this expensive, complex, and poorly supported yet still need simple, effective email outreach.
5. Value Proposition

“Flat-fee email marketing that speaks local. Unlimited contacts, done-for-you templates, and real human help—at a price any small business can afford.”
6. User Stories (MVP)
Priority	As a …	I want to …	So that …
P0	Restaurant owner	import my Mailchimp list in one click	I keep my contacts without hassle
P0	Fitness-studio manager	drag-and-drop a class-announcement email	members get timely updates
P0	Salon owner	schedule appointment-reminder sequences	clients show up and re-book
P1	Contractor	segment contacts by service type	send targeted promos
P1	Any user	see opens & clicks on one dashboard	measure campaign success
P2	Agency partner	manage multiple client accounts	resell the tool easily
7. Scope
7.1 In-Scope (MVP)

    One-click Mailchimp CSV/API import with field mapping

    Contact management (CRUD, tags, segments)

    Drag-and-drop email builder with 10 starter templates across three verticals

    Campaign scheduler + basic automation (welcome, reminder)

    Flat pricing & Stripe billing (Free / $25 Pro)

    Analytics: sends, opens, clicks, unsubscribes

    Email delivery via Maileroo/MailerSend with webhook tracking

    Responsive web app (desktop + mobile)

    Basic admin panel & support inbox

7.2 Out-of-Scope (Phase 2+)

    SMS, WhatsApp, or social integrations

    Advanced A/B testing

    Multilingual templates

    White-label reseller portal

8. Technical Requirements
Layer	Choice	Rationale
Front-end	Next.js 14 + Tailwind CSS	Fast dev, SSR, component reuse
Back-end	Next.js API Routes	Keep mono-repo, serverless friendly
DB	PostgreSQL + Prisma	Relational data, easy migrations
Auth	NextAuth.js (Google OAuth)	Low friction login
Email builder	EmailBuilder.js	Open-source, drag-and-drop
Email send	Maileroo/MailerSend	Startup pricing, 10k+ free emails
Payments	Stripe	Industry standard
Analytics	PostHog	Free tier, self-host option
9. Non-Functional Requirements

    Deliverability: ≥98% inbox placement.

    Performance: Campaign creation <200 ms server response.

    Security: GDPR-compliant contact storage; STRONG encryption at rest.

    Uptime: 99.5% monthly.

    Scalability: Handle 100k emails/hour burst via queue.

10. Dependencies & Risks

    Dependence on external ESP pricing (Maileroo) – mitigate with SendGrid fallback.

    Mailchimp API rate limits for importer – cache requests, allow CSV upload alternative.

    Template rendering across email clients – leverage Email on Acid QA workflow.

11. Milestones & Timeline
Week	Deliverables
1-2	Repo setup, auth, DB schema, Stripe integration
3-4	Contact management, email builder, starter templates
5-6	Mailchimp import tool, campaign send flow, analytics MVP
7-8	UI polish, billing flows, load tests, beta launch
12. Metrics & Analytics

    Real-time dashboard for opens/clicks/unsubs per campaign

    System metrics via PostHog + Grafana (CPU, queue times)

    Business metrics exported to CSV weekly for finance

13. Future Roadmap (Post-MVP)

    AI subject-line generator

    Loyalty punch-card integration for restaurants

    SMS add-on (Twilio)

    Agency multi-tenant mode

    Mobile-first email preview app

14. Acceptance Criteria

    Migration: User imports a Mailchimp list of 1,000 contacts with ≤2% error rate.

    Send: User builds and schedules a campaign that reaches inboxes within five minutes.

    Billing: Upgrades/downgrades reflected in Stripe and user quota without manual intervention.

    Analytics: Open/click data visible within 10 minutes of send completion.

    Support: Help widget routes messages to shared inbox; first response SLA ≤24 h.

15. Appendices

    Pain-point evidence: Mailchimp pricing hikes and contact over-billing threads.

    Competitive matrix: Mailchimp, Constant Contact, Omnisend—highlighting cost and feature gaps (separate sheet).

    Glossary: ESP, CTR, MRR, CSV, GDPR.

End of PRD
