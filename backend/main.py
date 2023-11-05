import os
import time
import openai
from fastapi import FastAPI
from prompt import (
    get_sql_query_prompt,
    summarize_sql_results_prompt,
    find_relevant_table_prompt,
    get_expand_schema_prompt,
    get_sql_query_with_expanded_schema_prompt,
)
from presets import get_preset_from_id
from schema import (
    QueryInput,
    Column,
    Table,
    QueryResponse,
    VisualizeResponse,
    PresetInput,
)
from ai import askgpt, schema
import json

# import matplotlib

# matplotlib.use("Agg")  # Must be before importing matplotlib.pyplot or pylab!
# import matplotlib.pyplot as plt
import io
import base64
from table_schema import schema
from sqlquery import execute_sql

from schema_extraction import extract_schema_from_tables

app = FastAPI()
openai.api_key = os.getenv("OPENAI_API_KEY")

GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID")


@app.post("/query")
def query(q: QueryInput) -> QueryResponse:
    schemas = extract_schema_from_tables()

    # schemas, table= extract_schema_from_tables()

    # relevant_table_prompt = find_relevant_table_prompt(q.question, schemas.__str__())
    # table = askgpt(relevant_table_prompt, model="gpt-4")

    # print("Using table: ", table)

    # table_schema = [s for s in schemas if s.name == table][0]

    # print("table_schema: ", table_schema)

    prompt = get_sql_query_prompt(q.question, schemas.__str__())

    # Try and gather more context
    expand_schema_prompt = get_expand_schema_prompt(q.question, schemas.__str__())
    expand_schema_query = askgpt(expand_schema_prompt, model="gpt-4")
    expand_schema_results, expand_schema_columns = execute_sql(expand_schema_query)

    if len(expand_schema_results) != 0:
        print(
            "Expanding schema resulted in {} new rows".format(
                len(expand_schema_results)
            )
        )
        prompt = get_sql_query_with_expanded_schema_prompt(
            q.question,
            schemas.__str__(),
            expand_schema_query,
            expand_schema_columns.__str__(),
            expand_schema_results.__str__(),
        )

    st = time.time()
    sql = askgpt(prompt, model="gpt-4-0613")
    et = time.time()

    print("Query took: ", et - st, "seconds")

    results, columns = execute_sql(sql)
    summarize_prompt = summarize_sql_results_prompt(
        q.question, columns.__str__(), results[:50].__str__()
    )
    summary = askgpt(summarize_prompt, model="gpt-3.5-turbo-16k")

    return QueryResponse(
        summary=summary,
        table=Table(
            columns=columns,
            rows=results,
        ),
        sql=sql,
    )


@app.post("/preset")
def preset(p: PresetInput) -> QueryResponse:
    question, sql = get_preset_from_id(p.i)

    results, columns = execute_sql(sql)
    summarize_prompt = summarize_sql_results_prompt(
        question, columns.__str__(), results[:50].__str__()
    )
    summary = askgpt(summarize_prompt, model="gpt-3.5-turbo-16k")

    return QueryResponse(
        summary=summary,
        table=Table(
            columns=columns,
            rows=results,
        ),
        sql=sql,
    )


@app.post("/visualize_test")
def query() -> VisualizeResponse:
    code_to_run = """
# Load the response as a JSON object
response = '''
{
"data": {
    "records": [
    {
        "Organization Group": "Group A",
        "Purchase Orders": 1000
    },
    {
        "Organization Group": "Group B",
        "Purchase Orders": 800
    },
    {
        "Organization Group": "Group C",
        "Purchase Orders": 1200
    }
    ]
}
}
'''

data = json.loads(response)

# Extract the organization groups and purchase order counts from the response
organization_groups = [record["Organization Group"] for record in data["data"]["records"]]
purchase_orders = [record["Purchase Orders"] for record in data["data"]["records"]]

# Create a bar plot
plt.bar(organization_groups, purchase_orders)

# Add labels and title
plt.xlabel("Organization Group")
plt.ylabel("Purchase Orders")
plt.title("Most Purchase Orders by Organization Group in 2022")

# Rotate x-axis labels if needed


plt.savefig(buf, format='png')
buf.seek(0)
"""

    buf = io.BytesIO()
    exec(code_to_run)

    # Convert the BytesIO object to a base64 string
    image_base64 = base64.b64encode(buf.read()).decode("utf-8")

    return VisualizeResponse(imageString=image_base64)


# @app.post("/visualize")
# def query() -> VisualizeResponse:
#     response = """
#     {
#     "data": {
#         "records": [
#         {
#             "Organization Group": "Group A",
#             "Purchase Orders": 1000
#         },
#         {
#             "Organization Group": "Group B",
#             "Purchase Orders": 800
#         },
#         {
#             "Organization Group": "Group C",
#             "Purchase Orders": 1200
#         }
#         ]
#     }
#     }
#     """

#     # Load the response as a JSON object
#     data = json.loads(response)

#     # Extract the organization groups and purchase order counts from the response
#     organization_groups = [
#         record["Organization Group"] for record in data["data"]["records"]
#     ]
#     purchase_orders = [record["Purchase Orders"] for record in data["data"]["records"]]

#     # Create a bar plot
#     plt.bar(organization_groups, purchase_orders)

#     # Add labels and title
#     plt.xlabel("Organization Group")
#     plt.ylabel("Purchase Orders")
#     plt.title("Most Purchase Orders by Organization Group in 2022")

#     # Rotate x-axis labels if needed
#     plt.xticks(rotation=45)

#     buf = io.BytesIO()
#     plt.savefig(buf, format="png")
#     buf.seek(0)

#     # Convert the BytesIO object to a base64 string
#     image_base64 = base64.b64encode(buf.read()).decode("utf-8")

#     # Return the base64 string
#     # return VisualizeResponse(imageString="test")
#     return VisualizeResponse(imageString=image_base64)
