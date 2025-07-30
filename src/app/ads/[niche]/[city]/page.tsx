import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import CTAButton from './CTAButton';

// Список дозволених ниш
const allowedNiches = [
  'dentist', 'lawyer', 'real-estate', 'saas', 'car-dealer', 'plumber', 
  'electrician', 'roofer', 'contractor', 'restaurant', 'gym', 'salon', 
  'chiropractor', 'attorney', 'law-firm', 'realtor', 'auto-dealer', 
  'plumbing', 'electrical', 'roofing', 'construction', 'fitness', 
  'fitness-center', 'hair-salon', 'spa', 'beauty-salon', 'chiropractic', 
  'dental', 'dental-clinic', 'dental-practice'
];

// Список дозволених міст
const allowedCities = [
  'chicago', 'miami', 'austin', 'new-york', 'los-angeles', 'houston', 
  'san-francisco', 'seattle', 'boston', 'atlanta', 'phoenix', 'san-diego', 
  'dallas', 'denver', 'philadelphia', 'washington', 'detroit', 'minneapolis', 
  'portland', 'las-vegas', 'orlando', 'tampa', 'nashville', 'cleveland', 
  'cincinnati', 'pittsburgh', 'kansas-city', 'st-louis', 'baltimore', 
  'milwaukee', 'indianapolis', 'columbus', 'charlotte', 'raleigh', 
  'jacksonville', 'fort-worth', 'arlington', 'sacramento', 'fresno', 
  'long-beach', 'oakland', 'bakersfield', 'anaheim', 'santa-ana', 
  'corpus-christi', 'riverside', 'stockton', 'lexington', 'henderson', 
  'greensboro', 'plano', 'newark', 'lincoln', 'orlando', 'irvine', 
  'durham', 'chula-vista', 'toledo', 'fort-wayne', 'laredo', 'chandler', 
  'lubbock', 'scottsdale', 'reno', 'glendale', 'arlington', 'garland', 
  'hialeah', 'fremont', 'boise', 'richmond', 'baton-rouge', 'spokane', 
  'des-moines', 'tacoma', 'oxnard', 'fontana', 'moreno-valley', 'frisco', 
  'rochester', 'yonkers', 'spokane', 'montgomery', 'aurora', 'akron', 
  'little-rock', 'huntington-beach', 'grand-rapids', 'salt-lake-city', 
  'tallahassee', 'huntsville', 'grand-prairie', 'overland-park', 'knoxville', 
  'worcester', 'brownsville', 'newport-news', 'santa-clarita', 'port-st-lucie'
];

// Словарь синонимов для ниш
const nicheSynonyms: Record<string, string> = {
  'attorney': 'lawyer',
  'law-firm': 'lawyer',
  'real-estate-agent': 'real-estate',
  'realtor': 'real-estate',
  'car-dealership': 'car-dealer',
  'auto-dealer': 'car-dealer',
  'plumbing': 'plumber',
  'electrical': 'electrician',
  'roofing': 'roofer',
  'general-contractor': 'contractor',
  'construction': 'contractor',
  'fitness': 'gym',
  'fitness-center': 'gym',
  'hair-salon': 'salon',
  'spa': 'salon',
  'beauty-salon': 'salon',
  'chiropractic': 'chiropractor',
  'dental': 'dentist',
  'dental-clinic': 'dentist',
  'dental-practice': 'dentist',
};

// Премиум заголовки для ключевых ниш
const premiumTitles: Record<string, string> = {
  dentist: 'AI-Powered Local Google Ads for Dentists',
  lawyer: 'AI-Powered Local Google Ads for Lawyers & Law Firms',
  'real-estate': 'AI-Powered Local Google Ads for Real Estate Agents',
  'car-dealer': 'AI-Powered Local Google Ads for Car Dealerships',
  'plumber': 'AI-Powered Local Google Ads for Plumbing Services',
  'electrician': 'AI-Powered Local Google Ads for Electrical Services',
  'roofer': 'AI-Powered Local Google Ads for Roofing Companies',
  'contractor': 'AI-Powered Local Google Ads for General Contractors',
  'restaurant': 'AI-Powered Local Google Ads for Restaurants',
  'gym': 'AI-Powered Local Google Ads for Gyms & Fitness Centers',
  'salon': 'AI-Powered Local Google Ads for Hair Salons & Spas',
  'chiropractor': 'AI-Powered Local Google Ads for Chiropractors',
};

// Функция для форматування назви міста
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

// Нормализация ниши (проверка синонимов)
function normalizeNiche(niche: string): string {
  const normalized = niche.toLowerCase().trim();
  
  // Сначала проверяем синонимы
  if (nicheSynonyms[normalized]) {
    return nicheSynonyms[normalized];
  }
  
  // Если нет синонима, возвращаем как есть
  return normalized;
}

// Генерация SEO metadata
export async function generateMetadata({ params }: { params: { niche: string; city: string } }): Promise<Metadata> {
  const niche = normalizeNiche(params.niche);
  const cityName = formatCity(params.city);
  const formattedNiche = formatNiche(niche);
  
  return {
    title: `Google Ads для ${formattedNiche} у ${cityName} | Локальні PPC стратегії`,
    description: `Дізнайтесь, як ефективно запускати Google Ads кампанії для ${formattedNiche} у ${cityName}. Поради, шаблони та рекомендації для максимального ROI.`,
  };
}

// Генерация статических параметров для популярных комбинаций
export async function generateStaticParams() {
  const popularCombinations = [
    { niche: 'dentist', city: 'chicago' },
    { niche: 'dentist', city: 'miami' },
    { niche: 'dentist', city: 'austin' },
    { niche: 'lawyer', city: 'new-york' },
    { niche: 'lawyer', city: 'chicago' },
    { niche: 'real-estate', city: 'miami' },
    { niche: 'real-estate', city: 'los-angeles' },
    { niche: 'saas', city: 'san-francisco' },
    { niche: 'saas', city: 'seattle' },
    { niche: 'car-dealer', city: 'houston' },
    { niche: 'plumber', city: 'phoenix' },
    { niche: 'electrician', city: 'dallas' },
    { niche: 'restaurant', city: 'new-york' },
    { niche: 'gym', city: 'los-angeles' },
    { niche: 'salon', city: 'miami' },
  ];
  return popularCombinations;
}

// Разрешаем генерацию динамических параметров
export const dynamicParams = true;

// Основний компонент сторінки
export default function NicheCityPage({ params }: { params: { niche: string; city: string } }) {
  const niche = normalizeNiche(params.niche);
  const city = params.city?.toLowerCase();
  
  // Валидация параметров
  if (!niche || !city || !allowedNiches.includes(niche) || !allowedCities.includes(city)) {
    notFound();
  }
  
  const cityName = formatCity(city);
  const formattedNiche = formatNiche(niche);

  // Генерация советов в зависимости от ниши
  const getTips = (niche: string, cityName: string) => {
    const baseTips = [
      `Використовуйте локальні ключові слова: додайте "${cityName}" до своїх пошукових запитів, щоб залучати клієнтів саме з вашого міста.`,
      'Налаштуйте розширення місцезнаходження та Google Maps для підвищення довіри та зручності пошуку.',
      'Відстежуйте дзвінки та онлайн-записи через конверсії, щоб оптимізувати бюджет на найефективніші джерела лідів.',
    ];

    // Специфичные советы для разных ниш
    const nicheSpecificTips: Record<string, string[]> = {
      dentist: [
        `Використовуйте ключові слова: "стоматолог ${cityName}", "зубний лікар ${cityName}", "стоматологія ${cityName}".`,
        'Налаштуйте розширення місцезнаходження та Google Maps для підвищення довіри пацієнтів.',
        'Відстежуйте записи на прийом через конверсії, щоб оптимізувати бюджет на найефективніші джерела лідів.',
      ],
      lawyer: [
        `Використовуйте ключові слова: "адвокат ${cityName}", "юрист ${cityName}", "правова допомога ${cityName}".`,
        'Налаштуйте розширення місцезнаходження та відгуки для підвищення довіри клієнтів.',
        'Відстежуйте консультації та записи на прийом через конверсії для оптимізації бюджету.',
      ],
      'real-estate': [
        `Використовуйте ключові слова: "нерухомість ${cityName}", "агент нерухомості ${cityName}", "купівля будинку ${cityName}".`,
        'Налаштуйте розширення місцезнаходження та фотографії об\'єктів для привабливості.',
        'Відстежуйте запити на перегляд та дзвінки через конверсії для оптимізації.',
      ],
      saas: [
        `Використовуйте ключові слова: "програмне забезпечення ${cityName}", "SaaS ${cityName}", "бізнес-рішення ${cityName}".`,
        'Налаштуйте демо-версії та безкоштовні пробні періоди для залучення клієнтів.',
        'Відстежуйте реєстрації та конверсії в платних користувачів для оптимізації.',
      ],
    };

    return nicheSpecificTips[niche] || baseTips;
  };

  const tips = getTips(niche, cityName);

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 0 0 0' }}>
        <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#1e293b', textAlign: 'center', marginBottom: 12, letterSpacing: '-1px', lineHeight: 1.1 }}>
            Google Ads для {formattedNiche} у {cityName}
          </h1>
          <p style={{ fontSize: '1.18rem', color: '#374151', textAlign: 'center', marginBottom: 32, lineHeight: 1.6, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Запускати Google Ads для {formattedNiche.toLowerCase()} у {cityName} — це можливість залучити більше локальних клієнтів, підвищити впізнаваність бренду та отримати стабільний потік нових запитів. Враховуйте локальні особливості ринку та конкуренцію, щоб отримати максимальний результат від PPC.
          </p>
        </section>

        {/* Практичні поради */}
        <section style={{ maxWidth: 700, margin: '0 auto', marginBottom: 48, padding: '0 24px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#667eea', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.5px' }}>
            3 практичні поради для {formattedNiche.toLowerCase()} у {cityName}
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 24, margin: 0, padding: 0, listStyle: 'none' }}>
            {tips.map((tip, i) => (
              <li key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(80,100,180,0.07)', padding: '22px 28px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <span style={{ minWidth: 38, height: 38, borderRadius: '50%', background: '#f8fafc', color: '#667eea', fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>{i + 1}</span>
                <span style={{ fontSize: '1.08rem', color: '#1e293b', lineHeight: 1.6 }}>{tip}</span>
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