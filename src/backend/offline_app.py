# backend/app.py
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
from utilities import *

def update_status():
    try:
        update_scores()
        print({"status": "success", "message": "Scores updated successfully"})
    except Exception as e:
        print({"status": "failure", "message": str(e)})
    
if __name__ == "__main__":
    update_status()