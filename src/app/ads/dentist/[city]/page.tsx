import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import CTAButton from "./CTAButton";
import HeroCTAButton from './HeroCTAButton';
import HeroCTAButton2 from './HeroCTAButton2';
import HeroCTAButton3 from './HeroCTAButton3';

// Список дозволених міст
const allowedCities = [
  'chicago', 'miami', 'austin', 'new-york', 'los-angeles', 'houston', 'san-francisco', 'seattle', 'boston', 'atlanta'
];

// Функція для форматування назви міста (перша літера велика, дефіси на пробіли)
function formatCity(city: string) {
  return city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Автоматическое форматирование ниши
function formatNiche(niche: string) {
  return niche
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Динамічний SEO metadata
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityName = formatCity(params.city);
  return {
    title: `Google Ads для стоматологів у ${cityName} | Локальні PPC стратегії`,
    description: `Дізнайтесь, як ефективно запускати Google Ads кампанії для стоматологів у ${cityName}. Поради, шаблони та рекомендації для максимального ROI.`,
  };
}

// Основний компонент сторінки
export default function DentistCityPage({ params }: { params: { city: string } }) {
  const city = params.city?.toLowerCase();
  const niche = 'dentist'; // Фиксированная ниша для этой страницы
  if (!city || !allowedCities.includes(city)) {
    notFound();
  }
  const cityName = formatCity(city);
  const formattedNiche = formatNiche(niche);

  // 3 практичні поради для стоматологів у цьому місті
  const tips = [
    `Використовуйте локальні ключові слова: додайте "${cityName}" до своїх пошукових запитів, щоб залучати пацієнтів саме з вашого міста.`,
    'Налаштуйте розширення місцезнаходження та Google Maps для підвищення довіри та зручності пошуку клініки.',
    'Відстежуйте дзвінки та онлайн-записи через конверсії, щоб оптимізувати бюджет на найефективніші джерела лідів.',
  ];

  return (
    <>
      <Header />
      
      {/* Hero Block */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '80px 0 60px',
        textAlign: 'center',
        color: '#23272f'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            marginBottom: 24,
            lineHeight: 1.1,
            letterSpacing: '-1px'
          }}>
            Google Ads for Dentists in {cityName} Powered by AI
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: 32,
            lineHeight: 1.6,
            opacity: 0.95,
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Get better ROI, lower costs, and personalized strategies for your dental clinic in {cityName}.
          </p>
          <HeroCTAButton2 customText="Get Free Strategy" />
        </div>
      </section>

      {/* Features Block */}
      <section style={{
        background: '#ffffff',
        padding: '80px 0',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}
          className="features-grid">
            {/* Content */}
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: 24,
                lineHeight: 1.2,
                letterSpacing: '-0.025em'
              }}>
                Optimize Your Google Ads Campaigns
              </h2>
              <div style={{ marginBottom: 24 }}></div>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: 32
              }}>
                Unlock the full potential of your dental practice with AI-powered Google Ads optimization. Say goodbye to manual campaign management and hello to automated processes that keep your marketing focused on what matters most: attracting more patients to your {cityName} clinic. Optimize your ad spend + targeting and accelerate your patient acquisition + revenue growth.
              </p>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: 32
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  fontSize: '1rem',
                  color: '#334155'
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#667eea',
                    flexShrink: 0
                  }}></div>
                  <span>Automate keyword research and eliminate wasted ad spend</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  fontSize: '1rem',
                  color: '#334155'
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#667eea',
                    flexShrink: 0
                  }}></div>
                  <span>Ensure targeting accuracy and consistency across campaigns</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  fontSize: '1rem',
                  color: '#334155'
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#667eea',
                    flexShrink: 0
                  }}></div>
                  <span>Enhance ROI visibility and enable data-driven optimization</span>
                </li>
              </ul>
              
              <div style={{ marginBottom: 24 }}></div>
              <div style={{ marginBottom: 16 }}></div>
              <a href="/chat" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              className="features-cta-btn">
                Get Free AI Audit
              </a>
            </div>
            
            {/* Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '100%',
                maxWidth: 500,
                height: 400,
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden',
                transform: 'rotate(-3deg)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  right: 20,
                  bottom: 20,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 12,
                  opacity: 0.1
                }}></div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  zIndex: 1
                }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                  }}>
                                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6"/>
                        <path d="M21 12h-6m-6 0H3"/>
                        <path d="M19.78 4.22l-4.24 4.24m-6.36 6.36l-4.24 4.24"/>
                        <path d="M4.22 4.22l4.24 4.24m6.36 6.36l4.24 4.24"/>
                      </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                                            <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          margin: 0,
                          marginBottom: 8
                        }}>
                          Precision Optimization
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          color: '#64748b',
                          margin: 0,
                          maxWidth: 300
                        }}>
                          Data-driven campaign refinement for {cityName} dental clinics
                        </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Features Block - Reversed Layout */}
      <section style={{
        background: '#f8fafc',
        padding: '80px 0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}
          className="features-grid">
            {/* Image - Left Side */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '100%',
                maxWidth: 500,
                height: 400,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
                transform: 'rotate(3deg)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.5
                }}></div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  zIndex: 1
                }}>
                  <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                      <path d="M12 2v4"/>
                      <path d="M12 18v4"/>
                      <path d="M2 12h4"/>
                      <path d="M18 12h4"/>
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                                            <h3 style={{
                          fontSize: '1.75rem',
                          fontWeight: 600,
                          color: 'white',
                          margin: 0,
                          marginBottom: 8
                        }}>
                          Smart Targeting
                        </h3>
                        <p style={{
                          fontSize: '1.1rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                          margin: 0,
                          maxWidth: 300
                        }}>
                          Precision patient acquisition for {cityName} dental clinics
                        </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content - Right Side */}
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: 24,
                lineHeight: 1.2,
                letterSpacing: '-0.025em'
              }}>
                Targeted Patient Acquisition
              </h2>
              <div style={{ marginBottom: 24 }}></div>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: 32
              }}>
                Target patients with precision. Our AI analyzes search patterns, competitor activity, and patient behavior to create campaigns that bring qualified patients to your {cityName} dental clinic.
              </p>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: 32
              }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  fontSize: '1rem',
                  color: '#334155'
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#667eea',
                    flexShrink: 0
                  }}></div>
                  <span>AI-powered account analysis and data insights</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  fontSize: '1rem',
                  color: '#334155'
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#667eea',
                    flexShrink: 0
                  }}></div>
                  <span>Intelligent strategy recommendations and hypotheses</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  fontSize: '1rem',
                  color: '#334155'
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#667eea',
                    flexShrink: 0
                  }}></div>
                  <span>Automated reporting and campaign optimization</span>
                </li>
              </ul>
              
              <div style={{ marginBottom: 24 }}></div>
              <div style={{ marginBottom: 16 }}></div>
              <a href="/chat" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              className="features-cta-btn">
                Get Free Strategy
              </a>
            </div>
          </div>
        </div>
      </section>

      <main style={{ minHeight: '100vh', background: '#f7fafc', padding: '48px 0 0 0' }}>
        <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#23272f', textAlign: 'center', marginBottom: 12, letterSpacing: '-1px', lineHeight: 1.1 }}>
            Google Ads для стоматологів у {cityName}
          </h1>
          <p style={{ fontSize: '1.18rem', color: '#374151', textAlign: 'center', marginBottom: 32, lineHeight: 1.6, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Запускати Google Ads для стоматологічної клініки у {cityName} — це можливість залучити більше локальних пацієнтів, підвищити впізнаваність бренду та отримати стабільний потік нових записів. Враховуйте локальні особливості ринку та конкуренцію, щоб отримати максимальний результат від PPC.
          </p>
        </section>

        {/* Практичні поради */}
        <section style={{ maxWidth: 700, margin: '0 auto', marginBottom: 48, padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#4f46e5', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.5px' }}>
            3 практичні поради для стоматологів у {cityName}
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 24, margin: 0, padding: 0, listStyle: 'none' }}>
            {tips.map((tip, i) => (
              <li key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(80,100,180,0.07)', padding: '22px 28px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <span style={{ minWidth: 38, height: 38, borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>{i + 1}</span>
                <span style={{ fontSize: '1.08rem', color: '#23272f', lineHeight: 1.6 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', marginBottom: 60, padding: '0 24px' }}>
          <CTAButton cityName={cityName} />
        </section>
      </main>
      <Footer compact={true} />
    </>
  );
} 