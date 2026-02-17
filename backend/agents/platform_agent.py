from llm import call_llm

def platform_decision_agent(state):
    classification = state.get("classification", {})
    icps = state.get("icp_rankings", [])

    if not icps:
        return {**state, "selected_channel": "LinkedIn"}

    top_icp = icps[0]

    prompt = f"""
You are an AI communication strategy agent.

Based on the following data, decide the most effective outreach channel.

User Classification:
Role Needed: {classification.get("role")}
Location: {classification.get("location")}
Urgency: {classification.get("urgency")}
Business Behavior: {classification.get("business_behavior")}
User Intent: {classification.get("user_intent")}

Top ICP:
Role: {top_icp.get("role")}
Company Size: {top_icp.get("company_size")}
Industry: {top_icp.get("industry")}
Engagement Score: {top_icp.get("engagement_score")}
Priority Level: {top_icp.get("priority")}

Available Channels:
- LinkedIn
- Email
- Call

Rules:
• High urgency → Call preferred  
• High engagement + medium urgency → Email  
• Low urgency → LinkedIn  

Return ONLY one word:
LinkedIn, Email, or Call.
"""

    try:
        channel = call_llm(prompt).strip()

        if channel not in ["LinkedIn", "Email", "Call"]:
            channel = "LinkedIn"

    except:
        channel = "LinkedIn"

    return {
        **state,
        "selected_channel": channel
    }

    