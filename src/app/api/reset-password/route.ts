import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUserPassword } from '../utils/users';

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email || !password) {
      return NextResponse.json(
        { error: 'Token, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Проверяем базовую валидность токена
    if (token.length < 1) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
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

    // В реальном приложении здесь нужно проверить токен сброса пароля
    // Для демонстрации просто обновляем пароль
    updateUserPassword(email, password);

    console.log(`Password reset for ${email} with token: ${token.substring(0, 10)}...`);

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully',
      newPassword: password // Возвращаем новый пароль для сохранения в localStorage
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 