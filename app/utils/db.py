import os
from typing import Any, Dict

from pymongo import MongoClient
from bson import ObjectId


_mongo_client: MongoClient | None = None


def _get_mongo_client() -> MongoClient:
    """Khởi tạo MongoClient theo kiểu singleton để tái sử dụng kết nối."""
    global _mongo_client
    if _mongo_client is None:
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        _mongo_client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    return _mongo_client


def get_db():
    """Lấy instance database theo biến môi trường MONGODB_DB (mặc định: food_system)."""
    db_name = os.getenv("MONGODB_DB", "food_system")
    return _get_mongo_client()[db_name]


def serialize_mongo_document(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Chuyển đổi các kiểu MongoDB (ObjectId, ...) sang kiểu JSON-friendly."""
    if not doc:
        return doc
    result: Dict[str, Any] = {}
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            result[key] = str(value)
        else:
            result[key] = value
    return result



