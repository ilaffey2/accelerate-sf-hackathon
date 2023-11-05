import { NextResponse } from "next/server";

// Define the TypeScript types for the expected response
type QueryResponse = {
  summary: string;
  table: {
    columns: { name: string; description: string }[];
    rows: string[][];
  };
  sql: string
};

type RequestData = {
  id: string
}

export const runtime = 'edge'
const { NEXT_PUBLIC_BACKEND_API } = process.env

const URL = NEXT_PUBLIC_BACKEND_API ? NEXT_PUBLIC_BACKEND_API : 'http://0.0.0.0:8000'

export async function POST(request: Request): Promise<NextResponse> {
  const url = URL + '/preset';
  
  // Prepare the request body with the question parameter
  const { id } = (await request.json()) as RequestData

  console.log('id', id)

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({i: id}),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} and response ${response} and response text ${response.text}`);
    }

    // // Parse the JSON response
    const responseData: QueryResponse = await response.json();
    const { columns, rows } = responseData.table;
    const {summary, sql} = responseData

      // Transform the columns into an array of strings
      const transformedColumns = columns.map(column => column.name);

      // Transform the rows into an array of objects
      const table = rows.map(row => {
        let rowObject: { [key: string]: any } = {};
        row.forEach((value, index) => {
          rowObject[transformedColumns[index]] = value;
        });
        return rowObject;
      });


      // console.log(table)


    // // Return the parsed data
    // return data;

    const data = {table, summary, sql}

    return NextResponse.json({data}, {status: 200})
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error posting question:', error);
    throw error;
  }
}