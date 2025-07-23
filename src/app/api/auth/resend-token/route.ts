import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get Authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    console.log('=== RESEND TOKEN API CALLED ===');
    console.log('Request body:', body);
    console.log('Auth header present:', authHeader ? 'YES' : 'NO');
    console.log('Auth header value:', authHeader || 'None');
    
    // Try the original endpoint first WITHOUT authentication
    console.log('\n--- Attempt 1: Original endpoint without auth ---');
    const originalUrl = 'https://tmp-se-projectapi.azurewebsites.net/api/auth/resend-token';
    
    let response = await fetch(originalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    // If successful, return the result
    if (response.status === 200 || response.status === 201) {
      console.log('SUCCESS: Resend worked without authentication');
      return NextResponse.json(data, { 
        status: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
    
    // If failed and we have auth header, try with authentication
    if (authHeader) {
      console.log('\n--- Attempt 2: Original endpoint with auth ---');
      response = await fetch(originalUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(body),
      });
      
      data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      
      if (response.status === 200 || response.status === 201) {
        console.log('SUCCESS: Resend worked with authentication');
        return NextResponse.json(data, { 
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      }
    }
    
    // Try alternative endpoints
    const alternativeEndpoints = [
      'https://tmp-se-projectapi.azurewebsites.net/api/auth/resend-verification-token',
      'https://tmp-se-projectapi.azurewebsites.net/api/auth/resend-otp',
      'https://tmp-se-projectapi.azurewebsites.net/api/auth/resend-verification-email'
    ];
    
    for (let i = 0; i < alternativeEndpoints.length; i++) {
      console.log(`\n--- Attempt ${i + 3}: ${alternativeEndpoints[i]} ---`);
      
      response = await fetch(alternativeEndpoints[i], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { 'Authorization': authHeader })
        },
        body: JSON.stringify(body),
      });
      
      data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      
      if (response.status === 200 || response.status === 201) {
        console.log(`SUCCESS: Resend worked with endpoint ${alternativeEndpoints[i]}`);
        break;
      }
    }
    
    console.log('=== END RESEND TOKEN API ===\n');

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
    console.error('Resend token API error:', error);
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
