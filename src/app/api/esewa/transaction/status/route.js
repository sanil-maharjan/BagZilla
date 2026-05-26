import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams.toString();
    const targetUrl = `https://rc-epay.esewa.com.np/api/epay/transaction/status/?${searchParams}`;

    const response = await fetch(targetUrl, {
      method: 'GET'
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying to eSewa:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
