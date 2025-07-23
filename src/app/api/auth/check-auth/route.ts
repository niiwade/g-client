import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the Authorization header from the request
    const authHeader = request.headers.get('Authorization');
    
    console.log('=== CHECK AUTH API REQUEST ===');
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    console.log('=== END REQUEST LOG ===');

    // Forward the request to the actual API
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/auth/check-auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader }),
      },
    });

    const data = await response.json();
    
    console.log('=== CHECK AUTH API RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Response data:', data);
    console.log('=== END RESPONSE LOG ===');

    // Return the response with appropriate status
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Check auth API error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('=== CHECK AUTH POST API REQUEST ===');
    console.log('Request body:', body);
    console.log('=== END REQUEST LOG ===');

    // Forward the request to the actual API
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/auth/check-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    console.log('=== CHECK AUTH POST API RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Response data:', data);
    console.log('=== END RESPONSE LOG ===');

    // Return the response with appropriate status
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Check auth POST API error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
