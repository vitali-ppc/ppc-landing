import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { userExists } from '../utils/users';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Проверяем, существует ли пользователь с таким email
    if (!userExists(email)) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // Генерируем токен для сброса пароля
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Создаем ссылку для сброса пароля
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    const { data, error } = await resend.emails.send({
      from: 'Kampaio <noreply@kampaio.com>',
      to: [email],
      subject: 'Reset your Kampaio password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset your Kampaio password</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1e293b;
              background-color: #f8fafc;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              padding: 48px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            }
            .logo {
              text-align: center;
              margin-bottom: 32px;
            }
            .logo-text {
              font-size: 24px;
              font-weight: bold;
              color: #1e293b;
            }
            .title {
              font-size: 28px;
              font-weight: 700;
              color: #1e293b;
              text-align: center;
              margin-bottom: 16px;
            }
            .description {
              font-size: 16px;
              color: #64748b;
              text-align: center;
              margin-bottom: 32px;
              line-height: 1.5;
            }
                         .button {
               display: inline-block;
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
               color: white !important;
               text-decoration: none;
               padding: 14px 32px;
               border-radius: 8px;
               font-weight: 600;
               font-size: 16px;
               text-align: center;
               margin: 24px 0;
             }
            .button:hover {
              transform: translateY(-1px);
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            }
            .warning {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 16px;
              margin: 24px 0;
              font-size: 14px;
              color: #64748b;
            }
            .footer {
              text-align: center;
              margin-top: 32px;
              font-size: 12px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <div class="logo-text">Kampaio</div>
            </div>
            
            <h1 class="title">Reset your password</h1>
            
            <p class="description">
              You requested a password reset for your Kampaio account. Click the button below to reset your password.
            </p>
            
                         <div style="text-align: center;">
               <a href="${resetLink}" class="button" style="color: white !important; text-decoration: none;">
                 Reset Password
               </a>
             </div>
            
            <div class="warning">
              <strong>Security notice:</strong> This link will expire in 24 hours. If you didn't request this password reset, you can safely ignore this email.
            </div>
            
            <p style="font-size: 14px; color: #64748b; text-align: center;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetLink}" style="color: #667eea; word-break: break-all;">${resetLink}</a>
            </p>
            
            <div class="footer">
              © Kampaio. This email was sent to ${email}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // В реальном приложении здесь нужно сохранить токен в базе данных
    // вместе с email и временем создания для проверки при сбросе пароля

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset email sent successfully' 
    });

  } catch (error) {
    console.error('Send reset email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 