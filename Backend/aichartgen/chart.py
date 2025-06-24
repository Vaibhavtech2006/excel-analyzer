from flask import Flask, jsonify
from flask_cors import CORS
import openai
import os

# Set your OpenAI API key
openai.api_key = os.getenv("yourgeminikeyhere")  # or hardcode if testing

app = Flask(__name__)
CORS(app)

def generate_chart_data_with_ai():
    prompt = """
    Generate a chart configuration in JSON with the following format:
    {
      "type": "bar" or "line" or "pie",
      "labels": ["Category 1", "Category 2", ...],
      "data": [integer values matching labels length]
    }
    Ensure the data is realistic and labels are thematically connected (e.g., fruits, countries, months).
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # or "gpt-4" if available
        messages=[
            {"role": "system", "content": "You are a helpful assistant that generates chart data."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    # Parse the JSON-like text from GPT
    import json
    message = response['choices'][0]['message']['content']
    try:
        chart_data = json.loads(message)
    except json.JSONDecodeError:
        # Fallback if AI response isn't perfect
        chart_data = {
            "type": "bar",
            "labels": ["Fallback A", "Fallback B"],
            "data": [50, 75]
        }

    return chart_data

@app.route('/api/chart-data')
def chart_data():
    data = generate_chart_data_with_ai()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
