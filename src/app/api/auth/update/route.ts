import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const formData = await request.formData();
    
    // Forward the request to the actual API
    const response = await fetch('https://tmp-se-projectapi.azurewebsites.net/api/auth/update', {
      method: 'PUT',
      headers: {
        ...(authHeader && { 'Authorization': authHeader }),
      },
      body: formData,
    });

    const data = await response.json();

    // Return the response with appropriate status
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Update profile API error:', error);
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
      'Access-Control-Allow-Methods': 'PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
