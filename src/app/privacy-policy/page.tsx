import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How the Kampaio Dashboard collects, uses and protects your data, including Google user data received through Google sign-in and the Google Ads API.',
  keywords: 'privacy policy, Kampaio, Google Ads dashboard, Google API Services User Data Policy, Limited Use, GDPR',
  authors: [{ name: 'Kampaio' }],
  openGraph: {
    url: 'https://kampaio.com/privacy-policy',
    title: 'Privacy Policy | Kampaio',
    description: 'How the Kampaio Dashboard collects, uses and protects your data, including Google user data received through Google sign-in and the Google Ads API.',
    images: ['https://kampaio.com/logo.png'],
    siteName: 'Kampaio',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://kampaio.com/privacy-policy',
    title: 'Privacy Policy | Kampaio',
    description: 'How the Kampaio Dashboard collects, uses and protects your data, including Google user data received through Google sign-in and the Google Ads API.',
    images: ['https://kampaio.com/logo.png']
  },
  alternates: {
    canonical: 'https://www.kampaio.com/privacy-policy'
  }
}

// WebPage schema: links legal page to Kampaio Organization + WebSite
// entities via @id, completing the Knowledge Graph integration.
const privacyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.kampaio.com/privacy-policy#webpage',
  name: 'Privacy Policy',
  url: 'https://www.kampaio.com/privacy-policy',
  description:
    'How the Kampaio Dashboard collects, uses and protects your data, including Google user data received through Google sign-in and the Google Ads API.',
  isPartOf: { '@id': 'https://www.kampaio.com/#website' },
  about: { '@id': 'https://www.kampaio.com/#organization' },
  publisher: { '@id': 'https://www.kampaio.com/#organization' },
  inLanguage: 'en',
};

export default function PrivacyPolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <Header />
      <div className="privacy-policy-page">
        <div className="container">
          <div className="content-wrapper">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: November 17, 2026</p>

          <section>
            <p>
              Kampaio (&quot;we&quot;, &quot;us&quot;) provides the Kampaio Dashboard at{' '}
              <a href="https://dashboard.kampaio.com/">https://dashboard.kampaio.com</a>, a tool that shows your
              Google Ads accounts on one screen, runs automatic checks on your campaigns, and lets you make changes
              you confirm yourself. This policy explains what data we collect, why, and what you can do about it.
              It covers the dashboard and our website <a href="https://www.kampaio.com">https://www.kampaio.com</a>.
            </p>
          </section>

          <section>
            <h2>1. What we collect</h2>
            <h3>When you sign in with Google</h3>
            <ul>
              <li>Your Google account email address and name (Google <code>email</code> and <code>profile</code> permissions).</li>
              <li>An OAuth access and refresh token for the Google Ads API (Google <code>adwords</code> permission), so the dashboard can read your Google Ads data and apply the changes you confirm.</li>
            </ul>
            <h3>When you use the dashboard</h3>
            <ul>
              <li>The IDs of the Google Ads accounts you choose to connect, and your plan.</li>
              <li>Google Ads reporting data for those accounts: campaigns, budgets, bidding targets, metrics such as spend, clicks, conversions and conversion value, search terms, products and geo settings. We keep a temporary cache of this data so pages load quickly and we stay within Google&apos;s API limits.</li>
              <li>A log of every change you apply through the dashboard: what was changed, the value before and after, and when.</li>
              <li>Settings you enter, such as profit margins or targets for an account, and display preferences.</li>
              <li>A session cookie that keeps you signed in for up to 30 days.</li>
            </ul>
            <h3>On our website</h3>
            <ul>
              <li>The website uses Google Analytics to measure visits (pages viewed, approximate location, device). It does not receive your Google Ads data.</li>
            </ul>
          </section>

          <section>
            <h2>2. How we use it</h2>
            <p>We use your data only to provide the dashboard features you use:</p>
            <ul>
              <li>to show your accounts, campaigns and metrics;</li>
              <li>to run the automatic checks and show what needs attention;</li>
              <li>to apply a change only when you confirm it, after showing you a preview, and to let you roll it back;</li>
              <li>to keep the change log you see in the dashboard;</li>
              <li>to keep you signed in and enforce your plan&apos;s limits.</li>
            </ul>
            <p>The dashboard never changes your Google Ads accounts on its own or on a schedule.</p>
          </section>

          <section>
            <h2>3. Google user data and the Limited Use requirements</h2>
            <p>
              Kampaio&apos;s use and transfer to any other app of information received from Google APIs will adhere
              to the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>,
              including the Limited Use requirements. In particular:
            </p>
            <ul>
              <li>we use Google user data only to provide and improve the user-facing features of the dashboard described above;</li>
              <li>we do not sell it, and we do not use it for advertising, for credit decisions, or to train AI or machine-learning models;</li>
              <li>we do not transfer it to third parties, except as needed to provide the service (our hosting provider), to comply with the law, or with your explicit consent;</li>
              <li>no person at Kampaio reads your Google Ads data unless you ask us to for support, or it is needed for security or to comply with the law.</li>
            </ul>
          </section>

          <section>
            <h2>4. Where it is stored and who processes it</h2>
            <ul>
              <li>The dashboard and its data are hosted on a server in the European Union (Contabo GmbH, data centre in France).</li>
              <li>Google LLC provides sign-in and the Google Ads API.</li>
              <li>The website is hosted by Vercel Inc.; Google Analytics is provided by Google LLC.</li>
              <li>Our email is provided by Zoho Corporation (EU data centre).</li>
            </ul>
            <p>We do not use any other processors for dashboard data.</p>
          </section>

          <section>
            <h2>5. How long we keep it</h2>
            <ul>
              <li>Account data (email, name, token, connected account IDs, settings): kept while your account exists.</li>
              <li>Cached Google Ads reports: refreshed and overwritten as you use the dashboard; deleted with your account.</li>
              <li>Change log: kept while your account exists, so you can see and roll back past changes; deleted with your account.</li>
              <li>Session cookie: up to 30 days, or until you sign out.</li>
            </ul>
          </section>

          <section>
            <h2>6. Your choices and rights</h2>
            <ul>
              <li><strong>Disconnect Google.</strong> You can revoke Kampaio&apos;s access at any time at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">https://myaccount.google.com/permissions</a>. The dashboard then can no longer read or change your Google Ads accounts.</li>
              <li><strong>Delete your data.</strong> Email <a href="mailto:vitalii@kampaio.com">vitalii@kampaio.com</a> from the address you sign in with, and we will delete your account, token, cached data, change log and settings within 30 days.</li>
              <li><strong>Access or correct your data.</strong> Email us and we will send you what we hold or correct it.</li>
              <li>If you are in the EU/EEA or UK, you also have the rights given by the GDPR, including the right to complain to your data protection authority.</li>
            </ul>
          </section>

          <section>
            <h2>7. Security</h2>
            <p>
              Access to the server is restricted to key-based login, traffic to the dashboard is encrypted with HTTPS,
              and tokens are never shown in the interface or sent to other services.
            </p>
          </section>

          <section>
            <h2>8. Children</h2>
            <p>The dashboard is for businesses and is not intended for anyone under 16.</p>
          </section>

          <section>
            <h2>9. Changes</h2>
            <p>If we change this policy, we will update the date above and, for significant changes, tell signed-in users in the dashboard.</p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:vitalii@kampaio.com">vitalii@kampaio.com</a></p>
              <p><strong>Website:</strong> <a href="https://www.kampaio.com">https://www.kampaio.com</a></p>
            </div>
          </section>
        </div>
      </div>
      </div>
      
      <Footer compact={true} />
      
      <ScrollToTop />
    </>
  )
} 