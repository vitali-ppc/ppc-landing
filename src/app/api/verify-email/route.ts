import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUserVerification } from '../utils/users';

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
    // Проверяем базовую валидность
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

    // Получаем пользователя из системы
    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Проверяем токен верификации
    if (user.verificationToken !== token) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Обновляем статус верификации пользователя
    updateUserVerification(email, true);

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