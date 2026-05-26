import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getKhaltiKeys = () => {
  let khaltiSecretKey = process.env.khalti_merchant_live_secret_key || '';
  if (!khaltiSecretKey) {
    try {
      const envPath = path.resolve(process.cwd(), '.local.env');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const secretMatch = envContent.match(/khalti_merchant_live_secret_key\s*=\s*["']?([^"'\r\n]+)["']?/);
        if (secretMatch) khaltiSecretKey = secretMatch[1].trim();
      }
    } catch (e) {
      console.error('Error reading .local.env in API route:', e);
    }
  }
  return { khaltiSecretKey };
};

export async function POST(req) {
  try {
    const targetUrl = `https://a.khalti.com/api/v2/epayment/initiate/`;
    const { khaltiSecretKey } = getKhaltiKeys();

    const body = await req.json();

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${khaltiSecretKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying to Khalti initiate:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
