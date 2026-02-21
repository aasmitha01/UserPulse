from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# ✅ JWT IMPORTS (IMPORTANT)
from flask_jwt_extended import (
    JWTManager,
    create_access_token
)

# ==============================
# APP SETUP
# ==============================
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "claimwatch-secret-key"

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# temporary user storage (later DB)
users = {}

# ==============================
# LOAD ML MODEL
# ==============================
model = pickle.load(open("model/model.pkl", "rb"))

# feature importance
importance = model.feature_importances_.tolist()

# ==============================
# PREDICTION API
# ==============================
@app.route("/predict", methods=["POST"])
def predict():

    req = request.json

    # create empty feature vector
    data = np.zeros(1163)

    # ✅ MAP FEATURES IN CORRECT ORDER
    data[0] = float(req.get("age", 0))
    data[1] = float(req.get("months", 0))
    data[2] = float(req.get("premium", 0))
    data[3] = float(req.get("totalClaim", 0))
    data[4] = float(req.get("injury", 0))

    # prediction
    probability = model.predict_proba([data])[0][1]
    prediction = int(probability > 0.5)

    return jsonify({
        "status": "FRAUD" if prediction else "LEGAL",
        "confidence": round(probability * 100, 2),
        "importance": importance[:5],
        "input": req
    })


# ==============================
# REGISTER API
# ==============================
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if email in users:
        return jsonify({"msg": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    users[email] = hashed_pw

    return jsonify({"msg": "User registered successfully"})


# ==============================
# LOGIN API
# ==============================
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if email not in users:
        return jsonify({"msg": "User not found"}), 404

    if not bcrypt.check_password_hash(users[email], password):
        return jsonify({"msg": "Wrong password"}), 401

    token = create_access_token(identity=email)

    return jsonify({
        "token": token,
        "user": email
    })


# ==============================
# HEALTH CHECK (optional)
# ==============================
@app.route("/")
def home():
    return jsonify({"msg": "ClaimWatch AI Backend Running"})


# ==============================
# RUN SERVER
# ==============================
if __name__ == "__main__":
    app.run(debug=True)