
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          About EventHub
        </h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Founded in 2023, EventHub was born from a passion for bringing people together through 
            unforgettable experiences. We noticed a gap in the market for a platform that truly 
            understands both event organizers and attendees, and set out to create a solution.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Today, we're proud to have connected over 500,000 users with their perfect events, 
            from intimate local gatherings to massive international conferences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To revolutionize the event industry by creating seamless connections between organizers 
            and attendees through innovative technology and exceptional user experiences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Team Member {i+1}</h3>
                <p className="text-gray-400">Position Title</p>
                <p className="text-gray-300 mt-3 text-sm">
                  Brief bio about this team member and their role at EventHub.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;