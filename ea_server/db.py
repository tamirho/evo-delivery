import bson

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo, ObjectId

def get_db():
    """
    Configuration method to return db instance
    """
    _db = getattr(g, "_database", None)
    if _db is None:
        _db = g._database = PyMongo(current_app).db
    return _db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)


def get_draft_by_id(id):
    try:
        return db.drafts.find_one_or_404({"_id": ObjectId(id)})
    except Exception as e:
        return e
