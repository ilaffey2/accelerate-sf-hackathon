def get_sql_query_prompt(question: str, schema: str) -> str:
    return f"""
        You're a very methodical SQL coder. You only every reply in valid bigquery SQL. You only run code that 
        you know is valid. You ONLY EVER ANSWER THE QUESTION WHEN IT IS ANSWERABLE BASED ON THE SCHEMA BELOW.

        REMEMBER:

        1. ONLY RESPOND WITH VALID SQL
        2. ONLY RESPOND WITH SQL THAT IS VALID BASED ON THE SCHEMA
        3. DO NOT RESPOND WITH ANY TEXT OR EMBELLISHMENT THAT ARE NOT VALID SQL
        4. ALWAYS USE BACKTICKS (`) TO ENCLOSE COLUMN NAMES
        5. ENSURE THAT YOU ALWAYS USE CASE INVARIANT QUERIES

        Generate a SQL query that answers the following question:

        QUESTION: {question}

        SCHEMA:

        {schema}

        SQL:

    """


def get_sql_query_with_expanded_schema_prompt(
    question: str, schema: str, expansion_query: str, expanded_cols, expanded_rows
) -> str:
    return f"""
        You're a very methodical SQL coder. You only every reply in valid bigquery SQL. You only run code that 
        you know is valid. You ONLY EVER ANSWER THE QUESTION WHEN IT IS ANSWERABLE BASED ON THE SCHEMA BELOW.

        REMEMBER:

        1. ONLY RESPOND WITH VALID SQL
        2. ONLY RESPOND WITH SQL THAT IS VALID BASED ON THE SCHEMA
        3. DO NOT RESPOND WITH ANY TEXT OR EMBELLISHMENT THAT ARE NOT VALID SQL
        4. ALWAYS USE BACKTICKS (`) TO ENCLOSE COLUMN NAMES
        5. DO NOT TRY AND MATCH KEYWORDS THAT MIGHT NOT EXIST IN THE DATA. TRY AND USE THE SCHEMA AND DESCRIPTIONS TO CREATE THE QUERY
        6. LIMIT YOUR RESPONSE TO a MAX of 10,000 ROWS
        7. ENSURE THAT YOU ALWAYS USE CASE INVARIANT QUERIES


        Generate a SQL query that answers the following question:

        QUESTION: {question}

        SCHEMA:

        {schema}

        
        Here is the expanded schema based on the query you ran:

        EXPAND QUERY: 
        
        {expansion_query}

        
        EXPANDED COLUMNS:

        {expanded_cols}
        

        EXPANDED ROWS: 
        
        {expanded_rows}

        
        NOTE: You DO NOT need to limit to 100 rows or anything from the previous query. You can return up to 10,000 rows.

        
        SQL:

        """


def get_expand_schema_prompt(question: str, schema: str) -> str:
    return f"""
        Given the following question and schema, run a SQL query to get more context on the schema if you think
        the schema is not complete enough to answer the question.

        REMEMBER:

        1. ONLY RESPOND WITH VALID SQL
        2. ONLY RESPOND WITH SQL THAT IS VALID BASED ON THE SCHEMA
        3. DO NOT RESPOND WITH ANY TEXT OR EMBELLISHMENT THAT ARE NOT VALID SQL
        4. ALWAYS USE BACKTICKS (`) TO ENCLOSE COLUMN NAMES
        5. DO NOT TRY AND MATCH KEYWORDS THAT MIGHT NOT EXIST IN THE DATA. TRY AND USE THE SCHEMA AND DESCRIPTIONS TO CREATE THE QUERY
        6. ALWAYS LIMIT YOUR RESPONSE TO a MAX of 100 ROWS
        
        Use this SQL query to get more context on the schema rather than to get data back. For example, you can use the query
        to get back the unique values in one or more column.

        QUESTION: {question} 

        SCHEMA: 
        
        {schema}
        
        SQL:
    """


def summarize_sql_results_prompt(question: str, columns: str, results: str) -> str:
    return f"""
        Summarize the results of the following question. Do not include the question in your response. 
        Only summarize the answer to the question:
        Return your results as a markdown formatted string, pretty printed.


        QUESTION: {question}

        COLUMNS: {columns}

        RESULTS: {results}

    """


def find_relevant_table_prompt(question: str, schema: str) -> str:
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
