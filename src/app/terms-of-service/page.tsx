import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Terms of Service — AI Service Agreement | Kampaio',
  description: 'Read Kampaio terms of service for our AI-powered Google Ads analytics service. Understand your rights and obligations when using our intelligent AI assistant.',
  keywords: 'terms of service, AI service agreement, Kampaio terms, Google Ads AI, service conditions',
  authors: [{ name: 'Kampaio' }],
  openGraph: {
    url: 'https://kampaio.com/terms-of-service',
    title: 'Terms of Service — AI Service Agreement | Kampaio',
    description: 'Read Kampaio terms of service for our AI-powered Google Ads analytics service. Understand your rights and obligations when using our intelligent AI assistant.',
    images: ['https://kampaio.com/logo.png'],
    siteName: 'Kampaio',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://kampaio.com/terms-of-service',
    title: 'Terms of Service — AI Service Agreement | Kampaio',
    description: 'Read Kampaio terms of service for our AI-powered Google Ads analytics service. Understand your rights and obligations when using our intelligent AI assistant.',
    images: ['https://kampaio.com/logo.png']
  },
  alternates: {
    canonical: 'https://kampaio.com/terms-of-service'
  }
}

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="terms-of-service-page">
        <div className="container">
          <div className="content-wrapper">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Kampaio AI-powered Google Ads analytics service, you accept and agree to be bound by the terms and provisions of this agreement. 
              If you do not agree to abide by these terms, please do not use our AI service.
            </p>
          </section>

          <section>
            <h2>2. Description of AI Service</h2>
            <p>
              Kampaio provides an intelligent AI-powered Google Ads analytics service that includes:
            </p>
            <ul>
              <li>AI-powered Google Ads account analysis and optimization</li>
              <li>Intelligent campaign performance insights and recommendations</li>
              <li>Automated report generation and data visualization</li>
              <li>Machine learning-based keyword and bid optimization</li>
              <li>Natural language processing for user interactions</li>
              <li>Predictive analytics for campaign performance</li>
              <li>Integration with Google Ads API for data processing</li>
            </ul>
          </section>

          <section>
            <h2>3. AI Service Architecture and Data Processing</h2>
            <p>
              Our AI service operates through a sophisticated architecture that includes:
            </p>
            <ul>
              <li>Next.js frontend for user interface and serverless API routes</li>
              <li>Python AI-server (FastAPI) for LLM processing and analytics</li>
              <li>Vector database integration for knowledge search and retrieval</li>
              <li>Google Ads API integration for data collection and modification</li>
              <li>Secure data transmission and processing protocols</li>
            </ul>
            <p>
              By using our service, you acknowledge that your Google Ads data will be processed by our AI systems 
              to provide intelligent insights and recommendations.
            </p>
          </section>

          <section>
            <h2>4. Account Registration and Authentication</h2>
            <p>To access our AI service, you must create an account by providing accurate and complete information. You agree to:</p>
            <ul>
              <li>Provide a valid email address for account verification and communication</li>
              <li>Create a strong password and keep it confidential</li>
              <li>Complete the email verification process to activate your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not share your account credentials with third parties</li>
              <li>Log out of your account when using shared devices</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
            <p>
              We provide password reset functionality through email verification. You are responsible for maintaining 
              the security of your email account and ensuring you can receive password reset emails.
            </p>
          </section>

          <section>
            <h2>5. User Responsibilities</h2>
            <p>As a user of our AI service, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information for AI processing</li>
              <li>Maintain the security of your account and API credentials</li>
              <li>Use our AI service only for lawful purposes</li>
              <li>Grant appropriate permissions for Google Ads API access</li>
              <li>Not interfere with or disrupt our AI systems</li>
              <li>Not attempt to gain unauthorized access to our AI infrastructure</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Review and approve AI-generated recommendations before implementation</li>
              <li>Not use automated systems to create multiple accounts</li>
              <li>Not attempt to circumvent any security measures</li>
            </ul>
          </section>

          <section>
            <h2>6. AI-Generated Content and Recommendations</h2>
            <p>
              Our AI service generates insights, reports, and recommendations based on your Google Ads data. 
              While we strive for accuracy, you acknowledge that:
            </p>
            <ul>
              <li>AI-generated content is for informational purposes only</li>
              <li>You are responsible for reviewing and validating all AI recommendations</li>
              <li>We are not liable for decisions made based on AI-generated insights</li>
              <li>AI models may be updated and improved over time</li>
              <li>Results may vary based on data quality and market conditions</li>
            </ul>
          </section>

          <section>
            <h2>7. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, software, 
              and AI algorithms, is the property of Kampaio and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works of any content or AI-generated 
              materials without our express written consent.
            </p>
          </section>

          <section>
            <h2>8. Privacy Policy and Data Protection</h2>
            <p>
              Your privacy and data protection are paramount. Please review our Privacy Policy, which governs 
              how we collect, process, and protect your information, including Google Ads data processed by our AI systems.
            </p>
          </section>

          <section>
            <h2>9. AI Service Availability</h2>
            <p>
              We strive to maintain high availability of our AI service, but we do not guarantee uninterrupted access. 
              Our AI systems may be temporarily unavailable for maintenance, updates, model training, or other technical reasons.
            </p>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Kampaio shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of profits, data, or use, 
              arising out of or relating to your use of our AI service or reliance on AI-generated recommendations.
            </p>
          </section>

          <section>
            <h2>11. Disclaimer of Warranties</h2>
            <p>
              Our AI service is provided "as is" and "as available" without any warranties of any kind, 
              either express or implied, including but not limited to warranties of merchantability, 
              fitness for a particular purpose, accuracy of AI predictions, or non-infringement.
            </p>
          </section>

          <section>
            <h2>12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Kampaio from any claims, damages, losses, or expenses 
              arising out of or relating to your use of our AI service, violation of these terms, 
              or decisions made based on AI-generated recommendations.
            </p>
          </section>

          <section>
            <h2>13. Termination</h2>
            <p>
              We may terminate or suspend your access to our AI service at any time, with or without cause, 
              with or without notice. Upon termination, your right to use our AI service will cease immediately, 
              and we will cease processing your Google Ads data.
            </p>
          </section>

          <section>
            <h2>14. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which Kampaio operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2>15. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time, especially as our AI capabilities evolve. 
              We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>16. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service or our AI service, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Legal Inquiries:</strong> <a href="mailto:legal@kampaio.com">legal@kampaio.com</a></p>
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