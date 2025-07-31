import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // В реальном приложении здесь нужно:
    // 1. Проверить, не существует ли уже пользователь с таким email
    // 2. Хешировать пароль
    // 3. Создать пользователя в базе данных
    // 4. Генерировать токен подтверждения email
    // 5. Отправлять письмо подтверждения

    // Генерируем токен подтверждения
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    // Отправляем письмо подтверждения
    try {
      await resend.emails.send({
        from: 'Kampaio <noreply@kampaio.com>',
        to: email,
        subject: 'Verify your Kampaio account',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your Kampaio account</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #374151;
                margin: 0;
                padding: 0;
                background-color: #f8fafc;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
              }
              .logo {
                color: white;
                font-size: 28px;
                font-weight: bold;
                margin: 0;
              }
              .content {
                padding: 40px 30px;
              }
              .title {
                font-size: 24px;
                font-weight: 600;
                color: #1e293b;
                margin: 0 0 16px 0;
                text-align: center;
              }
              .description {
                font-size: 16px;
                color: #64748b;
                margin: 0 0 32px 0;
                text-align: center;
                line-height: 1.6;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                margin: 0 auto;
                display: block;
                width: fit-content;
              }
              .footer {
                background: #f8fafc;
                padding: 24px 30px;
                text-align: center;
                font-size: 14px;
                color: #64748b;
              }
              .security-note {
                background: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 8px;
                padding: 16px;
                margin: 24px 0;
                font-size: 14px;
                color: #92400e;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">Kampaio</h1>
              </div>
              <div class="content">
                <h2 class="title">Verify your email address</h2>
                <p class="description">
                  Thanks for signing up! Please verify your email address by clicking the button below. This helps us ensure your account security.
                </p>
                <a href="${verificationLink}" class="button" style="color: white !important; text-decoration: none;">
                  Verify Email Address
                </a>
                <div class="security-note">
                  <strong>Security note:</strong> This verification link will expire in 24 hours. If you didn't create a Kampaio account, you can safely ignore this email.
                </div>
              </div>
              <div class="footer">
                <p>© 2024 Kampaio. All rights reserved.</p>
                <p>If you're having trouble clicking the button, copy and paste this URL into your browser: <a href="${verificationLink}" style="color: #667eea;">${verificationLink}</a></p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      console.log(`Verification email sent to ${email} with token: ${verificationToken.substring(0, 10)}...`);

      return NextResponse.json({ 
        success: true, 
        message: 'Account created successfully. Please check your email to verify your account.' 
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Account created but failed to send verification email. Please contact support.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 