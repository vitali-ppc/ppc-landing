import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/chat?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/chat?error=no_code`);
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/api/auth/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/chat?error=token_exchange_failed`);
    }

    // Store tokens in session or database (for now, we'll redirect with tokens)
    // In production, you should store these securely
    const { access_token, refresh_token } = tokenData;

    // Get user info from Google
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        const userEmail = userInfo.email;
        
        // Redirect back to chat page with success and email
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/chat?auth=success&access_token=${access_token}&email=${encodeURIComponent(userEmail)}`);
      }
    } catch (error) {
      console.error('Failed to get user info:', error);
    }

    // Fallback redirect without email
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/chat?auth=success&access_token=${access_token}`);

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/chat?error=callback_error`);
  }
} 