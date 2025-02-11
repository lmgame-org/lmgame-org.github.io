# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
from utilities import *


# filter out untested models
def filter_out_1000_values(data: list) -> list:
    return  [item for item in data if item["score"] != 1000.0]

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/')
def home():
    return "Welcome to the Game Arena Website Backend!"

@app.route('/api/general/update', methods=['post'])
def update_status():
    try:
        update_scores()
        return jsonify({"status": "success", "message": "Scores updated successfully"})
    except Exception as e:
        return jsonify({"status": "failure", "message": str(e)}) 

# Akinator leaderboards
@app.route('/api/akinator/players', methods=['GET'])
def akinator_players():
    mode = "Akinator"
    data = get_user_scores(mode)
    return jsonify(data)

@app.route('/api/akinator/models', methods=['GET'])
def akinator_models():
    mode = "Akinator"
    data =filter_out_1000_values(get_model_scores(mode))
    return jsonify(data) 

# Taboo leaderboards
@app.route('/api/taboo/players', methods=['GET'])
def taboo_players():
    mode = "Taboo"
    data = get_user_scores(mode)
    return jsonify(data) 

@app.route('/api/taboo/models', methods=['GET'])
def taboo_models():
    mode ="Taboo"
    data = filter_out_1000_values(get_model_scores(mode))
    return jsonify(data) 

# Bluffing leaderboards
@app.route('/api/bluffing/players', methods=['GET'])
def bluffing_players():
    mode = "Bluffing"
    data = get_user_scores(mode)
    return jsonify(data) 

@app.route('/api/bluffing/models', methods=['GET'])
def bluffing_models():
    mode = "Bluffing"
    data = filter_out_1000_values(get_model_scores(mode))
    return jsonify(data)

# General rank leaderboard
@app.route('/api/general/model', methods=['GET'])
def general_model():
    try:
        data = filter_out_1000_values(get_average_model_scores())
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Total game sessions endpoint
@app.route('/api/general/total_sessions', methods=['GET'])
def total_sessions():
    try:
        total_game_sessions = query_table("game_sessions")
        total_sessions_count = len(total_game_sessions)
        
        return jsonify({"total_sessions": total_sessions_count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(port=5000)
