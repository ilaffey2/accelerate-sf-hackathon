from google.cloud import bigquery
from dotenv import load_dotenv
import os

from schema import Column

load_dotenv()

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv('GOOGLE_APPLICATION_CREDENTIALS_PATH')

def execute_sql(sql):
    client = bigquery.Client()
    query_job = client.query(sql)
    results = query_job.result()
    rows = [row.values() for row in results]
    columns = [Column(name=field.name, type=field.field_type) for field in results.schema]

    return rows, columns

