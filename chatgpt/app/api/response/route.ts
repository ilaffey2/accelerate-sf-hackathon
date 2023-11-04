// Define the TypeScript types for the expected response
type QueryResponse = {
  summary: string;
  table: {
    columns: { name: string; description: string }[];
    rows: string[][];
  };
};

async function postQuestion(question: string): Promise<QueryResponse> {
  const url = 'https://hermit-sharp-bengal.ngrok-free.app/query';
  
  // Prepare the request body with the question parameter
  const requestBody = { question };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parse the JSON response
    const data: QueryResponse = await response.json();

    // Return the parsed data
    return data;
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error posting question:', error);
    throw error;
  }
}