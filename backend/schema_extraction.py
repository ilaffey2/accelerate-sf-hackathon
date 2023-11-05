from typing import List
from google.cloud import bigquery
from dotenv import load_dotenv
import os
from schema import TableSchema, ColumnSchema

load_dotenv()

table_ids = ["budget","purchase_order_summary","spending_and_revenue","supplier_contracts","vouchers"]

DATASET_ID = 'vendor_payments'
PROJECT_ID = 'hazel-mote-150900'


def extract_schema_from_tables() -> List[TableSchema]:
    client = bigquery.Client()
    schemas = []

    for table_id in table_ids:
        table_ref = client.dataset(dataset_id=DATASET_ID, project=PROJECT_ID).table(table_id)
        table = client.get_table(table_ref)

        print(table_ref)

        schemas.append(TableSchema(
        # datasetid="hazel-mote-150900",
        name=table.__str__(),  # use table_id as the name
        # name=table.table_id,  # use table_id as the name
            columns=[
                ColumnSchema(
                    name=field.name if field.name else "",
                    type=field.field_type if field.field_type else "",
                    description=field.description if field.description else "",
                ) for field in table.schema
            ],
            description=table.description if table.description else "",
        ))

    return schemas
    # return schemas, table


  
