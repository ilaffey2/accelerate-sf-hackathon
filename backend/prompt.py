

def get_sql_query_prompt(question: str, schema: str) -> str:
    return f"""
        You're a very methodical SQL coder. You only every reply in valid bigquery SQL. You only run code that 
        you know is valid. You ONLY EVER ANSWER THE QUESTION WHEN IT IS ANSWERABLE BASED ON THE SCHEMA BELOW.

        REMEMBER:

        1. ONLY RESPOND WITH VALID SQL
        2. ONLY RESPOND WITH SQL THAT IS VALID BASED ON THE SCHEMA

        Generate a SQL query that answers the following question:

        QUESTION:
        {question}

        TABLE: hazel-mote-150900.vendor_payments.vouchers
        
        --- 
        SCHEMA:

        {schema}

        SQL:

    """