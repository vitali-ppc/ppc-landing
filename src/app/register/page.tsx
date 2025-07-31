'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState('');

  // Генерация сильного пароля
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setPassword(newPassword);
    setConfirmPassword(newPassword);
    setSuggestedPassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Сохраняем email и пароль в localStorage после успешной регистрации
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userCurrentPassword', password);
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      
      // Если email уже существует, предлагаем войти
      if (errorMessage.includes('already exists')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        {/* Main Content */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          {/* Logo */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <Link href="/" style={{
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <div style={{
                  position: 'relative',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '4px',
                    transform: 'rotate(-5deg)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}></div>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    zIndex: 1,
                    position: 'relative'
                  }}>K</span>
                </div>
                <span style={{
                  color: '#1e293b',
                  fontWeight: 'bold',
                  fontSize: '24px'
                }}>Kampaio</span>
              </div>
            </Link>
          </div>

          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px'
          }}>
            Check your email
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#64748b',
            lineHeight: '1.5',
            marginBottom: '24px'
          }}>
            We've sent a verification link to <strong style={{ color: '#667eea' }}>{email}</strong>. Please check your email and click the link to verify your account.
          </p>

          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#64748b',
            lineHeight: '1.5'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <div>
                Didn't receive the email? Check your spam folder or <button 
                  onClick={() => setIsSuccess(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: 'inherit'
                  }}
                >
                  try again
                </button>
              </div>
            </div>
          </div>

          <Link href="/login" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            padding: '14px 32px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
          >
            Back to Sign In
          </Link>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="register-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      width: '100%'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }}></div>

      {/* Main Content */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '380px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          <Link href="/" style={{
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <div style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '4px',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}></div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  zIndex: 1,
                  position: 'relative'
                }}>K</span>
              </div>
              <span style={{
                color: '#1e293b',
                fontWeight: 'bold',
                fontSize: '24px'
              }}>Kampaio</span>
            </div>
          </Link>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1e293b',
          textAlign: 'center',
          marginBottom: '10px',
          marginTop: 0
        }}>
          Create your account
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '12px',
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '14px',
          lineHeight: '1.5'
        }}>
          Get started with Kampaio and unlock powerful PPC optimization tools.
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="register-input"
              disabled={isLoading}
              autoComplete="username"
                              style={{
                  width: '100%',
                  padding: '9px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  opacity: isLoading ? 0.6 : 1
                }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="register-input"
                disabled={isLoading}
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  paddingRight: '48px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  opacity: isLoading ? 0.6 : 1
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#64748b',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Password Suggestion */}
            {!password && (
              <div style={{
                marginTop: '8px',
                padding: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Need a strong password?</span>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#667eea',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'underline'
                    }}
                  >
                    Generate one
                  </button>
                </div>
              </div>
            )}

            {/* Suggested Password Display */}
            {suggestedPassword && (
              <div style={{
                marginTop: '8px',
                padding: '12px',
                background: '#f0f9ff',
                border: '1px solid #0ea5e9',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#0369a1'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Suggested password: <strong>{suggestedPassword}</strong></span>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0ea5e9',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Generate new
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Confirm password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="register-input"
                disabled={isLoading}
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  paddingRight: '48px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  opacity: isLoading ? 0.6 : 1
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#64748b',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '11px 18px',
              background: isLoading 
                ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <div className="loading-spinner"></div>
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: '#e2e8f0'
          }}></div>
          <span style={{
            padding: '0 16px',
            fontSize: '14px',
            color: '#64748b'
          }}>
            or
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: '#e2e8f0'
          }}></div>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '11px 18px',
            background: 'white',
            color: '#374151',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>

        {/* Sign In Link */}
        <div style={{
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Already have an account?{' '}
          </span>
          <Link href="/login" style={{
            fontSize: '14px',
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#667eea'}
          >
            Sign in
          </Link>
        </div>

        {/* Terms */}
        <div style={{
          marginTop: '12px',
          padding: '8px',
          background: '#f8fafc',
          borderRadius: '8px',
          fontSize: '10px',
          color: '#64748b',
          lineHeight: '1.5'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <div>
                             By creating an account, you agree to our <Link href="/terms-of-service" style={{ color: '#667eea', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="/privacy-policy" style={{ color: '#667eea', textDecoration: 'none' }}>Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        © Kampaio Privacy & terms
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        /* Специфичные стили для полей ввода на странице register */
        .register-input:focus {
          outline: none !important;
          border-color: #764ba2 !important;
          box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1) !important;
        }
        
        .register-input:focus::placeholder {
          color: #64748b !important;
        }

        /* Анимация загрузки */
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 