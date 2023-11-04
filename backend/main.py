from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class QueryInput(BaseModel):
    question: str


class Column(BaseModel):
    name: str
    description: str
    value: str


class Table(BaseModel):
    columns: List[Column]


class QueryResponse(BaseModel):
    summary: str
    table: Table


@app.post("/query")
def query(q: QueryInput) -> QueryResponse:
    return {"message": "Hello World"}

