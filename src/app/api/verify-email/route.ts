import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // Проверяем наличие токена и email
  if (!token || !email) {
    return NextResponse.json(
      { error: 'Missing verification token or email' },
      { status: 400 }
    );
  }

  try {
    // TODO: В реальном приложении здесь будет:
    // 1. Проверка токена в базе данных
    // 2. Проверка срока действия токена
    // 3. Обновление статуса пользователя на "verified"
    // 4. Удаление использованного токена

    // Для демонстрации просто проверяем базовую валидность
    if (token.length < 10) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Здесь будет код для обновления статуса пользователя
    // await updateUserVerificationStatus(email, true);
    // await deleteVerificationToken(token);

    console.log(`Email verified successfully for: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      email: email
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 