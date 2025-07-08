'use client'

import { useState } from 'react'

interface Strategy {
  businessType: string
  industry: string
  budget: string
  goals: string
  recommendations: string[]
  timeline: string
  expectedResults: string
}

export default function StrategyGeneratorForm() {
  const [formData, setFormData] = useState({
    businessType: '',
    industry: '',
    budget: '',
    goals: ''
  })
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setStrategy(data.strategy)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        AI Генератор Маркетингових Стратегій
      </h1>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Тип бізнесу:
            </label>
            <input
              type="text"
              value={formData.businessType}
              onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              placeholder="Наприклад: E-commerce, SaaS, B2B"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Індустрія:
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              placeholder="Наприклад: Технології, Фінанси, Освіта"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Бюджет (USD):
            </label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="Наприклад: 5000-10000"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Цілі:
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              placeholder="Опишіть ваші маркетингові цілі..."
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#525bdb',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Генеруємо стратегію...' : 'Згенерувати стратегію'}
          </button>
        </form>

        {strategy && (
          <div style={{
            background: '#f9f9f9',
            padding: '30px',
            borderRadius: '10px',
            border: '1px solid #ddd'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>
              Ваша маркетингова стратегія
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <strong>Бізнес:</strong> {strategy.businessType} в {strategy.industry}
            </div>
            
            {strategy.budget && (
              <div style={{ marginBottom: '20px' }}>
                <strong>Бюджет:</strong> {strategy.budget} USD
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <strong>Рекомендації:</strong>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                {strategy.recommendations.map((rec: string, index: number) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong>Термін реалізації:</strong> {strategy.timeline}
            </div>

            <div>
              <strong>Очікувані результати:</strong> {strategy.expectedResults}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 