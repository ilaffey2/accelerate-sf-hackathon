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
    sql: str


class PresetInput(BaseModel):
    enum: str


class VisualizeResponse(BaseModel):
    imageString: str


class ColumnSchema(BaseModel):
    name: str
    type: str = ""
    description: str = ""

    def __str__(self):
        return f"""
name: {self.name}
type: {self.type}
description: {self.description}

"""

    def __repr__(self):
        return self.__str__()


class TableSchema(BaseModel):
    name: str
    # datasetid: str
    columns: List[ColumnSchema]
    description: str = ""

    def __str__(self):
        return f"""
name: {self.name}
description: {self.description}
columns: {self.columns}

"""

    def __repr__(self):
        return self.__str__()
