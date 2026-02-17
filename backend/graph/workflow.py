from typing import TypedDict, List, Dict
from langgraph.graph import StateGraph

from agents.classification_agent import classification_agent
from agents.icp_agent import icp_agent
from agents.platform_agent import platform_decision_agent


class AgentState(TypedDict):
    user_input: str
    classification: dict
    icp_rankings: List[Dict]
    selected_channel: str


graph = StateGraph(AgentState)

graph.add_node("classification", classification_agent)
graph.add_node("icp", icp_agent)
graph.add_node("platform", platform_decision_agent)

graph.set_entry_point("classification")

graph.add_edge("classification", "icp")
graph.add_edge("icp", "platform")

# 🔥 VERY IMPORTANT
graph.set_finish_point("platform")

app = graph.compile()
