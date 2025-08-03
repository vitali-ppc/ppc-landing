import { NextRequest, NextResponse } from 'next/server';
import { userExists, verifyUserPassword } from '../../utils/users';

export async function GET(request: NextRequest) {
  try {
    // Проверяем наличие токена в cookies
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'No authentication token found' },
        { status: 401 }
      );
    }

    // В реальном приложении здесь была бы проверка токена
    // Пока просто возвращаем true если токен есть
    return NextResponse.json({
      authenticated: true,
      message: 'User is authenticated'
    });

  } catch (error) {
    console.error('Authentication check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Проверяем, существует ли пользователь
    if (!userExists(email)) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // Проверяем пароль
    if (!verifyUserPassword(email, password)) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful'
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 