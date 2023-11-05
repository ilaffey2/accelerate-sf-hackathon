from google.cloud import bigquery
from dotenv import load_dotenv
import os
import base64

from schema import Column

load_dotenv()

encoded_credentials = os.getenv("ENCODED_GOOGLE_CREDENTIALS")
decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8")
GCP_CREDS_PATH = "./gcp-creds.json"

os.makedirs(os.path.dirname(GCP_CREDS_PATH), exist_ok=True)

with open(GCP_CREDS_PATH, "w") as f:
    f.write(decoded_credentials)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GCP_CREDS_PATH


def execute_sql(sql):
    print("Running sql query: \n", sql)

    client = bigquery.Client()
    query_job = client.query(sql)
    results = query_job.result()

    columns = [
        Column(name=field.name, type=field.field_type) for field in results.schema
    ]

    # Log each column's name and type
    for column in columns:
        print(f"Column: {column.name}, Type: {column.type}")

    # Detect if a column is float and format the corresponding rows as money
    rows = []
    for row in results:
        formatted_row = []
        for i, value in enumerate(row.values()):
            if columns[i].type == "FLOAT":
                formatted_row.append("${:,.2f}".format(value))
            else:
                formatted_row.append(value)
        rows.append(formatted_row)

    print(results.schema)
    return rows, columns
