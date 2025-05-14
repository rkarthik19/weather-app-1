from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/weather', methods=['GET'])
def get_weather():
    zipcode = request.args.get('zipcode')
    if not zipcode:
        return jsonify({"error": "Zipcode is required"}), 400
    
    # Generate random temperature between 0 and 40 degrees Celsius
    temperature = round(random.uniform(0, 40), 1)
    
    return jsonify({
        "zipcode": zipcode,
        "temperature": temperature,
        "unit": "Celsius"
    })

if __name__ == '__main__':
    app.run(debug=True, port=3000)
