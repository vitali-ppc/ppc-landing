import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { businessType, industry, budget, goals } = await request.json()

    // Простая валидация
    if (!businessType || !industry) {
      return NextResponse.json(
        { error: 'Business type and industry are required' },
        { status: 400 }
      )
    }

    // Пока что возвращаем mock данные
    // Позже подключим GPT API
    const strategy = {
      businessType,
      industry,
      budget,
      goals,
      recommendations: [
        'Focus on social media marketing',
        'Create engaging content',
        'Use targeted advertising',
        'Monitor and optimize campaigns'
      ],
      timeline: '3-6 months',
      expectedResults: 'Increase in brand awareness and leads'
    }

    return NextResponse.json({ strategy })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 