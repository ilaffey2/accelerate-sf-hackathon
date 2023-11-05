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
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({question}),
    // });

    // // Check if the request was successful
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status} and response ${response} and response text ${response.text}`);
    // }

    // // // Parse the JSON response
    // const data: QueryResponse = await response.json();

    const data  = {
      summary: "Hi there, this is a summary",
      table: [{
      "Contract_Number": "1000019022",
      "Contract_Title": "HSA COVID19 Hotel Rooms",
      "Term_Start_Date": "2020-08-04",
      "Term_End_Date": "2024-08-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "THE MONARCH HOTEL",
      "Supplier_Name": "THE MONARCH HOTEL",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HSA COVID19 Hotel Rooms",
      "Contract_Awarded_Amount": "19127760.0",
      "Purchase_Orders_Outstanding": "3969145.42",
      "Payments_Made": "14349765.45",
      "Remaining_Contract_Award_Amount": "808849.13"
    }, {
      "Contract_Number": "1000019115",
      "Contract_Title": "HOM-Navigation Center\u0026Shelter",
      "Term_Start_Date": "2020-07-01",
      "Term_End_Date": "2024-06-30",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "PACIFIC GAS \u0026 ELECTRIC CO",
      "Supplier_Name": "PACIFIC GAS \u0026 ELECTRIC CO",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-Navigation Center\u0026Shelter",
      "Contract_Awarded_Amount": "300000.0",
      "Purchase_Orders_Outstanding": "82260.02",
      "Payments_Made": "177739.98",
      "Remaining_Contract_Award_Amount": "40000.0"
    }, {
      "Contract_Number": "1000022048",
      "Contract_Title": "888 Post St. Acquisition",
      "Term_Start_Date": "2021-06-01",
      "Term_End_Date": "2022-05-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "888 Post Street",
      "Supplier_Name": "888 Post Street",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "888 Post St. Acquisition",
      "Contract_Awarded_Amount": "7622.0",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "3811.0",
      "Remaining_Contract_Award_Amount": "3811.0"
    }, {
      "Contract_Number": "1000022694",
      "Contract_Title": "HOM-888 Post St. Accquisition",
      "Term_Start_Date": "2021-08-05",
      "Term_End_Date": "2021-12-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "CHICAGO TITLE COMPANY",
      "Supplier_Name": "CHICAGO TITLE COMPANY",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-888 Post St. Accquisition",
      "Contract_Awarded_Amount": "29100000.0",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "29046747.35",
      "Remaining_Contract_Award_Amount": "53252.65"
    }, {
      "Contract_Number": "1000024277",
      "Contract_Title": "HOM-3055-3061 16StAccquisition",
      "Term_Start_Date": "2021-12-21",
      "Term_End_Date": "2023-05-16",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "CHICAGO TITLE COMPANY",
      "Supplier_Name": "CHICAGO TITLE COMPANY",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-3055-3061 16StAccquisition",
      "Contract_Awarded_Amount": "5614013.4",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "5614013.4",
      "Remaining_Contract_Award_Amount": "0.0"
    }, {
      "Contract_Number": "1000024286",
      "Contract_Title": "HOM-1321MissionSt Accquisition",
      "Term_Start_Date": "2021-12-21",
      "Term_End_Date": "2023-03-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "STEWART TITLE GUARANTY CO",
      "Supplier_Name": "STEWART TITLE GUARANTY CO",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-1321MissionSt Accquisition",
      "Contract_Awarded_Amount": "40110150.04",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "40110150.04",
      "Remaining_Contract_Award_Amount": "0.0"
    }, {
      "Contract_Number": "1000024674",
      "Contract_Title": "HOM-835 Turk Street",
      "Term_Start_Date": "2022-02-18",
      "Term_End_Date": "2022-04-30",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "CHICAGO TITLE COMPANY",
      "Supplier_Name": "CHICAGO TITLE COMPANY",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-835 Turk Street",
      "Contract_Awarded_Amount": "25659163.75",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "25659163.75",
      "Remaining_Contract_Award_Amount": "0.0"
    }, {
      "Contract_Number": "1000024942",
      "Contract_Title": "HOM-Management Fee @ 835 Turk",
      "Term_Start_Date": "2022-01-01",
      "Term_End_Date": "2022-12-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "Vantaggio Suites",
      "Supplier_Name": "Vantaggio Suites",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-Management Fee @ 835 Turk",
      "Contract_Awarded_Amount": "144600.87",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "144600.43",
      "Remaining_Contract_Award_Amount": "0.44"
    }, {
      "Contract_Number": "1000025261",
      "Contract_Title": "HOM-5630-5638 MissionSt",
      "Term_Start_Date": "2022-05-09",
      "Term_End_Date": "2023-07-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "STEWART TITLE GUARANTY CO",
      "Supplier_Name": "STEWART TITLE GUARANTY CO",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-1321MissionSt Accquisition",
      "Contract_Awarded_Amount": "17017100.75",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "17017100.75",
      "Remaining_Contract_Award_Amount": "0.0"
    }, {
      "Contract_Number": "1000025272",
      "Contract_Title": "HOM-333 12th St",
      "Term_Start_Date": "2022-05-10",
      "Term_End_Date": "2023-03-31",
      "Contract_Type": "Non-Purchasing Contract (Rents, etc.)",
      "Purchasing_Authority": "NON-PURCHASING",
      "Sole_Source": null,
      "Department_Code": "HOM",
      "Department": "HOM Homelessness Services",
      "Supplier_Name__Prime_Contractor_": "CHICAGO TITLE COMPANY",
      "Supplier_Name": "CHICAGO TITLE COMPANY",
      "project_team_lbe_status": "Non-LBE",
      "Non_Profit": null,
      "Supplier_Type": "Prime Contractor",
      "Scope_of_Work": "HOM-835 Turk Street",
      "Contract_Awarded_Amount": "100090985.26",
      "Purchase_Orders_Outstanding": "0.0",
      "Payments_Made": "100090985.24",
      "Remaining_Contract_Award_Amount": "0.02"
    }]}

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