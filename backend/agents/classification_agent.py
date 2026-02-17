import json
import re
from llm import call_llm


def safe_json_parse(text):
    """
    Attempts to safely extract JSON from messy LLM output.
    """

    # Extract content between first { and last }
    start = text.find("{")
    end = text.rfind("}") + 1

    if start == -1 or end == -1:
        return None

    json_str = text[start:end]

    # Fix common LLM mistakes
    json_str = re.sub(r"(\w+):", r'"\1":', json_str)  # add quotes to keys
    json_str = json_str.replace("'", '"')  # replace single quotes
    json_str = re.sub(r",\s*}", "}", json_str)  # remove trailing commas

    try:
        return json.loads(json_str)
    except:
        return None


def classification_agent(state):
    user_input = state["user_input"]

    prompt = f"""
Extract structured business information from the text.

Text:
"{user_input}"

Return ONLY JSON in this exact format:

{{
  "role": "",
  "location": "",
  "urgency": "",
  "time_context": "",
  "business_behavior": "",
  "user_intent": ""
}}
"""

    response = call_llm(prompt).strip()

    classification_data = safe_json_parse(response)

    # If LLM completely fails → fallback intelligent rule-based
    if not classification_data:

        role_match = re.search(
            r"(HR|Human Resource Manager|Sales Director|CTO|Founder|Marketing Head|Product Manager|Operations Manager)",
            user_input,
            re.IGNORECASE,
        )

        location_match = re.search(r"in ([A-Za-z ]+)", user_input)

        classification_data = {
            "role": role_match.group(0) if role_match else "Unknown",
            "location": location_match.group(1) if location_match else "Unknown",
            "urgency": "High" if "urgent" in user_input.lower() else "Medium",
            "time_context": "Immediate" if "urgent" in user_input.lower() else "Short-term",
            "business_behavior": "Hiring",
            "user_intent": "Recruitment",
        }

    return {"classification": classification_data}
