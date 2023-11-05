import os 
from time import time
import openai
from fastapi import FastAPI
from schema import QueryInput, Column, Table, QueryResponse, VisualizeResponse
from ai import askgpt, schema
import json
import matplotlib
matplotlib.use('Agg') # Must be before importing matplotlib.pyplot or pylab!
import matplotlib.pyplot as plt
import io
import base64

from sqlquery import execute_sql

app = FastAPI()
openai.api_key = os.getenv("OPENAI_API_KEY")

GCP_PROJECT_ID=os.getenv('GCP_PROJECT_ID')

example_sql = f"""
SELECT
  *
FROM
  `{GCP_PROJECT_ID}.vendor_payments.spending_and_revenue`
limit 1000
"""

@app.post("/query")
def query(q: QueryInput) ->QueryResponse:

    # ask gpt to general sql
    # sql = askgpt(q.question)
    # print(sql)
    results, columns = execute_sql(example_sql)
    return QueryResponse(
        summary="This is a summary",
        table=Table(
            columns=columns,
            rows=results,
        ),
    )

@app.post("/query-test")
def query(q: QueryInput) ->QueryResponse:

    # ask gpt to general sql
    st = time.now()
    sql = askgpt(q.question)
    et = time.now()

    print("query took", et - st, "seconds")
    print(sql)
    results, columns = execute_sql(example_sql)

    print("columns", columns)
    return QueryResponse(
        summary="This is a summary",
        table=Table(
            columns=columns,
            rows=results,
        ),
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
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')

    return VisualizeResponse(imageString=image_base64)
    


@app.post("/visualize")
def query() -> VisualizeResponse:

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

    # Load the response as a JSON object
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
    plt.xticks(rotation=45) 

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)


    # Convert the BytesIO object to a base64 string
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')

    # Return the base64 string
    # return VisualizeResponse(imageString="test")
    return VisualizeResponse(imageString=image_base64)