from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from schema import QueryInput, Column, Table, QueryResponse

from sqlquery import execute_sql

app = FastAPI()


example_sql = """
SELECT
  *
FROM
  `hazel-mote-150900.vendor_payments.vouchers`
limit 1000
"""

@app.post("/query")
def query(q: QueryInput):
    results, columns = execute_sql(example_sql)

    print("columns", columns)
    return QueryResponse(
        summary="This is a summary",
        table=Table(
            columns=columns,
            rows=results,
        ),
    )