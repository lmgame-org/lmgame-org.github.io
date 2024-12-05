import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

# Connect with database
BASE_DIR = "/Users/vicayu/Desktop/game_arena_website"
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'users.db')}"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
metadata = MetaData()
metadata.reflect(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def query_table(table_name, filters=None, limit=None, offset=None):
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
