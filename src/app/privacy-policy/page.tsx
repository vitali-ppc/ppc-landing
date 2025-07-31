import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Privacy Policy — AI Service Data Protection | Kampaio',
  description: 'Learn how Kampaio AI service collects, processes, and protects your data. Our privacy policy ensures transparency and compliance with data protection regulations for AI-powered Google Ads analytics.',
  keywords: 'privacy policy, AI data protection, GDPR, personal data, Kampaio privacy, Google Ads AI, data security',
  authors: [{ name: 'Kampaio' }],
  openGraph: {
    url: 'https://kampaio.com/privacy-policy',
    title: 'Privacy Policy — AI Service Data Protection | Kampaio',
    description: 'Learn how Kampaio AI service collects, processes, and protects your data. Our privacy policy ensures transparency and compliance with data protection regulations for AI-powered Google Ads analytics.',
    images: ['https://kampaio.com/logo.png'],
    siteName: 'Kampaio',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://kampaio.com/privacy-policy',
    title: 'Privacy Policy — AI Service Data Protection | Kampaio',
    description: 'Learn how Kampaio AI service collects, processes, and protects your data. Our privacy policy ensures transparency and compliance with data protection regulations for AI-powered Google Ads analytics.',
    images: ['https://kampaio.com/logo.png']
  },
  alternates: {
    canonical: 'https://kampaio.com/privacy-policy'
  }
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="privacy-policy-page">
        <div className="container">
          <div className="content-wrapper">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              Kampaio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, process, and safeguard your information when you use our AI-powered Google Ads analytics service. Our intelligent AI assistant analyzes your Google Ads data, generates reports, and provides strategic recommendations while maintaining the highest standards of data protection.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Company information and business details</li>
              <li>Google Ads account information (with your explicit consent)</li>
              <li>Communication preferences and service requirements</li>
              <li>Information provided through contact forms and support requests</li>
            </ul>

            <h3>2.2 Account Authentication Information</h3>
            <p>When you create an account or use our authentication services, we collect:</p>
            <ul>
              <li>Email address for account creation and verification</li>
              <li>Hashed passwords (we never store plain text passwords)</li>
              <li>Account verification tokens and reset links</li>
              <li>Login/logout timestamps and session data</li>
              <li>IP addresses associated with account access</li>
              <li>Device information for security purposes</li>
              <li>Password reset requests and verification data</li>
            </ul>

            <h3>2.3 Google Ads Data (AI Processing)</h3>
            <p>With your explicit authorization, our AI service may access and process:</p>
            <ul>
              <li>Campaign performance data and metrics</li>
              <li>Keyword performance and search terms</li>
              <li>Ad copy and creative assets</li>
              <li>Audience and targeting information</li>
              <li>Bidding strategies and budget data</li>
              <li>Conversion tracking data</li>
            </ul>

            <h3>2.4 Automatically Collected Information</h3>
            <p>When you use our service, we automatically collect certain information, including:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Service usage patterns and analytics</li>
              <li>AI interaction logs (for service improvement)</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Providing AI-powered Google Ads analytics and insights</li>
              <li>Generating personalized reports and recommendations</li>
              <li>Improving our AI algorithms and service performance</li>
              <li>Communicating with you about service updates and features</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Analyzing service usage to enhance user experience</li>
              <li>Marketing and promotional activities (with your consent)</li>
              <li>Legal compliance and dispute resolution</li>
            </ul>
          </section>

          <section>
            <h2>4. AI Data Processing and Machine Learning</h2>
            <p>
              Our AI service processes your Google Ads data to provide intelligent insights and recommendations. 
              This processing includes:
            </p>
            <ul>
              <li>Pattern recognition in campaign performance</li>
              <li>Predictive analytics for optimization opportunities</li>
              <li>Automated report generation and insights</li>
              <li>Machine learning model training (using anonymized data)</li>
              <li>Natural language processing for user interactions</li>
            </ul>
            <p>
              All AI processing is conducted with appropriate security measures and data anonymization 
              where possible to protect your privacy.
            </p>
          </section>

          <section>
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience with our AI service. 
              These technologies help us understand how you interact with our platform and improve our AI algorithms.
            </p>
            <p>You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2>6. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist us in operating our AI service</li>
              <li>To Google Ads API (only with your authorization)</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
            <p>
              <strong>Important:</strong> We never share your Google Ads data with third parties for marketing 
              or advertising purposes without your explicit consent.
            </p>
          </section>

          <section>
            <h2>7. Account Security and Authentication</h2>
            <p>
              We implement robust security measures to protect your account and authentication data:
            </p>
            <ul>
              <li><strong>Password Security:</strong> All passwords are hashed using industry-standard algorithms (bcrypt) and never stored in plain text</li>
              <li><strong>Email Verification:</strong> New accounts require email verification to prevent unauthorized access</li>
              <li><strong>Password Reset:</strong> Secure token-based password reset process with time-limited verification links</li>
              <li><strong>Session Management:</strong> Secure session handling with automatic timeout and logout capabilities</li>
              <li><strong>Access Logging:</strong> Comprehensive logging of login attempts and account access for security monitoring</li>
              <li><strong>Rate Limiting:</strong> Protection against brute force attacks and automated account creation</li>
            </ul>
            <p>
              We use secure email delivery services (Resend) for account verification and password reset emails, 
              ensuring reliable and secure communication for account management.
            </p>
          </section>

          <section>
            <h2>8. Data Security and AI Safety</h2>
            <p>
              We implement comprehensive security measures to protect your data, including:
            </p>
            <ul>
              <li>End-to-end encryption for data transmission</li>
              <li>Secure API authentication and authorization</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>AI model security and bias prevention measures</li>
              <li>Access controls and user authentication</li>
              <li>Data backup and disaster recovery procedures</li>
            </ul>
            <p>
              However, no method of transmission over the internet is 100% secure. We continuously 
              work to improve our security measures.
            </p>
          </section>

          <section>
            <h2>9. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li>Access to your personal information and AI processing logs</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information and associated data</li>
              <li>Restriction of AI processing activities</li>
              <li>Data portability (export your data)</li>
              <li>Objection to AI processing</li>
              <li>Right to explanation of AI decisions (where applicable)</li>
            </ul>
          </section>

          <section>
            <h2>10. Data Retention</h2>
            <p>
              We retain your personal information and Google Ads data only for as long as necessary 
              to provide our AI service and comply with legal obligations. AI processing logs are 
              retained for service improvement purposes and are anonymized where possible.
            </p>
            <p>
              <strong>Authentication Data Retention:</strong> Account authentication data is retained 
              for the duration of your account's existence. Password reset tokens expire automatically 
              after a limited time period. Login logs are retained for security monitoring purposes 
              and may be kept for up to 12 months for fraud prevention and account security.
            </p>
          </section>

          <section>
            <h2>11. Children's Privacy</h2>
            <p>
              Our AI service is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2>12. International Data Transfers</h2>
            <p>
              Your data may be processed in countries other than your own. We ensure that such transfers 
              comply with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>
          </section>

          <section>
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time, especially as our AI capabilities evolve. 
              We will notify you of any significant changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, our AI data practices, or would like to 
              exercise your rights, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Privacy Inquiries:</strong> <a href="mailto:privacy@kampaio.com">privacy@kampaio.com</a></p>
              <p><strong>Account & Authentication Support:</strong> <a href="mailto:support@kampaio.com">support@kampaio.com</a></p>
              <p><strong>AI Service Support:</strong> <a href="mailto:ai-support@kampaio.com">ai-support@kampaio.com</a></p>
              <p><strong>Website:</strong> <a href="https://kampaio.com">https://kampaio.com</a></p>
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