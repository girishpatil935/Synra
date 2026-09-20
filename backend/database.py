import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base


# =========================================================
# Find the .env file
# =========================================================
# __file__ = backend/database.py
#
# So this points to:
# backend/.env
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)


# =========================================================
# Create PostgreSQL connection URL
# =========================================================

database_url = URL.create(
    drivername="postgresql+psycopg",

    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),

    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),

    database=os.getenv("DB_NAME"),
)


# =========================================================
# Create SQLAlchemy engine
# =========================================================

engine = create_engine(database_url)


# =========================================================
# Create database session factory
# =========================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# =========================================================
# Base class for database models
# =========================================================

Base = declarative_base()