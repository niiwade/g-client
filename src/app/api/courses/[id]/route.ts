import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get the form data from the request
    const formData = await request.formData();
    
    // Get the Authorization header from the request
    const authHeader = request.headers.get('Authorization');
    
    console.log('=== UPDATE COURSE API REQUEST ===');
    console.log('Course ID:', id);
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log('=== END REQUEST LOG ===');

    // Forward the form data to the actual API
    const response = await fetch(`https://tmp-se-projectapi.azurewebsites.net/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        ...(authHeader && { 'Authorization': authHeader }),
      },
      body: formData, // Forward the form data as-is
    });

    const data = await response.json();
    
    console.log('=== UPDATE COURSE API RESPONSE ===');
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
    console.error('Update course API error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log('=== GET SINGLE COURSE API REQUEST ===');
    console.log('Course ID:', id);
    console.log('=== END REQUEST LOG ===');
    
    // Forward GET request to fetch specific course with email/password authentication
    const response = await fetch(`https://tmp-se-projectapi.azurewebsites.net/api/courses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": "abdulgaffar.abuabakar@ntm.se",
        "password": "123456"
      })
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
    console.error('Get course API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get the Authorization header from the request
    const authHeader = request.headers.get('Authorization');
    
    console.log('=== DELETE COURSE API REQUEST ===');
    console.log('Course ID:', id);
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    console.log('=== END REQUEST LOG ===');
    
    // Forward DELETE request to remove course with email/password authentication
    const response = await fetch(`https://tmp-se-projectapi.azurewebsites.net/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader }),
      },
      body: JSON.stringify({
        "email": "abdulgaffar.abuabakar@ntm.se",
        "password": "123456"
      })
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
    console.error('Delete course API error:', error);
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
