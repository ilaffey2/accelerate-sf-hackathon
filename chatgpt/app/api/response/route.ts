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
  const url = 'https://hermit-sharp-bengal.ngrok-free.app/query';
  
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
    const data: QueryResponse = await response.json();

    console.log('data', data)

    // // Return the parsed data
    // return data;

    return NextResponse.json({data}, {status: 200})
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error posting question:', error);
    throw error;
  }
}