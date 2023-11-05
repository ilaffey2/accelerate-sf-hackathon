import { NextResponse } from "next/server";

// Define the TypeScript types for the expected response
type QueryResponse = {
  summary: string;
  table: {
    columns: { name: string; description: string }[];
    rows: string[][];
  };
};

type RequestData = {
  question: string
}

export const runtime = 'edge'

export async function POST(request: Request): Promise<NextResponse> {
  const url = 'https://accelerate-sf-hackathon-production.up.railway.app/query';
  
  // Prepare the request body with the question parameter
  const { question } = (await request.json()) as RequestData

  console.log('question', question)

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({question}),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} and response ${response} and response text ${response.text}`);
    }

    // // Parse the JSON response
    const responseData: QueryResponse = await response.json();
    const { columns, rows } = responseData.table;
    const {summary} = responseData

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

    const data = {table, summary}

    return NextResponse.json({data}, {status: 200})
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error posting question:', error);
    throw error;
  }
}