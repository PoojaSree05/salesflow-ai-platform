

# SalesFlow AI — B2B Sales Automation Platform

## Overview
A production-quality, investor-demo-ready SaaS platform UI with 11+ pages, simulated AI features, and enterprise-grade design. All data is mock JSON with simulated loading states — no backend required.

---

## Design System
- **Primary accent**: Deep violet/indigo (`#6366F1` range)
- **Dark sidebar**: Charcoal/deep navy background
- **Light content area**: Clean white/gray cards with soft shadows
- **Typography**: Clean, professional hierarchy
- **Rounded cards**, subtle hover animations, consistent 8px spacing grid
- **Mobile responsive** throughout

---

## Global Layout

### Left Sidebar (Fixed, Collapsible)
- **SalesFlow AI** logo at top
- Workspace switcher dropdown
- Navigation: Dashboard, Workspace, ICP & Leads, Tonality Engine, Campaigns, Inbox, Calls & PPT, Calendar, Analytics, Settings
- Settings pinned near bottom, user profile/avatar at bottom
- Dark theme with active item glow highlight
- Collapsible to icon-only mode

### Top Header
- Dynamic page title
- Global search bar
- Notification bell icon
- "+ New Campaign" quick action button
- User avatar dropdown

### Mobile
- Hamburger menu with slide-in sidebar animation

---

## Pages

### 🔐 Login Page (Simulated Auth)
- Email + Password form with "Demo Login" one-click button
- Clean SaaS login design with branding
- Simulates auth state, redirects to Dashboard

### 1️⃣ Dashboard (Executive Overview)
- 6 animated KPI cards (Emails Sent, Open Rate, Replies, Positive Replies, Calls Booked, Pipeline Value)
- Funnel visualization: Sent → Opened → Replied → Positive → Calls → Meetings
- Deliverability health progress bar
- A/B campaign performance comparison
- Live-simulated recent activity feed
- Counter animations on load

### 2️⃣ Workspace Setup
- Company profile form
- Brand Kit: tone selector, value propositions, competitor notes
- Asset Library: case studies, pitch decks, pricing sheets, FAQs
- Compliance toggles: GDPR, auto-unsubscribe, suppression list preview
- Save with success toast

### 3️⃣ ICP & Leads
- **ICP Builder**: Industry dropdown, company size slider, region selector, tech stack multi-select, intent signals, auto-calculated market size
- **Leads Table**: CSV/CRM import simulation, deduplication toast, data quality scores, status badges (New/Contacted/Replied/Qualified), lead detail modal

### 4️⃣ Tonality Engine
- Upload past emails simulation
- Generated tonality profile (greeting style, sentence length, formality, CTA pattern)
- Email preview generator
- Risk wording detector badge
- "Approved Claims Only" toggle

### 5️⃣ Campaigns (Multichannel Builder)
- Sequence builder with Email, LinkedIn Connect, LinkedIn Follow-up steps
- Add/edit/delete/reorder steps
- Time delay & throttle controls
- Campaign status badges (Draft/Active/Paused)
- Start campaign simulation with progress tracker

### 6️⃣ Inbox (AI Classification)
- Reply list with status labels (Positive/Neutral/Objection/Unsubscribe/OOO)
- Right-side drawer on click: extracted pain points, budget hint, timeline, stakeholders
- "Move to Call Workflow" for positive replies
- Auto-suppression for unsubscribes

### 7️⃣ Calls & PPT
- **Call Workflow (BANT)**: Editable Budget/Authority/Need/Timeline fields, AI summary card, CRM logging simulation, recommended next action
- **Auto PPT Generator**: Generate button, slide preview cards, brand-kit-styled, download simulation animation

### 8️⃣ Calendar & Handoff
- Available time slots grid
- Booking modal with confirmation animation
- Auto-generated handoff summary (pain points, timeline, assets shared, objections)
- Create opportunity card

### 9️⃣ Analytics
- Funnel performance chart
- Channel performance comparison
- Sequence A vs B conversion metrics
- Deliverability health percentage
- Revenue pipeline chart
- Audit log table

### ⚙️ Settings
- Integration cards (HubSpot, Salesforce, LinkedIn)
- Role management table
- Approval workflow toggle
- Data retention settings
- Compliance log

---

## Embedded AI Assistant
- Floating circular button (bottom-right)
- Glass-style chat modal with smooth open/close animation
- Keyword detection (workflow, ICP, campaign, inbox, analytics, call, tonality)
- Returns structured, executive-tone bullet responses
- Feels like a real AI copilot — never breaks the illusion

---

## Simulation & Polish
- All API calls simulated with loading skeletons and 500-1500ms delays
- Structured mock JSON data throughout
- Toast notifications for actions
- Counter/number animations on dashboard
- Smooth page transitions
- Investor-presentation-ready quality

