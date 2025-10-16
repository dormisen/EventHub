import  { useState } from 'react';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'data', title: 'Data We Collect' },
    { id: 'use', title: 'How We Use Data' },
    { id: 'sharing', title: 'Data Sharing' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'cookies', title: 'Cookies' },
    { id: 'changes', title: 'Policy Changes' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Last updated: July 7, 2025
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Table of Contents</h2>
              <ul className="space-y-3">
                {sections.map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`text-left w-full px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-indigo-600'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="bg-gray-800 rounded-xl p-8">
              {/* Introduction */}
              {activeSection === 'introduction' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">1. Introduction</h2>
                  <p className="text-gray-300 mb-4">
                    At EventHub, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                  </p>
                  <p className="text-gray-300 mb-4">
                    By accessing or using EventHub, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not access the site or use our services.
                  </p>
                  <p className="text-gray-300">
                    We reserve the right to make changes to this Privacy Policy at any time. Any changes will be effective immediately upon posting, and your continued use constitutes acceptance of those changes.
                  </p>
                </section>
              )}

              {/* Data We Collect */}
              {activeSection === 'data' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">2. Data We Collect</h2>
                  <p className="text-gray-300 mb-4">
                    We collect information you provide directly to us, such as when you create an account, organize an event, purchase tickets, or contact us:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>Account information (name, email, password)</li>
                    <li>Contact information (phone, address)</li>
                    <li>Payment information (processed by third-party payment processors)</li>
                    <li>Event details and preferences</li>
                    <li>Communications with us</li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    We automatically collect certain information when you use our services:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>Log data (IP address, browser type, pages visited)</li>
                    <li>Device information</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Usage data and analytics</li>
                  </ul>
                </section>
              )}

              {/* How We Use Data */}
              {activeSection === 'use' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">3. How We Use Data</h2>
                  <p className="text-gray-300 mb-4">
                    We use the information we collect for various purposes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>To provide, maintain, and improve our services</li>
                    <li>To process transactions and send event information</li>
                    <li>To communicate with you about your account or events</li>
                    <li>To personalize your experience and provide relevant content</li>
                    <li>To detect, prevent, and address technical issues and security concerns</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                  <p className="text-gray-300">
                    We will only use your personal information for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason that is compatible with the original purpose.
                  </p>
                </section>
              )}

              {/* Data Sharing */}
              {activeSection === 'sharing' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">4. Data Sharing</h2>
                  <p className="text-gray-300 mb-4">
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>
                      <strong>With event organizers:</strong> When you purchase tickets, we share necessary information with the event organizer to facilitate the event.
                    </li>
                    <li>
                      <strong>With service providers:</strong> We engage third parties to perform functions on our behalf (payment processing, analytics, customer support).
                    </li>
                    <li>
                      <strong>For legal reasons:</strong> If required by law or to protect our rights and safety.
                    </li>
                    <li>
                      <strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.
                    </li>
                  </ul>
                  <p className="text-gray-300">
                    We do not sell your personal information to third parties for their marketing purposes without your explicit consent.
                  </p>
                </section>
              )}

              {/* Data Security */}
              {activeSection === 'security' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">5. Data Security</h2>
                  <p className="text-gray-300 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p className="text-gray-300 mb-4">
                    These measures include encryption, access controls, secure servers, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                  </p>
                  <p className="text-gray-300">
                    In the event of a data breach, we will notify you and relevant authorities as required by applicable laws.
                  </p>
                </section>
              )}

              {/* Your Rights */}
              {activeSection === 'rights' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">6. Your Rights</h2>
                  <p className="text-gray-300 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                    <li><strong>Objection:</strong> Object to processing of your data</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Withdraw consent:</strong> Where processing is based on consent</li>
                  </ul>
                  <p className="text-gray-300">
                    To exercise these rights, please contact us using the information below. We may need to verify your identity before fulfilling your request.
                  </p>
                </section>
              )}

              {/* Cookies */}
              {activeSection === 'cookies' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">7. Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    We use cookies and similar tracking technologies to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>Authenticate users and secure our services</li>
                    <li>Remember your preferences and settings</li>
                    <li>Analyze how our services are used</li>
                    <li>Personalize content and advertisements</li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our services.
                  </p>
                </section>
              )}

              {/* Policy Changes */}
              {activeSection === 'changes' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">8. Policy Changes</h2>
                  <p className="text-gray-300 mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                  <p className="text-gray-300">
                    If we make material changes, we will provide more prominent notice, such as through email notification or a banner on our website.
                  </p>
                </section>
              )}
            </div>

            <div className="mt-8 bg-indigo-900/30 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>Email: privacy@eventhub.com</li>
                <li>Mail: EventHub Privacy, 123 Event Street, San Francisco, CA 94107</li>
                <li>Phone: +1 (800) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;