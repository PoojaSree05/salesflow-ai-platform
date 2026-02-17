import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "phi3"


def call_llm(prompt):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }, 
    )

    if response.status_code == 200:
        return response.json()["response"]
    else:
        raise Exception("LLM call failed:", response.text)
