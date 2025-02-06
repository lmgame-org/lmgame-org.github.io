import os
from datetime import datetime
from sqlalchemy import create_engine, MetaData, Table, Column, select, insert
from sqlalchemy.orm import sessionmaker

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FINAL_DB_PATH = os.path.join(BASE_DIR, 'users.db')
FINAL_DB_URL = f"sqlite:///{FINAL_DB_PATH}"

final_engine = create_engine(FINAL_DB_URL, connect_args={"check_same_thread": False})
final_metadata = MetaData()
final_metadata.reflect(bind=final_engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=final_engine)

def get_db_paths(directory, exclude_file=None):
    return [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.db') and os.path.abspath(os.path.join(directory, f)) != os.path.abspath(exclude_file)]

def get_game_sessions_tables(source_directory, exclude_file=None):
    tables = []
    db_paths = get_db_paths(source_directory, exclude_file)
    for db_path in db_paths:
        engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})
        metadata = MetaData()
        metadata.reflect(bind=engine)
        if 'game_sessions' in metadata.tables:
            tables.append((db_path, metadata.tables['game_sessions']))
    return tables

def ensure_game_sessions_table(source_directory):
    if 'game_sessions' not in final_metadata.tables:
        print("Creating game_sessions table in final DB.")
        tables = get_game_sessions_tables(source_directory, exclude_file=FINAL_DB_PATH)
        if not tables:
            print("No source database found with a game_sessions table.")
            return False

        source_table = tables[0][1]
        columns = [Column(col.name, col.type, primary_key=col.primary_key, autoincrement=col.autoincrement, nullable=col.nullable, default=col.default) for col in source_table.columns]
        Table('game_sessions', final_metadata, *columns).create(final_engine)
        final_metadata.reflect(bind=final_engine)
    return True

def aggregate_game_sessions(source_directory):
    if not ensure_game_sessions_table(source_directory):
        print("Failed to ensure game_sessions table exists.")
        return

    game_sessions_table = final_metadata.tables['game_sessions']
    all_sessions = []
    tables = get_game_sessions_tables(source_directory, exclude_file=FINAL_DB_PATH)
    
    unified_columns = set(col.name for col in game_sessions_table.columns)
    
    for db_path, source_table in tables:
        with create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False}).connect() as conn:
            result = conn.execute(select(source_table))
            for row in result.mappings():
                row_dict = dict(row)
                row_dict.pop('id', None)
                
                for column in unified_columns:
                    row_dict.setdefault(column, None)
                
                all_sessions.append(row_dict)
    
    with final_engine.begin() as conn:
        conn.execute(game_sessions_table.delete())
        if all_sessions:
            conn.execute(insert(game_sessions_table), all_sessions)
    
    print(f"Inserted {len(all_sessions)} merged game session records into final database.")


def get_user_stars_tables(source_directory, exclude_file=None):
    tables = []
    db_paths = [os.path.join(source_directory, f) for f in os.listdir(source_directory) if f.endswith('.db') and os.path.abspath(os.path.join(source_directory, f)) != os.path.abspath(exclude_file)]
    
    for db_path in db_paths:
        engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})
        metadata = MetaData()
        metadata.reflect(bind=engine)
        if 'user_stars' in metadata.tables:
            tables.append((db_path, metadata.tables['user_stars']))
    return tables

def ensure_user_stars_table(source_directory):
    if 'user_stars' not in final_metadata.tables:
        print("Creating user_stars table in final DB.")
        tables = get_user_stars_tables(source_directory, exclude_file=FINAL_DB_PATH)
        if not tables:
            print("No source database found with a user_stars table.")
            return False
        
        source_table = tables[0][1]
        columns = [Column(col.name, col.type, primary_key=col.primary_key, autoincrement=col.autoincrement, nullable=col.nullable, default=col.default) for col in source_table.columns]
        Table('user_stars', final_metadata, *columns).create(final_engine)
        final_metadata.reflect(bind=final_engine)
    return True

def aggregate_user_stars(source_directory):
    if not ensure_user_stars_table(source_directory):
        print("Failed to ensure user_stars table exists.")
        return
    
    user_stars_table = final_metadata.tables['user_stars']
    existing_ids = set()
    tables = get_user_stars_tables(source_directory, exclude_file=FINAL_DB_PATH)
    all_stars = []
    
    # Fetch existing user IDs
    with final_engine.connect() as conn:
        result = conn.execute(select(user_stars_table.c.roblox_id))
        existing_ids = {row.roblox_id for row in result}
    
    unified_columns = set(col.name for col in user_stars_table.columns)
    
    for db_path, source_table in tables:
        with create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False}).connect() as conn:
            result = conn.execute(select(source_table))
            for row in result.mappings():
                row_dict = dict(row)
                row_id = row_dict.get('roblox_id')
                if row_id in existing_ids:
                    continue  # Skip conflicting ID, keeping original
                
                for column in unified_columns:
                    row_dict.setdefault(column, None)
                
                all_stars.append(row_dict)
    
    with final_engine.begin() as conn:
        if all_stars:
            insert_stmt = insert(user_stars_table).prefix_with("OR IGNORE")
            conn.execute(insert_stmt, all_stars)
    
    print(f"Inserted {len(all_stars)} merged user star records into final database.")


if __name__ == '__main__':
    aggregate_game_sessions(BASE_DIR)
    aggregate_user_stars(BASE_DIR)

