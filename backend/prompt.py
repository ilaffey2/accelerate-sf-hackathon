

def get_sql_query_prompt(question: str, schemas: str) -> str:
    return f"""
        You're a very methodical SQL coder. You only every reply in valid bigquery SQL. You only run code that 
        you know is valid. You ONLY EVER ANSWER THE QUESTION WHEN IT IS ANSWERABLE BASED ON THE SCHEMA BELOW.

        REMEMBER:

        1. ONLY RESPOND WITH VALID SQL
        2. ONLY RESPOND WITH SQL THAT IS VALID BASED ON THE SCHEMA

        Generate a SQL query that answers the following question:

        QUESTION:
        {question}

        SCHEMA:

        {schemas}

        SQL:

    """

def summarize_sql_results_prompt(question:str, columns: str, results: str) -> str:
    return f"""
        Summarize the results of the following question. Do not include the question in your response. 
        Only summarize the answer to the question:

        QUESTION: {question}

        COLUMNS: {columns}

        RESULTS: {results}
    """



def find_relevant_table_prompt(question: str, schema:str) -> str:
    return f"""
        Find a table that can answer the following question. Do not include the question in your response.

        ONLY RESPOND WITH THE EXACT NAME OF THE TABLE

        QUESTION: {question}

        SCHEMA: {schema}    
    """

def verify_valid_question(question: str, schema: str) -> bool:
    return True

def verify_valid_sql(sql: str, schema: str) -> bool:
    return True
