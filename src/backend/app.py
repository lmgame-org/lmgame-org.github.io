# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from db import get_db_connection
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Helper function to query leaderboard data
def fetch_leaderboard(query):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(query)
        leaderboard_data = cursor.fetchall()
        cursor.close()
        conn.close()
        return leaderboard_data
    except Exception as e:
        print(f"Error fetching leaderboard data: {e}")
        return None

# Akinator leaderboards
@app.route('/api/akinator/players', methods=['GET'])
def akinator_players():
    query = 'SELECT name, score FROM akinator_players ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch akinator players data"}), 500

@app.route('/api/akinator/models', methods=['GET'])
def akinator_models():
    query = 'SELECT name, score FROM akinator_models ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch akinator models data"}), 500

# Taboo leaderboards
@app.route('/api/taboo/players', methods=['GET'])
def taboo_players():
    query = 'SELECT name, score FROM taboo_players ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch taboo players data"}), 500

@app.route('/api/taboo/models', methods=['GET'])
def taboo_models():
    query = 'SELECT name, score FROM taboo_models ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch taboo models data"}), 500

# Bluffing leaderboards
@app.route('/api/bluffing/players', methods=['GET'])
def bluffing_players():
    query = 'SELECT name, score FROM bluffing_players ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch bluffing players data"}), 500

@app.route('/api/bluffing/models', methods=['GET'])
def bluffing_models():
    query = 'SELECT name, score FROM bluffing_models ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch bluffing models data"}), 500

# General rank leaderboard
@app.route('/api/general/rank', methods=['GET'])
def general_rank():
    query = 'SELECT name, score FROM general_rank ORDER BY score DESC'
    data = fetch_leaderboard(query)
    return jsonify(data) if data else jsonify({"error": "Failed to fetch general rank data"}), 500

if __name__ == "__main__":
    app.run(port=5000)
