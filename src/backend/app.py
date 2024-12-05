# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
# from trueskill2_user_ranking import calculate_player_scores
from utilities import *
import atexit

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



# # Akinator leaderboards
# @app.route('/api/akinator/players', methods=['GET'])
# def akinator_players():
#     mode = "akinator"
#     return jsonify(data)

# @app.route('/api/akinator/models', methods=['GET'])
# def akinator_models():
#     mode = "akinator"
#     return jsonify(data) 

# # Taboo leaderboards
# @app.route('/api/taboo/players', methods=['GET'])
# def taboo_players():
#     mode = "taboo"
#     return jsonify(data) 

# @app.route('/api/taboo/models', methods=['GET'])
# def taboo_models():
#     mode ="taboo"
#     return jsonify(data) 

# # Bluffing leaderboards
# @app.route('/api/bluffing/players', methods=['GET'])
# def bluffing_players():
#     mode = "bluffing"
#     return jsonify(data) 

# @app.route('/api/bluffing/models', methods=['GET'])
# def bluffing_models():
#     mode = "bluffing"
#     return jsonify(data)

# General rank leaderboard
@app.route('/api/general/model', methods=['GET'])
def general_model():
    try:
        data = get_average_model_scores()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/api/general/user', methods=['GET'])
# def general_player():
#     try:
#         # Retrieve precomputed user scores from JSON file
#         with open('./precomputed_data/General_user_scores.json', 'r') as f:
#             data = json.load(f)
#         return jsonify(data)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
