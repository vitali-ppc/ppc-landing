import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import CTAButton from "./CTAButton";
import HeroCTAButton from './HeroCTAButton';

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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 0 60px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            marginBottom: 24,
            lineHeight: 1.1,
            letterSpacing: '-1px'
          }}>
            Google Ads for Dentists in {cityName}
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
            AI market analysis for {cityName} + ready-made campaign templates for local dental clinics
          </p>
          <HeroCTAButton />
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