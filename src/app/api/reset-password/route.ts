import { NextRequest, NextResponse } from 'next/server';

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

    // В реальном приложении здесь нужно:
    // 1. Проверить токен в базе данных
    // 2. Убедиться, что токен не истек (24 часа)
    // 3. Найти пользователя по email
    // 4. Хешировать новый пароль
    // 5. Обновить пароль в базе данных
    // 6. Удалить использованный токен

    // Для демонстрации просто проверяем базовую валидность
    if (token.length < 1) { // Временно упрощаем для тестирования
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Имитация успешного обновления пароля
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