import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email } = body;
    
    console.log('Verify email request:', { token, email });
    
    // Prepare the request body for the external API
    const requestBody = {
      token,
      ...(email && { email })
    };
    
    // Get Authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    // Forward the request to the actual API
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader })
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('External API response:', { status: response.status, data });

    // Return the response with appropriate status
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Verify email API error:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
