

import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Virtual Events",
      excerpt: "Exploring how hybrid events are changing the landscape of event planning and attendance.",
      date: "May 15, 2024",
      category: "Industry Trends",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "10 Tips for First-Time Event Organizers",
      excerpt: "Essential advice to help new organizers create successful and memorable events.",
      date: "April 28, 2024",
      category: "Planning Tips",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Maximizing Engagement at Your Event",
      excerpt: "Proven strategies to keep attendees engaged and interacting throughout your event.",
      date: "April 10, 2024",
      category: "Event Strategy",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Sustainability in Event Planning",
      excerpt: "How to create eco-friendly events without compromising on quality or attendee experience.",
      date: "March 22, 2024",
      category: "Sustainability",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          EventHub Blog
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Insights, trends, and best practices for event professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {blogPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-indigo-400 text-sm font-medium">{post.category}</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                    <button className="text-indigo-400 hover:text-indigo-300">
                      Read more →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;