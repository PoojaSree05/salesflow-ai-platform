// ── Types ──
export type CampaignStatus = "Active" | "Draft" | "Paused";
export type StepType = "email" | "linkedin_connect" | "linkedin_followup";

export interface CampaignStep {
  type: StepType;
  subject: string;
  delay: number;
}

export interface Campaign {
  id: number;
  name: string;
  status: CampaignStatus;
  contacts: number;
  sent: number;
  opened: number;
  replied: number;
  steps: CampaignStep[];
}

// ── KPIs ──
export const kpiData = [
  { label: "Emails Sent", value: 12847, change: 12.5, prefix: "", suffix: "" },
  { label: "Open Rate", value: 68.4, change: 3.2, prefix: "", suffix: "%" },
  { label: "Replies", value: 1432, change: 8.7, prefix: "", suffix: "" },
  { label: "Positive Replies", value: 487, change: 15.3, prefix: "", suffix: "" },
  { label: "Calls Booked", value: 156, change: 22.1, prefix: "", suffix: "" },
  { label: "Pipeline Value", value: 2340000, change: 18.9, prefix: "$", suffix: "" },
];

export const funnelData = [
  { stage: "Sent", value: 12847, fill: "hsl(245, 58%, 51%)" },
  { stage: "Opened", value: 8787, fill: "hsl(245, 58%, 58%)" },
  { stage: "Replied", value: 1432, fill: "hsl(245, 58%, 65%)" },
  { stage: "Positive", value: 487, fill: "hsl(152, 60%, 42%)" },
  { stage: "Calls", value: 156, fill: "hsl(38, 92%, 50%)" },
  { stage: "Meetings", value: 89, fill: "hsl(205, 85%, 50%)" },
];

export const abTestData = [
  { name: "Week 1", campaignA: 42, campaignB: 35 },
  { name: "Week 2", campaignA: 55, campaignB: 48 },
  { name: "Week 3", campaignA: 61, campaignB: 52 },
  { name: "Week 4", campaignA: 78, campaignB: 69 },
];

export const recentActivity = [
  { id: 1, action: "Reply received", detail: "Sarah Chen from Stripe — Positive intent detected", time: "2m ago", type: "positive" as const },
  { id: 2, action: "Email opened", detail: "Marcus Johnson from Datadog opened 'Q1 Offer'", time: "5m ago", type: "neutral" as const },
  { id: 3, action: "Call booked", detail: "Jennifer Lee from Snowflake — Tomorrow 3:00 PM", time: "12m ago", type: "success" as const },
  { id: 4, action: "Objection flagged", detail: "David Park from MongoDB — Budget concern", time: "18m ago", type: "warning" as const },
  { id: 5, action: "Campaign started", detail: "'Enterprise Q1 Outreach' launched — 2,400 contacts", time: "25m ago", type: "info" as const },
  { id: 6, action: "Lead qualified", detail: "Emily Wang from Confluent — BANT score 92/100", time: "32m ago", type: "success" as const },
];

// ── Leads ──
export const leadsData = [
  { id: 1, name: "Sarah Chen", company: "Stripe", title: "VP Engineering", email: "s.chen@stripe.com", status: "Qualified" as const, score: 94, industry: "Fintech" },
  { id: 2, name: "Marcus Johnson", company: "Datadog", title: "CTO", email: "m.johnson@datadog.com", status: "Contacted" as const, score: 78, industry: "DevOps" },
  { id: 3, name: "Jennifer Lee", company: "Snowflake", title: "Head of Sales", email: "j.lee@snowflake.com", status: "Replied" as const, score: 88, industry: "Data" },
  { id: 4, name: "David Park", company: "MongoDB", title: "Director of Ops", email: "d.park@mongodb.com", status: "Contacted" as const, score: 72, industry: "Database" },
  { id: 5, name: "Emily Wang", company: "Confluent", title: "VP Sales", email: "e.wang@confluent.com", status: "Qualified" as const, score: 91, industry: "Streaming" },
  { id: 6, name: "James Miller", company: "HashiCorp", title: "CRO", email: "j.miller@hashicorp.com", status: "New" as const, score: 65, industry: "Infrastructure" },
  { id: 7, name: "Anna Petrov", company: "Elastic", title: "SVP Marketing", email: "a.petrov@elastic.co", status: "New" as const, score: 70, industry: "Search" },
  { id: 8, name: "Robert Kim", company: "PagerDuty", title: "VP Product", email: "r.kim@pagerduty.com", status: "Replied" as const, score: 83, industry: "Incident Mgmt" },
];

// ── Inbox ──
export const inboxData = [
  { id: 1, from: "Sarah Chen", company: "Stripe", subject: "Re: AI-Powered Sales Platform", preview: "This looks really promising. Can we schedule a call to discuss pricing for our team of 50?", status: "Positive" as const, time: "2m ago", painPoints: ["Manual outreach inefficiency", "Low reply rates"], budgetHint: "$50K-100K annual", timeline: "Q1 2026", stakeholders: ["VP Engineering", "CTO", "CFO"] },
  { id: 2, from: "Marcus Johnson", company: "Datadog", subject: "Re: Outbound Automation", preview: "Thanks for reaching out. We're currently evaluating a few solutions in this space.", status: "Neutral" as const, time: "1h ago", painPoints: ["Tool fragmentation"], budgetHint: "Not disclosed", timeline: "Q2 2026", stakeholders: ["CTO"] },
  { id: 3, from: "David Park", company: "MongoDB", subject: "Re: Sales Acceleration", preview: "Interesting approach but our budget is locked for this quarter. Can we revisit in Q2?", status: "Objection" as const, time: "3h ago", painPoints: ["Budget constraints"], budgetHint: "Frozen Q1", timeline: "Q2 2026", stakeholders: ["Director of Ops", "CFO"] },
  { id: 4, from: "Lisa Thompson", company: "Twilio", subject: "Re: Partnership Opportunity", preview: "Please remove me from your mailing list.", status: "Unsubscribe" as const, time: "5h ago", painPoints: [], budgetHint: "N/A", timeline: "N/A", stakeholders: [] },
  { id: 5, from: "Tom Wilson", company: "Cloudflare", subject: "Re: Enterprise Sales Suite", preview: "I'm currently out of office until January 20th. I'll respond when I return.", status: "OOO" as const, time: "1d ago", painPoints: [], budgetHint: "N/A", timeline: "After Jan 20", stakeholders: ["Tom Wilson"] },
];

// ── Campaigns ──
export const campaignsData: Campaign[] = [
  { id: 1, name: "Enterprise Q1 Outreach", status: "Active", contacts: 2400, sent: 1850, opened: 1200, replied: 180, steps: [
    { type: "email", subject: "Intro: AI Sales Platform", delay: 0 },
    { type: "linkedin_connect", subject: "LinkedIn Connection Request", delay: 2 },
    { type: "email", subject: "Follow-up: Customer Success Stories", delay: 4 },
    { type: "linkedin_followup", subject: "LinkedIn Follow-up Message", delay: 7 },
  ]},
  { id: 2, name: "Mid-Market Nurture", status: "Draft", contacts: 800, sent: 0, opened: 0, replied: 0, steps: [
    { type: "email", subject: "Introduction to SalesFlow AI", delay: 0 },
    { type: "email", subject: "Case Study: 3x Pipeline Growth", delay: 3 },
  ]},
  { id: 3, name: "Re-engagement Series", status: "Paused", contacts: 1200, sent: 950, opened: 520, replied: 45, steps: [
    { type: "email", subject: "We miss you — New features inside", delay: 0 },
    { type: "linkedin_connect", subject: "Reconnect on LinkedIn", delay: 5 },
  ]},
];

// ── Analytics ──
export const channelPerformance = [
  { channel: "Email", sent: 12847, opened: 8787, replied: 1432, converted: 487 },
  { channel: "LinkedIn", sent: 3200, opened: 2100, replied: 520, converted: 180 },
  { channel: "Phone", sent: 800, opened: 800, replied: 340, converted: 156 },
];

export const revenueData = [
  { month: "Sep", value: 120000 },
  { month: "Oct", value: 185000 },
  { month: "Nov", value: 240000 },
  { month: "Dec", value: 310000 },
  { month: "Jan", value: 420000 },
  { month: "Feb", value: 580000 },
];

export const auditLog = [
  { id: 1, user: "Alex Rivera", action: "Started campaign 'Enterprise Q1'", timestamp: "2026-02-12 09:15", ip: "192.168.1.42" },
  { id: 2, user: "Morgan Liu", action: "Updated ICP filters", timestamp: "2026-02-12 08:45", ip: "192.168.1.38" },
  { id: 3, user: "Alex Rivera", action: "Exported leads CSV", timestamp: "2026-02-11 17:30", ip: "192.168.1.42" },
  { id: 4, user: "Jordan Peters", action: "Modified tonality profile", timestamp: "2026-02-11 14:20", ip: "192.168.1.55" },
  { id: 5, user: "Morgan Liu", action: "Booked call with Snowflake", timestamp: "2026-02-11 11:00", ip: "192.168.1.38" },
];

// ── Calendar ──
export const timeSlots = [
  { id: 1, date: "2026-02-13", time: "09:00 AM", available: true, booked: undefined as string | undefined },
  { id: 2, date: "2026-02-13", time: "10:00 AM", available: false, booked: "Sarah Chen – Stripe" },
  { id: 3, date: "2026-02-13", time: "11:00 AM", available: true, booked: undefined as string | undefined },
  { id: 4, date: "2026-02-13", time: "02:00 PM", available: true, booked: undefined as string | undefined },
  { id: 5, date: "2026-02-13", time: "03:00 PM", available: false, booked: "Jennifer Lee – Snowflake" },
  { id: 6, date: "2026-02-14", time: "09:00 AM", available: true, booked: undefined as string | undefined },
  { id: 7, date: "2026-02-14", time: "10:00 AM", available: true, booked: undefined as string | undefined },
  { id: 8, date: "2026-02-14", time: "11:00 AM", available: true, booked: undefined as string | undefined },
  { id: 9, date: "2026-02-14", time: "02:00 PM", available: false, booked: "Emily Wang – Confluent" },
  { id: 10, date: "2026-02-14", time: "03:00 PM", available: true, booked: undefined as string | undefined },
];

// ── Tonality ──
export const tonalityProfile = {
  greetingStyle: "Professional & Warm",
  sentenceLength: "Medium (12-18 words avg)",
  formalityLevel: 72,
  ctaPattern: "Soft ask with value proposition",
  riskWords: ["guarantee", "unlimited", "revolutionary"],
  approvedClaims: true,
};

// ── Settings ──
export const integrations = [
  { name: "HubSpot", status: "Connected", icon: "🟠", lastSync: "2 hours ago" },
  { name: "Salesforce", status: "Connected", icon: "☁️", lastSync: "30 minutes ago" },
  { name: "LinkedIn Sales Nav", status: "Not Connected", icon: "🔗", lastSync: "N/A" },
];

export const teamMembers = [
  { name: "Alex Rivera", email: "alex@salesflow.ai", role: "Admin", status: "Active" },
  { name: "Morgan Liu", email: "morgan@salesflow.ai", role: "Manager", status: "Active" },
  { name: "Jordan Peters", email: "jordan@salesflow.ai", role: "SDR", status: "Active" },
  { name: "Casey Brooks", email: "casey@salesflow.ai", role: "SDR", status: "Invited" },
];

// ── AI Assistant ──
export const aiResponses: Record<string, string> = {
  workflow: `Here's how SalesFlow AI executes outbound automation:\n\n1️⃣ **Workspace Setup** – Configure brand, team, compliance\n2️⃣ **ICP Definition** – Identify high-fit accounts\n3️⃣ **Lead Enrichment** – Validate and score data\n4️⃣ **Campaign Launch** – Multichannel sequencing\n5️⃣ **AI Reply Intelligence** – Classify and extract intent\n6️⃣ **Call Qualification** – Capture BANT insights\n7️⃣ **Auto Presentation** – Generate tailored decks\n8️⃣ **Calendar Routing** – Schedule qualified meetings\n9️⃣ **Analytics** – Optimize performance`,
  icp: `Your Ideal Customer Profile analysis:\n\n• **Industry Focus**: B2B SaaS, Fintech, DevOps\n• **Company Size**: 200-2,000 employees\n• **Revenue Range**: $20M-$500M ARR\n• **Tech Stack Signals**: Salesforce, HubSpot, Outreach\n• **Intent Indicators**: Hiring SDRs, evaluating sales tools\n• **Estimated TAM**: 14,200 companies globally\n\n💡 *Recommendation*: Prioritize companies showing 2+ intent signals for 3.2x higher conversion rates.`,
  campaign: `Campaign performance overview:\n\n📊 **Active Campaigns**: 3\n• Enterprise Q1 Outreach – 68% open rate, 9.7% reply rate\n• Mid-Market Nurture – Draft (800 contacts queued)\n• Re-engagement – Paused (4.7% reply rate)\n\n🎯 **Top Performing Sequence**:\nEmail → LinkedIn Connect → Follow-up Email (Day 4)\nThis sequence yields 2.4x higher positive reply rates.\n\n💡 *Action*: Consider A/B testing subject lines on Enterprise Q1.`,
  inbox: `Inbox intelligence summary:\n\n📬 **Total Replies**: 1,432\n• ✅ Positive: 487 (34%)\n• 😐 Neutral: 520 (36.3%)\n• ⚠️ Objections: 245 (17.1%)\n• 🚫 Unsubscribe: 112 (7.8%)\n• 🏖️ OOO: 68 (4.8%)\n\n🔥 **Hot Leads**: 12 replies scored 90+ showing strong buying signals\n💡 *Priority*: Move top 12 positive replies to Call Workflow immediately.`,
  analytics: `Performance analytics snapshot:\n\n📈 **Funnel Health**: Strong\n• Sent → Open: 68.4% (↑3.2%)\n• Open → Reply: 16.3% (↑1.8%)\n• Reply → Positive: 34% (↑5.1%)\n• Positive → Call: 32% (stable)\n\n💰 **Pipeline**: $2.34M (+18.9% MoM)\n📧 **Deliverability**: 97.2% (Excellent)\n\n💡 *Insight*: LinkedIn touchpoints increase reply rates by 42%. Consider adding more LinkedIn steps to sequences.`,
  call: `Call workflow guidance:\n\n📞 **BANT Framework**:\n• **Budget**: Ask about allocated spend for sales automation\n• **Authority**: Identify decision-makers and influencers\n• **Need**: Map pain points to SalesFlow capabilities\n• **Timeline**: Determine implementation urgency\n\n✅ **156 calls booked** this month\n🎯 Average BANT score: 78/100\n\n💡 *Best Practice*: Leads with BANT scores above 85 convert at 3.8x the average rate.`,
  tonality: `Tonality engine insights:\n\n🎯 **Your Writing Profile**:\n• Greeting: Professional & warm\n• Sentence length: Medium (12-18 words)\n• Formality: 72/100\n• CTA style: Soft ask with value prop\n\n⚠️ **Risk Words Detected**: 3\n\"guarantee\", \"unlimited\", \"revolutionary\"\n\n💡 *Recommendation*: Replace risk words with data-driven alternatives. Emails without risk words see 23% higher reply rates.`,
  default: `I'm your SalesFlow AI assistant. I can help with:\n\n• **Workflow** – End-to-end sales automation process\n• **ICP** – Ideal customer profile analysis\n• **Campaigns** – Performance and optimization\n• **Inbox** – Reply classification and insights\n• **Analytics** – Funnel and revenue metrics\n• **Calls** – BANT qualification guidance\n• **Tonality** – Writing style optimization\n\nWhat would you like to explore?`,
};

// ── Simulate async delay ──
export const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms + Math.random() * 700));
