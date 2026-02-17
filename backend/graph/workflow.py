from typing import TypedDict
from langgraph.graph import StateGraph

from agents.classification_agent import classification_agent
from agents.icp_agent import icp_agent


class AgentState(TypedDict):
    user_input: str
    classification: dict
    selected_icp: dict


graph = StateGraph(AgentState)

graph.add_node("classification", classification_agent)
graph.add_node("icp", icp_agent)

graph.set_entry_point("classification")

graph.add_edge("classification", "icp")

app = graph.compile()
