// Define base URL for the API
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

// Hardcoded API Key and Tenant ID
const API_KEY = 'yum-KwOi5vm2TYNmi8Dd';
// const TENANT_ID = 'tmrd';   // TENANT_ID

// Function to get API key (returns the predefined API key as a promise)
export const getApiKey = async (): Promise<string> => {
  return API_KEY;
};

// Interface for tenant response
interface TenantResponse {
  id: string;
  name: string;
}

// Register Tenant function (available if needed)
export const registerTenant = async (tenantName: string): Promise<TenantResponse> => {
  const response = await fetch(`${BASE_URL}/tenants`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'x-zocom': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: tenantName }),
  });

  if (!response.ok) {
    throw new Error('Failed to register tenant');
  }

  const data: TenantResponse = await response.json();
  return data; // Returns tenant ID and name
};
