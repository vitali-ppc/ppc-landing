'use client'

import React from 'react'

export default function ChatForm() {
  return (
    <div className="chat-container" style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <h2>Запитай щось у GPT</h2>
      <form method="POST" action="/chat">
        <textarea 
          name="message" 
          placeholder="Введіть ваше питання..." 
          required
          style={{
            width: '100%',
            height: '120px',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            resize: 'vertical'
          }}
        ></textarea>
        <button 
          type="submit" 
          style={{
            background: '#525bdb',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'background 0.3s',
            fontSize: '16px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#3d47c0'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#525bdb'
          }}
        >
          Надіслати
        </button>
      </form>
    </div>
  )
} 