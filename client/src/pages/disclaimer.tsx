
const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Legal Disclaimer
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Last updated: July 7, 2025
        </p>

        <div className="bg-gray-800 rounded-xl p-8">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Website Content</h2>
            <p className="text-gray-300 mb-4">
              The information provided by EventHub ("we," "us," or "our") on our website (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">External Links Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
            <p className="text-gray-300">
              We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Professional Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The Site cannot and does not contain event planning, legal, or financial advice. The event planning information is provided for general informational and educational purposes only and is not a substitute for professional advice.
            </p>
            <p className="text-gray-300">
              Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of event planning, legal, or financial advice. The use or reliance of any information contained on this site is solely at your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Event Listings</h2>
            <p className="text-gray-300 mb-4">
              EventHub serves as a platform for event organizers to list their events. We do not own, manage, or control these events. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
              <li>The quality, safety, or legality of events listed</li>
              <li>The accuracy of event information provided by organizers</li>
              <li>The conduct of event organizers or attendees</li>
              <li>Any issues that arise between event organizers and attendees</li>
            </ul>
            <p className="text-gray-300">
              Attendance at any event listed on our platform is at your own risk. We recommend that attendees exercise due diligence and caution when participating in any event.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Ticket Sales</h2>
            <p className="text-gray-300 mb-4">
              EventHub facilitates ticket sales between event organizers and attendees but is not the seller of tickets. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
              <li>Event cancellations or changes</li>
              <li>Refund policies (set by individual organizers)</li>
              <li>Ticket delivery issues</li>
              <li>Disputes regarding ticket purchases</li>
            </ul>
            <p className="text-gray-300">
              All ticket sales are subject to the terms and conditions set by the event organizer. We strongly recommend reviewing the organizer's policies before purchasing tickets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              In no event shall EventHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Events listed on our platform or attendance at such events</li>
              <li>Ticket purchases or transactions facilitated through our platform</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            This disclaimer was created using Termly's Disclaimer Generator and adapted for EventHub's specific needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;