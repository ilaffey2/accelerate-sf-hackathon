import os
import sqlite3
from dotenv import load_dotenv

from schema import Column

load_dotenv()


DATABASE_PATH = os.getenv('DATABASE_PATH')

def execute_sql(sql):
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute(sql)
    results = c.fetchall()
    columns = [Column(name=description[0]) for description in c.description]
    conn.close()
    return results, columns
    
