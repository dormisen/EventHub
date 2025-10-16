import  { useState } from 'react';

const CookiePolicyPage = () => {
  const [activeSection, setActiveSection] = useState('what-are-cookies');
  
  const sections = [
    { id: 'what-are-cookies', title: 'What are Cookies?' },
    { id: 'how-we-use', title: 'How We Use Cookies' },
    { id: 'types', title: 'Types of Cookies' },
    { id: 'third-party', title: 'Third-Party Cookies' },
    { id: 'managing', title: 'Managing Cookies' },
    { id: 'changes', title: 'Policy Changes' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Cookie Policy
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
              {/* What are Cookies? */}
              {activeSection === 'what-are-cookies' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">1. What are Cookies?</h2>
                  <p className="text-gray-300 mb-4">
                    Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to website owners.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Cookies typically contain:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>The name of the cookie</li>
                    <li>A unique identifier</li>
                    <li>The domain name of the website that set the cookie</li>
                    <li>An expiration date (some are deleted when you close your browser)</li>
                  </ul>
                  <p className="text-gray-300">
                    We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device until they expire or you delete them).
                  </p>
                </section>
              )}

              {/* How We Use Cookies */}
              {activeSection === 'how-we-use' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">2. How We Use Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    We use cookies for several purposes on EventHub:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>
                      <strong>Essential Cookies:</strong> Necessary for the website to function properly and securely
                    </li>
                    <li>
                      <strong>Authentication:</strong> To recognize you when you log in and keep you logged in
                    </li>
                    <li>
                      <strong>Preferences:</strong> To remember your settings and preferences
                    </li>
                    <li>
                      <strong>Security:</strong> To protect your account and detect malicious activity
                    </li>
                    <li>
                      <strong>Performance:</strong> To monitor and improve website performance
                    </li>
                    <li>
                      <strong>Analytics:</strong> To understand how visitors use our website
                    </li>
                    <li>
                      <strong>Advertising:</strong> To deliver relevant advertisements
                    </li>
                  </ul>
                  <p className="text-gray-300">
                    Without certain cookies, some features of our website may not function properly.
                  </p>
                </section>
              )}

              {/* Types of Cookies */}
              {activeSection === 'types' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">3. Types of Cookies We Use</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left">Type</th>
                          <th className="px-4 py-3 text-left">Purpose</th>
                          <th className="px-4 py-3 text-left">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        <tr>
                          <td className="px-4 py-3 font-medium">Strictly Necessary</td>
                          <td className="px-4 py-3 text-gray-300">Essential for website functionality and security</td>
                          <td className="px-4 py-3 text-gray-300">Session or Persistent</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Preferences</td>
                          <td className="px-4 py-3 text-gray-300">Remember your settings and preferences</td>
                          <td className="px-4 py-3 text-gray-300">Persistent (up to 1 year)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Performance</td>
                          <td className="px-4 py-3 text-gray-300">Monitor website performance and usage</td>
                          <td className="px-4 py-3 text-gray-300">Persistent (up to 2 years)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Analytics</td>
                          <td className="px-4 py-3 text-gray-300">Understand how visitors interact with our site</td>
                          <td className="px-4 py-3 text-gray-300">Persistent (up to 2 years)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Advertising</td>
                          <td className="px-4 py-3 text-gray-300">Deliver relevant ads and measure ad performance</td>
                          <td className="px-4 py-3 text-gray-300">Persistent (up to 1 year)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Third-Party Cookies */}
              {activeSection === 'third-party' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">4. Third-Party Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    We allow certain third parties to place cookies on our website for various purposes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
                    <li>
                      <strong>Analytics Providers:</strong> Google Analytics, Mixpanel, etc. to help us analyze website traffic
                    </li>
                    <li>
                      <strong>Advertising Partners:</strong> To serve relevant ads on our site and other websites
                    </li>
                    <li>
                      <strong>Social Media Platforms:</strong> To enable social sharing features and track effectiveness of social campaigns
                    </li>
                    <li>
                      <strong>Payment Processors:</strong> To securely process payments
                    </li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    These third parties have their own privacy policies and cookie policies. We do not control these cookies, and you should review the third parties' policies for more information.
                  </p>
                </section>
              )}

              {/* Managing Cookies */}
              {activeSection === 'managing' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">5. Managing Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    You have several options to control cookies:
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">Browser Settings</h3>
                  <p className="text-gray-300 mb-4">
                    Most browsers allow you to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>See what cookies are stored and delete them</li>
                    <li>Block cookies from specific sites</li>
                    <li>Block all third-party cookies</li>
                    <li>Set your browser to ask for permission before setting cookies</li>
                  </ul>
                  <p className="text-gray-300 mb-6">
                    Refer to your browser's help documentation for instructions on managing cookies.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Cookie Consent Tool</h3>
                  <p className="text-gray-300 mb-4">
                    When you first visit our website, you'll see a cookie banner where you can customize your cookie preferences.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Advertising Opt-Out</h3>
                  <p className="text-gray-300 mb-4">
                    To opt out of personalized advertising:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>
                      Digital Advertising Alliance (DAA): <a href="https://optout.aboutads.info/" className="text-indigo-400 hover:underline">optout.aboutads.info</a>
                    </li>
                    <li>
                      Network Advertising Initiative (NAI): <a href="https://optout.networkadvertising.org/" className="text-indigo-400 hover:underline">optout.networkadvertising.org</a>
                    </li>
                    <li>
                      European users: <a href="https://www.youronlinechoices.eu/" className="text-indigo-400 hover:underline">youronlinechoices.eu</a>
                    </li>
                  </ul>
                </section>
              )}

              {/* Policy Changes */}
              {activeSection === 'changes' && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6">6. Policy Changes</h2>
                  <p className="text-gray-300 mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We will notify you of significant changes by posting a prominent notice on our website and updating the "Last updated" date at the top of this policy.
                  </p>
                  <p className="text-gray-300">
                    We encourage you to periodically review this Cookie Policy to stay informed about how we use cookies.
                  </p>
                </section>
              )}
            </div>

            <div className="mt-8 bg-indigo-900/30 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>Email: privacy@eventhub.com</li>
                <li>Mail: EventHub Privacy, 123 Event Street, San Francisco, CA 94107</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;