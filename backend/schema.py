from pydantic import BaseModel
from typing import List, Optional, Any

class QueryInput(BaseModel):
    question: str


class Column(BaseModel):
    name: str
    type: Optional[str] = ""
    description: Optional[str] = ""


class Table(BaseModel):
    columns: List[Column]
    rows: List[List[Any]]


class QueryResponse(BaseModel):
    summary: str
    table: Table
