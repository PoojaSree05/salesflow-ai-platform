import pandas as pd
import os
from llm import call_llm


def find_best_matching_role(user_role, dataset_roles):
    """
    Uses a SINGLE LLM call to determine which dataset role
    is semantically closest to the user role.
    """

    role_list_text = "\n".join([f"- {role}" for role in dataset_roles])

    prompt = f"""
You are a semantic role matching engine.

User is looking for: "{user_role}"

From the following list of roles:

{role_list_text}

Return ONLY the single role from the list that is
most semantically similar to the user role.
Return exactly as written.
"""

    response = call_llm(prompt).strip()

    return response


def icp_agent(state):
    classification = state["classification"]

    extracted_role = classification.get("role", "")
    extracted_location = classification.get("location", "")

    # Load dataset
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    file_path = os.path.join(BASE_DIR, "data", "mock_dataset.csv")

    df = pd.read_csv(file_path)

    if df.empty:
        return {
            "selected_icp": None,
            "match_score": 0
        }

    # 🔹 Location pre-filter
    if extracted_location:
        df = df[df["location"].str.lower().str.contains(extracted_location.lower(), na=False)]

    if df.empty:
        return {
            "selected_icp": None,
            "match_score": 0
        }

    # 🔹 Get unique roles from filtered dataset
    unique_roles = df["role"].dropna().unique().tolist()

    # 🔹 Single LLM call to find best role
    best_role_match = find_best_matching_role(extracted_role, unique_roles)

    best_score = 0
    best_match = None

    # 🔹 Score rows
    for _, row in df.iterrows():
        score = 0

        row_role = str(row.get("role", ""))

        # Role match scoring
        if row_role.strip().lower() == best_role_match.strip().lower():
            score += 60

        # Location scoring
        score += 30

        # Engagement scoring
        engagement = row.get("engagement_score", 0)
        try:
            score += float(engagement) * 0.1
        except:
            pass

        if score > best_score:
            best_score = score
            best_match = row

    if best_match is None:
        return {
            "selected_icp": None,
            "match_score": 0
        }

    result_dict = best_match.to_dict()

    # Generate LinkedIn dynamically
    name = result_dict.get("name", "")
    linkedin_slug = name.lower().replace(" ", "")
    result_dict["linkedin_url"] = f"https://linkedin.com/in/{linkedin_slug}"

    if "linked_url" in result_dict:
        result_dict.pop("linked_url")

    return {
        "selected_icp": result_dict,
        "match_score": round(best_score, 2)
    }
