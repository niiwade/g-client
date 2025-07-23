import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Get the Authorization header from the request
    const authHeader = request.headers.get('Authorization');
    
    console.log('=== CREATE COURSE API REQUEST ===');
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log('=== END REQUEST LOG ===');

    // Forward the form data to the actual API
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/courses', {
      method: 'POST',
      headers: {
        ...(authHeader && { 'Authorization': authHeader }),
      },
      body: formData, // Forward the form data as-is
    });

    const data = await response.json();
    
    console.log('=== CREATE COURSE API RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Response data:', data);
    console.log('=== END RESPONSE LOG ===');

    // Return the response with appropriate status
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Create course API error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Forward GET requests to fetch courses
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Get courses API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
