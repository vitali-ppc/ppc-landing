import React from 'react'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Terms of Service — Terms & Conditions | PPCSet',
  description: 'Read PPCSet terms of service and conditions for using our website and services. Understand your rights and obligations when using PPCSet services.',
  keywords: 'terms of service, terms and conditions, legal terms, PPCSet terms, service agreement',
  authors: [{ name: 'PPCSet' }],
  openGraph: {
    url: 'https://ppcset.com/terms-of-service',
    title: 'Terms of Service — Terms & Conditions | PPCSet',
    description: 'Read PPCSet terms of service and conditions for using our website and services. Understand your rights and obligations when using PPCSet services.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://ppcset.com/terms-of-service',
    title: 'Terms of Service — Terms & Conditions | PPCSet',
    description: 'Read PPCSet terms of service and conditions for using our website and services. Understand your rights and obligations when using PPCSet services.',
    images: ['https://ppcset.com/logo.png']
  },
  alternates: {
    canonical: 'https://ppcset.com/terms-of-service'
  }
}

export default function TermsOfService() {
  return (
    <>
      <div className="terms-of-service-page">
        <div className="container">
          <div className="content-wrapper">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the PPCSet website and services, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              PPCSet provides digital marketing services including but not limited to:
            </p>
            <ul>
              <li>Pay-per-click (PPC) advertising management</li>
              <li>Google Ads, Meta Ads, and LinkedIn Ads services</li>
              <li>Web development and application development</li>
              <li>Analytics and reporting services</li>
              <li>Digital marketing consulting</li>
            </ul>
          </section>

          <section>
            <h2>3. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account information</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2>4. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, 
              is the property of PPCSet and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works of any content without our express written consent.
            </p>
          </section>

          <section>
            <h2>5. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, 
              to understand our practices regarding the collection and use of your information.
            </p>
          </section>

          <section>
            <h2>6. Service Availability</h2>
            <p>
              We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. 
              We may temporarily suspend or restrict access to our services for maintenance, updates, or other reasons.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, PPCSet shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of profits, data, or use, 
              arising out of or relating to your use of our services.
            </p>
          </section>

          <section>
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" and "as available" without any warranties of any kind, 
              either express or implied, including but not limited to warranties of merchantability, 
              fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless PPCSet from any claims, damages, losses, or expenses 
              arising out of or relating to your use of our services or violation of these terms.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your access to our services at any time, with or without cause, 
              with or without notice. Upon termination, your right to use our services will cease immediately.
            </p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which PPCSet operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes 
              by posting the new terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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