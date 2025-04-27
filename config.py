import os

DEBUG = True
SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///staybnb.db")
SQLALCHEMY_TRACK_MODIFICATIONS = False