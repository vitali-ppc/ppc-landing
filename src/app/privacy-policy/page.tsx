import React from 'react'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Privacy Policy — Data Protection & Privacy | PPCSet',
  description: 'Learn how PPCSet collects, uses, and protects your personal information. Our privacy policy ensures transparency and compliance with data protection regulations.',
  keywords: 'privacy policy, data protection, GDPR, personal data, PPCSet privacy',
  authors: [{ name: 'PPCSet' }],
  openGraph: {
    url: 'https://ppcset.com/privacy-policy',
    title: 'Privacy Policy — Data Protection & Privacy | PPCSet',
    description: 'Learn how PPCSet collects, uses, and protects your personal information. Our privacy policy ensures transparency and compliance with data protection regulations.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://ppcset.com/privacy-policy',
    title: 'Privacy Policy — Data Protection & Privacy | PPCSet',
    description: 'Learn how PPCSet collects, uses, and protects your personal information. Our privacy policy ensures transparency and compliance with data protection regulations.',
    images: ['https://ppcset.com/logo.png']
  },
  alternates: {
    canonical: 'https://ppcset.com/privacy-policy'
  }
}

export default function PrivacyPolicy() {
  return (
    <>
      <div className="privacy-policy-page">
        <div className="container">
          <div className="content-wrapper">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              PPCSet ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Company information</li>
              <li>Communication preferences</li>
              <li>Information provided through contact forms</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information, including:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Providing and improving our services</li>
              <li>Communicating with you about our services</li>
              <li>Responding to your inquiries and requests</li>
              <li>Analyzing website usage and performance</li>
              <li>Marketing and promotional activities (with your consent)</li>
              <li>Legal compliance and dispute resolution</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              These technologies help us understand how you interact with our site and improve our services.
            </p>
            <p>You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2>5. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist us in operating our website</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:info@ppcset.com">info@ppcset.com</a></p>
              <p><strong>Website:</strong> <a href="https://ppcset.com">https://ppcset.com</a></p>
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