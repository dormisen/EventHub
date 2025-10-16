import  { useState } from 'react';

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'accounts', title: 'User Accounts' },
    { id: 'content', title: 'Content Responsibility' },
    { id: 'payments', title: 'Payments & Fees' },
    { id: 'termination', title: 'Termination' },
    { id: 'disclaimer', title: 'Disclaimer' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'governing', title: 'Governing Law' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Terms of Service
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
                    Welcome to EventHub! These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Service").
                  </p>
                  <p className="text-gray-300 mb-4">
                    By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you are using the Service on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these Terms.
                  </p>
                  <p className="text-gray-300">
                    Please read these Terms carefully before using the Service. If you do not agree to all of these Terms, do not access or use the Service.
                  </p>
                </section>
              )}

              {/* User Accounts */}
              {activeSection === 'accounts' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">2. User Accounts</h2>
                  <p className="text-gray-300 mb-4">
                    To access certain features of the Service, you may be required to create an account. When creating your account, you must provide accurate and complete information.
                  </p>
                  <p className="text-gray-300 mb-4">
                    You are solely responsible for the activity that occurs on your account and for keeping your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.
                  </p>
                  <p className="text-gray-300">
                    We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
                  </p>
                </section>
              )}

              {/* Content Responsibility */}
              {activeSection === 'content' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">3. Content Responsibility</h2>
                  <p className="text-gray-300 mb-4">
                    As an event organizer, you are solely responsible for all content that you post on the Service, including events, descriptions, images, and any other materials ("Your Content").
                  </p>
                  <p className="text-gray-300 mb-4">
                    You represent and warrant that: (i) you own or have the necessary rights to use and authorize us to use Your Content; (ii) Your Content does not infringe any third party's rights; and (iii) Your Content complies with all applicable laws and regulations.
                  </p>
                  <p className="text-gray-300">
                    We reserve the right to remove any content that we determine, in our sole discretion, violates these Terms or is otherwise objectionable.
                  </p>
                </section>
              )}

              {/* Payments & Fees */}
              {activeSection === 'payments' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">4. Payments & Fees</h2>
                  <p className="text-gray-300 mb-4">
                    For paid events, we use third-party payment processors to handle transactions. By using our payment processing services, you agree to the terms of service of our payment processors.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our fees are displayed during the event creation process. We reserve the right to change our fees at any time, but will provide you with notice of any fee changes.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Payouts to organizers are typically processed within 5 business days after the completion of an event. We may withhold payments if we suspect fraudulent activity or violations of these Terms.
                  </p>
                </section>
              )}

              {/* Termination */}
              {activeSection === 'termination' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">5. Termination</h2>
                  <p className="text-gray-300 mb-4">
                    You may terminate your account at any time by contacting us or through your account settings.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We may suspend or terminate your access to the Service at any time, with or without cause, with or without notice.
                  </p>
                  <p className="text-gray-300">
                    Upon termination, your right to use the Service will immediately cease. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </section>
              )}

              {/* Disclaimer */}
              {activeSection === 'disclaimer' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">6. Disclaimer</h2>
                  <p className="text-gray-300 mb-4">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                  <p className="text-gray-300">
                    We do not warrant that the Service will be uninterrupted, secure, or error-free, that defects will be corrected, or that the Service is free of viruses or other harmful components.
                  </p>
                </section>
              )}

              {/* Limitation of Liability */}
              {activeSection === 'liability' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">7. Limitation of Liability</h2>
                  <p className="text-gray-300 mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EVENTHUB, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; OR (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
                  </p>
                </section>
              )}

              {/* Governing Law */}
              {activeSection === 'governing' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">8. Governing Law</h2>
                  <p className="text-gray-300 mb-4">
                    These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-gray-300">
                    Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in San Francisco County, California.
                  </p>
                </section>
              )}
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                These Terms of Service are provided for informational purposes and do not constitute legal advice. 
                Please consult with legal counsel for any specific legal concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;