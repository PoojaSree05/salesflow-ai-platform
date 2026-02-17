import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "phi3"


def call_llm(prompt):
    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0,      
                    "top_p": 1,
                    "repeat_penalty": 1.0
                }
            },
            timeout=60  # prevent hanging
        )

        response.raise_for_status()  # raises error if status != 200

        data = response.json()

        return data.get("response", "").strip()

    except requests.exceptions.ConnectionError:
        print(" Ollama is not running on localhost:11434")
        return ""

    except requests.exceptions.Timeout:
        print("LLM request timed out")
        return ""

    except Exception as e:
        print("LLM Error:", e)
        return ""
