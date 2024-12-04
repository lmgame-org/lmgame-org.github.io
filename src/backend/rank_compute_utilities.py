import json

from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import sessionmaker

import enum
import os

BASE_DIR = "/home/yuxuan/hao_ai_lab/game_arena_website"
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'users.db')}"  # Database file is 'users.db'
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
# Connection string to the existing database
SQLALCHEMY_DATABASE_URL = "sqlite:///./existing_database.db"  # Update this with your DB URL

# Connect to the database
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
metadata = MetaData()
metadata.reflect(bind=engine)  # Load existing database schema without modifying it

# Create a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db_session = SessionLocal()

# Access an existing table (replace 'your_table_name' with the actual table name)
your_table = metadata.tables['your_table_name']

# Query the table
with engine.connect() as connection:
    result = connection.execute(your_table.select())
    for row in result:
        print(dict(row))  # Convert row to a dictionary for easier reading
