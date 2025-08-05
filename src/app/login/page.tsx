'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState('');

  // Чтение email из URL параметров при загрузке страницы
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, []);

  // Генерация надежного пароля
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSuggestedPassword(password);
    setPassword(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем, что email и пароль введены
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }
    
    try {
      const response = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          alert('No account found with this email address. Please check your email or create a new account.');
        } else if (response.status === 401) {
          alert('Incorrect password. Please try again.');
        } else {
          alert(data.error || 'Authentication failed. Please try again.');
        }
        return;
      }

      // Сохраняем email в localStorage для использования в чате
      localStorage.setItem('userEmail', email);
      
      // Если аутентификация успешна, перенаправляем на главную страницу
      window.location.href = '/';
      
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };





  return (
                     <div className="login-page" style={{
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
         padding: '32px',
         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
         width: '100%',
         maxWidth: '420px',
         position: 'relative',
         zIndex: 1
       }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
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
          fontSize: '24px',
          fontWeight: '700',
          color: '#1e293b',
          textAlign: 'center',
          marginBottom: '20px',
          marginTop: 0
        }}>
          Sign in to your account
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '16px' }}>
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
               className="login-input"
               autoComplete="username"
               style={{
                 width: '100%',
                 padding: '10px 14px',
                 border: '1px solid #e2e8f0',
                 borderRadius: '8px',
                 fontSize: '14px',
                 transition: 'all 0.2s ease',
                 boxSizing: 'border-box'
               }}
             />
          </div>

          {/* Password Field */}
                      <div style={{ marginBottom: '16px' }}>
                         <div style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               marginBottom: '8px'
             }}>
               <label style={{
                 fontSize: '14px',
                 fontWeight: '500',
                 color: '#374151'
               }}>
                 Password
               </label>
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '12px'
               }}>
                 <button
                   type="button"
                   onClick={generateStrongPassword}
                   style={{
                     background: 'none',
                     border: 'none',
                     color: '#667eea',
                     cursor: 'pointer',
                     fontSize: '12px',
                     fontWeight: '500',
                     padding: '4px 8px',
                     borderRadius: '4px',
                     transition: 'all 0.2s ease',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '4px'
                   }}
                   onMouseEnter={(e) => {
                     (e.target as HTMLElement).style.background = 'rgba(102, 126, 234, 0.1)';
                     (e.target as HTMLElement).style.color = '#764ba2';
                   }}
                   onMouseLeave={(e) => {
                     (e.target as HTMLElement).style.background = 'none';
                     (e.target as HTMLElement).style.color = '#667eea';
                   }}
                 >
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                   </svg>
                   Generate
                 </button>
                 <Link href="/reset" style={{
                   fontSize: '14px',
                   color: '#667eea',
                   textDecoration: 'none',
                   fontWeight: '500',
                   transition: 'color 0.2s ease'
                 }}
                 onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
                 onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#667eea'}
                 >
                   Forgot your password?
                 </Link>
               </div>
             </div>
            <div style={{ position: 'relative' }}>
                               <input
                   type={showPassword ? "text" : "password"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Enter your password"
                   required
                   className="login-input"
                   autoComplete="off"
                   style={{
                     width: '100%',
                     padding: '10px 14px',
                     paddingRight: '48px',
                     border: '1px solid #e2e8f0',
                     borderRadius: '8px',
                     fontSize: '14px',
                     transition: 'all 0.2s ease',
                     boxSizing: 'border-box'
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
             {suggestedPassword && (
               <div style={{
                 marginTop: '8px',
                 padding: '8px 12px',
                 background: '#f8fafc',
                 border: '1px solid #e2e8f0',
                 borderRadius: '6px',
                 fontSize: '12px',
                 color: '#64748b',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between'
               }}>
                 <span>Suggested password: <strong>{suggestedPassword}</strong></span>
                 <button
                   type="button"
                   onClick={generateStrongPassword}
                   style={{
                     background: 'none',
                     border: 'none',
                     color: '#667eea',
                     cursor: 'pointer',
                     fontSize: '12px',
                     fontWeight: '500',
                     padding: '2px 6px',
                     borderRadius: '4px',
                     transition: 'background 0.2s ease'
                   }}
                   onMouseEnter={(e) => (e.target as HTMLElement).style.background = 'rgba(102, 126, 234, 0.1)'}
                   onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'none'}
                 >
                   Generate new
                 </button>
               </div>
             )}
           </div>

          {/* Remember Me */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                marginRight: '8px',
                accentColor: '#667eea'
              }}
            />
            <label htmlFor="remember" style={{
              fontSize: '14px',
              color: '#374151',
              cursor: 'pointer'
            }}>
              Remember me on this device
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '16px'
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
            Sign in
          </button>
        </form>

        {/* Separator */}
                 <div style={{
           display: 'flex',
           alignItems: 'center',
           marginBottom: '16px'
         }}>
           <div style={{
             flex: 1,
             height: '1px',
             background: '#e2e8f0'
           }}></div>
                     <span style={{
             padding: '0 16px',
             fontSize: '14px',
             color: '#64748b',
             fontWeight: '500'
           }}>
             OR
           </span>
                     <div style={{
             flex: 1,
             height: '1px',
             background: '#e2e8f0'
           }}></div>
         </div>

        {/* Alternative Login Options */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => window.location.href = '/api/auth/login'}
                         style={{
               width: '100%',
               padding: '12px 16px',
               background: 'white',
               border: '1px solid #e2e8f0',
               borderRadius: '8px',
               fontSize: '14px',
               fontWeight: '500',
               color: '#374151',
               cursor: 'pointer',
               transition: 'all 0.2s ease',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '8px'
             }}
             onMouseEnter={(e) => {
               (e.target as HTMLElement).style.borderColor = '#667eea';
               (e.target as HTMLElement).style.background = '#f8fafc';
             }}
             onMouseLeave={(e) => {
               (e.target as HTMLElement).style.borderColor = '#e2e8f0';
               (e.target as HTMLElement).style.background = 'white';
             }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Create Account Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#64748b'
        }}>
          New to Kampaio?{' '}
          <Link href="/register" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#667eea'}
          >
            Create an account
          </Link>
        </div>

        {/* Security Message */}
                 <div style={{
           marginTop: '20px',
           padding: '12px',
           background: '#f8fafc',
           borderRadius: '8px',
           fontSize: '11px',
           color: '#64748b',
           lineHeight: '1.4'
         }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <circle cx="12" cy="16" r="1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <div>
              Don't click on links if an email looks suspicious. Fraudsters sometimes send emails with phishing links while pretending to be Kampaio. To avoid phishing attacks, set a bookmark for this page and only use that link when signing in.
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
         
         /* Специфичные стили для полей ввода на странице login */
         .login-input:focus {
           outline: none !important;
           border-color: #764ba2 !important;
           box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1) !important;
         }
         
         .login-input:focus::placeholder {
           color: #64748b !important;
         }
       `}</style>
     </div>
   );
} 