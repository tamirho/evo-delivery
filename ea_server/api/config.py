# import os

class Config:
    # TODO: should be overridden with a random value when deploying
    SECRET_KEY = 'dev'  # os.environ.get('SECRET_KEY')
    MONGO_URI = "mongodb://localhost:27017/evo_delivery_db"