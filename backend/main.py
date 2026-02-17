import json
from graph.workflow import app

if __name__ == "__main__":
    result = app.invoke({
        "user_input": "Need an HR manager in London immediately for scaling team"
    })

    print("\n================ FINAL OUTPUT ================\n")

    print(json.dumps(result, indent=4))

    print("\n==============================================\n")
