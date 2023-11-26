from typing import Union
from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel
import dal

app = FastAPI()


class Bucket(BaseModel):
    id: int
    name: str
    creation_date: datetime


buckets = [
    {
        "id": 1,
        "name": "bucket_name",
        "creation_date": datetime.now(),
    },
    {
        "id": 2,
        "name": "bucket_name2",
        "creation_date": datetime.now(),
    },
    {
        "id": 3,
        "name": "bucket_name3",
        "creation_date": datetime.now(),
    },
    {
        "id": 4,
        "name": "bucket_name4",
        "creation_date": datetime.now(),
    },
]


@app.get("/buckets")
async def root(skip: int = 0, limit: int = 100, q: Union[str, None] = None):
    res = {
        "skip": skip,
        "limit": limit,
        "data": dal.fetch_buckets(),
    }

    if q:
        res["q"] = q

    return res


@app.get("/buckets/{id}")
async def get_bucket(id: int):
    for bucket in buckets:
        if bucket["id"] == id:
            return {
                "success": True,
                "data": [bucket],
            }
    return {
        "success": False,
    }


@app.post("/buckets")
async def create_bucket(bucket: Bucket):
    buckets.append(bucket)
    return {"success": True}
