import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
  if (!city || !allowedCities.includes(city)) {
    notFound();
  }
  const cityName = formatCity(city);

  // 3 практичні поради для стоматологів у цьому місті
  const tips = [
    `Використовуйте локальні ключові слова: додайте "${cityName}" до своїх пошукових запитів, щоб залучати пацієнтів саме з вашого міста.`,
    'Налаштуйте розширення місцезнаходження та Google Maps для підвищення довіри та зручності пошуку клініки.',
    'Відстежуйте дзвінки та онлайн-записи через конверсії, щоб оптимізувати бюджет на найефективніші джерела лідів.',
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>
        Google Ads for Dentists in Miami
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#374151', marginBottom: 32 }}>
        If you’re a dental clinic in Miami, our AI-powered tool can help optimize your Google Ads for more local patient leads.
      </p>
      <p style={{ fontSize: '1.1rem', color: '#374151', marginBottom: 32 }}>
        If you’re a dental clinic in Miami, our AI-powered tool can help optimize your Google Ads for more local patient leads.
      </p>
      {/* H1 та вступ */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Google Ads для стоматологів у {cityName}
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Запускати Google Ads для стоматологічної клініки у {cityName} — це можливість залучити більше локальних пацієнтів, підвищити впізнаваність бренду та отримати стабільний потік нових записів. Враховуйте локальні особливості ринку та конкуренцію, щоб отримати максимальний результат від PPC.
        </p>
      </div>

      {/* Практичні поради */}
      <section className="max-w-2xl mx-auto mb-10">
        <h2 className="text-xl font-bold text-blue-700 mb-6 text-center">3 практичні поради для стоматологів у {cityName}</h2>
        <ul className="space-y-6">
          {tips.map((tip, i) => (
            <li key={i} className="bg-white rounded-lg shadow p-5 text-gray-800 flex items-start gap-3">
              <span className="inline-block w-8 h-8 flex-shrink-0 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">{i + 1}</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="max-w-xl mx-auto text-center mt-12">
        <a
          href="/chat"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-cyan-500 transition-colors"
        >
          Отримати AI-аудит Google Ads для {cityName}
        </a>
      </div>
    </main>
  );
} 