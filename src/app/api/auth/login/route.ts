import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Debug: виводимо значення GOOGLE_CLIENT_ID
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;
  
  // Debug logging
  console.log('Debug - GOOGLE_CLIENT_ID:', clientId);
  console.log('Debug - NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  console.log('Debug - Redirect URI:', redirectUri);
  
  if (!clientId) {
    console.error('Google Client ID not found in environment variables');
    return NextResponse.json({ error: 'Google Client ID not configured' }, { status: 500 });
  }

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/userinfo.email');
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'consent');

  console.log('Debug - Google Auth URL:', googleAuthUrl.toString());

  return NextResponse.redirect(googleAuthUrl.toString());
} 