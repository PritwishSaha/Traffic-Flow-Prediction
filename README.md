# 🚦 TrafficSense AI — Traffic Flow Prediction

**TrafficSense AI** is a machine learning–powered web application that predicts traffic conditions based on real-time traffic and temporal information.

The system analyzes **car, bike, bus, and truck counts**, along with **date, time, day of the week, and rush-hour information**, and classifies the expected traffic condition into four categories:

> 🟢 **Low** · 🔵 **Normal** · 🟠 **High** · 🔴 **Heavy**

The trained machine learning model is exposed through a **Flask REST API** and integrated with a modern **HTML, CSS, and JavaScript frontend**, allowing users to enter traffic information and receive an immediate prediction.

---

## 🌐 Live Demo

### 🚀 Try TrafficSense AI

**Live Application:**
https://traffic-flow-prediction-detector.netlify.app/

### 💻 Source Code

**GitHub Repository:**
https://github.com/PritwishSaha/Traffic-Flow-Prediction

---

## 📌 Project Overview

Traffic congestion is a major challenge in modern urban transportation. Increasing vehicle volume during peak hours can lead to congestion, longer travel times, fuel consumption, and inefficient transportation planning.

This project uses **Machine Learning classification** to identify traffic conditions from historical traffic data.

The application provides a simple interface where users can enter traffic-related information. The frontend sends the input data to the Flask backend, which processes the features using the trained ML model and returns the predicted traffic category along with prediction probabilities.

### 🎯 Main Objective

The primary objective of this project is to build an end-to-end machine learning application capable of:

* Analyzing traffic-related data
* Learning patterns from historical observations
* Predicting traffic conditions
* Providing prediction probabilities
* Connecting a trained ML model to a web application
* Demonstrating deployment of an ML application

---

# ✨ Key Features

### 🚗 Multi-Vehicle Traffic Analysis

The model considers multiple vehicle categories:

* Cars
* Bikes
* Buses
* Trucks

### 🕐 Time-Based Prediction

The prediction incorporates temporal information such as:

* Date
* Hour
* Minute
* Day of the week

### 🚦 Rush-Hour Awareness

The system considers whether the input corresponds to a rush-hour period.

### 🤖 Machine Learning Prediction

A trained classification model analyzes the supplied features and predicts one of four traffic conditions:

| Traffic Condition | Meaning                   |
| ----------------- | ------------------------- |
| 🟢 Low            | Low traffic volume        |
| 🔵 Normal         | Normal traffic conditions |
| 🟠 High           | Increased traffic volume  |
| 🔴 Heavy          | Severe traffic congestion |

### 📊 Prediction Probabilities

The application can display the probability associated with each traffic class, helping users understand the model's confidence distribution rather than relying only on the predicted class.

### 🌐 Web-Based Interface

The project provides a responsive frontend built using:

* HTML
* CSS
* JavaScript

### ⚡ REST API

The trained model is connected to the frontend through a Flask API.

---

# 🧠 Machine Learning Workflow

The project follows a typical end-to-end machine learning workflow:

```text
Historical Traffic Dataset
          │
          ▼
   Data Preprocessing
          │
          ▼
   Feature Preparation
          │
          ▼
  Model Training
          │
          ▼
  Model Evaluation
          │
          ▼
 Trained ML Model
          │
          ▼
     Flask API
          │
          ▼
 HTML / CSS / JavaScript
          │
          ▼
   User Prediction
```

---

# 📊 Input Features

The prediction system uses traffic and temporal features such as:

| Feature       | Description                                               |
| ------------- | --------------------------------------------------------- |
| `CarCount`    | Number of cars                                            |
| `BikeCount`   | Number of bikes                                           |
| `BusCount`    | Number of buses                                           |
| `TruckCount`  | Number of trucks                                          |
| `Total`       | Total number of vehicles                                  |
| `Date`        | Date of observation                                       |
| `Hour`        | Hour of observation                                       |
| `Minute`      | Minute of observation                                     |
| `Day_of_Week` | Day of the week                                           |
| `RushHour`    | Indicates whether the observation occurs during rush hour |

The exact feature-processing pipeline should remain consistent between model training and production prediction.

---

# 🎯 Target Variable

The model predicts:

```text
Traffic Situation
```

with four possible classes:

```text
Low
Normal
High
Heavy
```

This makes the project a **multi-class classification problem**.

---

# 🏗️ Project Architecture

The application follows a simple client-server machine learning architecture:

```text
                  ┌───────────────────────┐
                  │       User            │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │   Frontend            │
                  │ HTML / CSS / JS       │
                  └───────────┬───────────┘
                              │
                         HTTP Request
                              │
                              ▼
                  ┌───────────────────────┐
                  │     Flask API         │
                  │      Backend          │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │  Trained ML Model     │
                  │   Prediction Engine   │
                  └───────────┬───────────┘
                              │
                         Prediction
                              │
                              ▼
                  ┌───────────────────────┐
                  │   Frontend Result     │
                  │ Class + Probabilities │
                  └───────────────────────┘
```

---

# 📁 Project Structure

```text
Traffic-Flow-Prediction/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── ...
│
├── .gitignore
├── .gitattributes
└── README.md
```

> The repository is organized into separate `backend` and `frontend` components.

---

# 🛠️ Technology Stack

## Programming Language

* **Python**

## Machine Learning

* **Pandas**
* **NumPy**
* **Scikit-learn**
* Machine Learning Classification

## Backend

* **Flask**
* REST API
* Python

## Frontend

* **HTML5**
* **CSS3**
* **JavaScript**

## Development Tools

* Git
* GitHub
* VS Code
* Jupyter Notebook / Python environment

## Deployment

* **Netlify** — Frontend deployment
* Flask backend — API service

---

# 🔌 API Architecture

The frontend communicates with the Flask backend using HTTP requests.

A typical prediction request contains the traffic and temporal features required by the trained model.

Example request structure:

```json
{
  "CarCount": 120,
  "BikeCount": 45,
  "BusCount": 15,
  "TruckCount": 10,
  "Total": 190,
  "Hour": 18,
  "Minute": 30,
  "Day_of_Week": 2,
  "RushHour": 1
}
```

The API processes the input and returns a prediction.

Example response structure:

```json
{
  "prediction": "High",
  "probabilities": {
    "Low": 0.02,
    "Normal": 0.15,
    "High": 0.71,
    "Heavy": 0.12
  }
}
```

> The exact request and response fields should match the implementation in `backend/app.py`.

---

# 💻 Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/PritwishSaha/Traffic-Flow-Prediction.git
```

Move into the project directory:

```bash
cd Traffic-Flow-Prediction
```

---

## 2. Create a Virtual Environment

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 3. Install Backend Dependencies

Move into the backend directory:

```bash
cd backend
```

Install the required packages:

```bash
pip install -r requirements.txt
```

---

## 4. Start the Flask API

Run:

```bash
python app.py
```

The Flask server should start locally.

Depending on your Flask configuration, the API will generally be available at:

```text
http://127.0.0.1:5000
```

---

# 🌐 Running the Frontend

Open the `frontend` directory and launch:

```text
index.html
```

For a better development experience, you can use the **Live Server** extension in VS Code.

Make sure the frontend API URL points to your running Flask backend.

For example:

```javascript
const API_URL = "http://127.0.0.1:5000";
```

---

# 🔄 How Prediction Works

The prediction process works as follows:

### Step 1 — User Input

The user enters:

* Vehicle counts
* Date
* Time
* Day of week
* Rush-hour status

### Step 2 — Data Preparation

The frontend prepares the entered values and sends them to the Flask API.

### Step 3 — API Processing

Flask receives the request and validates/processes the input.

### Step 4 — ML Prediction

The trained machine learning model generates the predicted traffic class.

### Step 5 — Probability Calculation

The application obtains the probability distribution across the available traffic classes.

### Step 6 — Result Display

The frontend displays:

* Predicted traffic condition
* Prediction probability/confidence
* Probability of individual traffic classes

---

# 📈 Example Prediction

Suppose the user enters:

```text
Cars       → 250
Bikes      → 100
Buses      → 25
Trucks     → 20
Hour       → 18
Minute     → 30
Rush Hour  → Yes
```

The system may produce:

```text
Predicted Traffic: HIGH
```

along with the probability distribution for the four classes.

The prediction depends entirely on the trained model and the supplied feature values.

---

# 🎯 Use Cases

Traffic prediction systems can potentially support:

* 🚦 Traffic monitoring
* 🛣️ Transportation planning
* 🏙️ Smart-city applications
* 🚗 Congestion analysis
* 📊 Traffic data analytics
* 🚑 Route and emergency planning
* 📍 Intelligent transportation systems

This project is primarily a **machine-learning demonstration and prediction application**, rather than a production-grade traffic-management system.

---

# 🔐 Data & Model Considerations

For reliable predictions, the production application should use the **same feature definitions, preprocessing steps, encoding, and feature ordering** used during model training.

Important considerations include:

* Input validation
* Handling missing values
* Correct categorical encoding
* Consistent feature order
* Model versioning
* API error handling
* Secure deployment configuration

---

# 🚀 Future Improvements

The project can be extended with several advanced features.

### 📍 Real-Time Traffic Data

Integrate live traffic APIs or IoT sensors to automatically obtain vehicle counts.

### 🗺️ Traffic Visualization

Add interactive maps showing predicted traffic conditions by location.

### 📊 Historical Analytics

Provide charts for:

* Traffic trends
* Rush-hour patterns
* Daily traffic volume
* Weekly traffic patterns
* Vehicle distribution

### 🤖 Model Comparison

Compare multiple algorithms such as:

* Logistic Regression
* Random Forest
* Decision Tree
* XGBoost
* Gradient Boosting

### ⏱️ Time-Series Forecasting

Instead of only classifying the current traffic condition, future versions could forecast traffic conditions for upcoming time intervals.

### ☁️ Production Deployment

Deploy the Flask API using a cloud platform and configure the frontend to communicate with the production API.

### 📱 Responsive Design

Further optimize the interface for mobile and tablet devices.

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

* Machine Learning classification
* Data preprocessing
* Feature engineering
* Model prediction
* Python development
* Flask REST API development
* Frontend-backend integration
* JavaScript API communication
* Git and GitHub
* ML model deployment
* Building an end-to-end ML application

---

# 🧪 Project Status

**Status:** ✅ Completed / Deployed

The project includes:

* ✅ Machine learning prediction model
* ✅ Flask backend
* ✅ Web frontend
* ✅ API integration
* ✅ Traffic classification
* ✅ Prediction probability display
* ✅ GitHub repository
* ✅ Live frontend deployment

---

# 👨‍💻 Author

## Pritwish Saha

B.Tech — Computer Science & Engineering
Specialization: Artificial Intelligence & Machine Learning

### Connect

* GitHub: https://github.com/PritwishSaha
* LinkedIn: https://www.linkedin.com/in/pritwish-saha-b49604362/

---

# ⭐ Support the Project

If you find this project useful or interesting:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest improvements

---

# 📄 License

This project is intended for educational, learning, and portfolio purposes.

If you plan to reuse or distribute the project, please check the repository's licensing terms and add an explicit open-source license if you want to grant reuse permissions.

---

## 🚦 TrafficSense AI

> **Turning traffic data into intelligent predictions.**

Built with **Python • Machine Learning • Flask • JavaScript**
