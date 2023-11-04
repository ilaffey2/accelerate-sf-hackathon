from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class QueryInput(BaseModel):
    question: str



class Column(BaseModel):
    name: str
    description: str


class Table(BaseModel):
    columns: List[Column]
    rows: List[List[str]]


class QueryResponse(BaseModel):
    summary: str
    table: Table


@app.post("/query")
def query(q: QueryInput) -> QueryResponse:
    return QueryResponse(
        summary="This is a summary",
        table=Table(
            columns=[
                Column(name="column1", description="description1", value="value1"),
                Column(name="column2", description="description2", value="value2"),
            ]
        ),
    )

