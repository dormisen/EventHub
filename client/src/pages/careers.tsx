
const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      department: "Engineering"
    },
    {
      id: 2,
      title: "UX Designer",
      type: "Full-time",
      location: "San Francisco",
      department: "Design"
    },
    {
      id: 3,
      title: "Marketing Manager",
      type: "Full-time",
      location: "New York",
      department: "Marketing"
    },
    {
      id: 4,
      title: "Customer Support Specialist",
      type: "Part-time",
      location: "Remote",
      department: "Operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Careers at EventHub
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Join our mission to revolutionize the event industry
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Competitive compensation & equity",
              "Flexible work arrangements",
              "Health & wellness benefits",
              "Professional development budget",
              "Unlimited vacation policy",
              "Cutting-edge technology stack"
            ].map((benefit, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-full mb-4" />
                <p className="text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
          <div className="space-y-4">
            {jobOpenings.map(job => (
              <div key={job.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-400">
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.department}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;