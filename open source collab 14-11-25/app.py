# Import all necessary libraries
from flask import Flask, jsonify, json
from flask_cors import CORS
import requests  

# --- Initial Setup ---
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# --- CHENNAMMA'S CODE ---
@app.route("/api/hospitals")
def get_hospitals():
    # Open the mock data file
    # This file (mock_hospitals.json) must exist in the same /backend folder
    try:
        with open('mock_hospitals.json') as f:
            data = json.load(f)
        # Return it as JSON
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "mock_hospitals.json not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# A small route to check if the server is on
@app.route("/")
def home():
    return "Backend server is running!"


# --- AASHISH'S Work ---
@app.route("/api/medicine-shortages")
def get_medicine_shortages():
    # 1. Call the REAL OpenFDA API
    # We search for "Currently in Shortage" and limit to 10 results
    url = "https://api.fda.gov/drug/drugshortages.json?search=status:\"Currently in Shortage\"&limit=10"

    cleaned_data = []  # Our clean list
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
        data = response.json()

        # 2. Clean the messy data
        # Check if 'results' key exists and is a list
        if 'results' in data and isinstance(data['results'], list):
            for item in data['results']:
                cleaned_data.append({
                    "name": item.get('drug_name', 'Unknown Drug'),
                    "reason": item.get('reason_for_shortage', 'No reason provided')
                })
        else:
            # Handle cases where 'results' is missing or not a list
            return jsonify({"error": "Unexpected data format from OpenFDA API"}), 500

    except requests.exceptions.RequestException as e:
        # Handle network/API call errors
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        # If any other error occurs (like JSON parsing)
        return jsonify({"error": str(e)}), 500

    # 3. Return the clean list
    return jsonify(cleaned_data)


# This line allows running the app with 'python app.py'
if __name__ == '__main__':
    app.run(debug=True)


# @app.route('/')
# def helloWorld():
#     return "Hello World"

# app.run(debug=True)
