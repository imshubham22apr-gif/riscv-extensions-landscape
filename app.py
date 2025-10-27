from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Set your OpenAI API key here (or as environment variable)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Landing page
@app.route("/")
def home():
    return render_template("index.html")

# GPT-powered chatbot endpoint
@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message")

    # Construct prompt with verified info only
    prompt = f"""
    You are a public health assistant. Only provide accurate information about
    Malaria and Dengue. Use simple language suitable for rural and semi-urban populations.
    Question: {user_msg}
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150
        )
        reply = response['choices'][0]['message']['content'].strip()
    except Exception as e:
        reply = "Sorry, something went wrong. Please try again."

    return jsonify({"reply": reply})
    

if __name__ == "__main__":
    app.run(debug=True)
