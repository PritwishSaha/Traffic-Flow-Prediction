from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load("traffic_prediction_model.pkl")

# Load feature names
feature_names = joblib.load("traffic_features.pkl")


@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "Traffic Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        # Get input values
        date = int(data["date"])
        car_count = int(data["car_count"])
        bike_count = int(data["bike_count"])
        bus_count = int(data["bus_count"])
        truck_count = int(data["truck_count"])
        hour = int(data["hour"])
        minute = int(data["minute"])
        rush_hour = int(data["rush_hour"])
        day_of_week = int(data["day_of_week"])

        # Calculate total automatically
        total = (
            car_count
            + bike_count
            + bus_count
            + truck_count
        )

        # Create input dataframe
        input_data = pd.DataFrame([{
            "Date": date,
            "CarCount": car_count,
            "BikeCount": bike_count,
            "BusCount": bus_count,
            "TruckCount": truck_count,
            "Hour": hour,
            "Minute": minute,
            "RushHour": rush_hour,
            "Day_of_Week": day_of_week
        }])

        # Make sure columns are in the same order
        input_data = input_data[feature_names]

        # Prediction
        prediction = model.predict(input_data)[0]

        # Probability
        probabilities = model.predict_proba(input_data)[0]

        classes = model.classes_

        confidence = max(probabilities) * 100

        probability_data = {
            str(classes[i]): round(
                probabilities[i] * 100,
                2
            )
            for i in range(len(classes))
        }

        return jsonify({
            "success": True,
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "total": total,
            "probabilities": probability_data
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )