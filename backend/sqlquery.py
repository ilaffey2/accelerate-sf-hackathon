from google.cloud import bigquery
from dotenv import load_dotenv
import os
import base64

from schema import Column

load_dotenv()

encoded_credentials = os.getenv("ENCODED_GOOGLE_CREDENTIALS")
decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8")
GCP_CREDS_PATH = './gcp-creds.json'

os.makedirs(os.path.dirname(GCP_CREDS_PATH), exist_ok=True)

with open(GCP_CREDS_PATH, "w") as f:
    f.write(decoded_credentials)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = GCP_CREDS_PATH

def execute_sql(sql):
    client = bigquery.Client()
    query_job = client.query(sql)
    results = query_job.result()
    rows = [row.values() for row in results]
    columns = [Column(name=field.name, type=field.field_type) for field in results.schema]

    print(results.schema)
    return rows, columns

