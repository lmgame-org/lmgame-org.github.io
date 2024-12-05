import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

# Base directory where your project and database are located
BASE_DIR = "/home/yuxuan/hao_ai_lab/game_arena_website"

# SQLite database file path
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'users.db')}"

# Create an engine to connect to the database
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Reflect the existing database schema
metadata = MetaData()
metadata.reflect(bind=engine)

# Session setup
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Provides a database session for querying.
    Automatically closes the session after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def query_table(table_name, filters=None, limit=None, offset=None):
    """
    Query a specific table dynamically by its name with optional filters, limit, and offset.

    Args:
        table_name (str): The name of the table to query.
        filters (dict): Optional filters as column-value pairs.
        limit (int): Limit the number of rows returned.
        offset (int): Skip the first `offset` rows.

    Returns:
        list[dict]: A list of rows as dictionaries.

    Raises:
        ValueError: If the table does not exist in the database.
    """
    if table_name not in metadata.tables:
        raise ValueError(f"Table '{table_name}' does not exist in the database.")
    
    table = metadata.tables[table_name]
    query = table.select()

    # Apply filters
    if filters:
        for column_name, value in filters.items():
            if column_name not in table.c:
                raise ValueError(f"Column '{column_name}' does not exist in table '{table_name}'.")
            query = query.where(table.c[column_name] == value)

    # Apply limit and offset
    if limit:
        query = query.limit(limit)
    if offset:
        query = query.offset(offset)

    with engine.connect() as connection:
        result = connection.execute(query)
        return [dict(row) for row in result.mappings()]
