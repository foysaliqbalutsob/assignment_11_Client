import React from 'react';
import { Link } from 'react-router';

const BlogArchive = () => {
  // Static data for the blog posts
  const blogPosts = [
    {
      id: 1,
      category: "Infrastructure",
      date: "Mar 12, 2026",
      title: "Optimizing Server Lifecycles in 2026",
      desc: "Discover the latest strategies for extending the performance life of your server clusters while maintaining peak energy efficiency.",
      readTime: "8 min read",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80",
      accent: "primary"
    },
    {
      id: 2,
      category: "Security",
      date: "Mar 10, 2026",
      title: "Hardware Security: Protecting the Physical Layer",
      desc: "Why your cybersecurity strategy is incomplete without rigorous hardware tamper detection and BIOS protection protocols.",
      readTime: "12 min read",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
      accent: "emerald"
    },
    {
      id: 3,
      category: "Lifecycle",
      date: "Mar 05, 2026",
      title: "E-Waste Compliance: Managing Decommissioning",
      desc: "Step-by-step guide to responsible hardware disposal and data destruction that meets global regulatory standards.",
      readTime: "10 min read",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      accent: "orange"
    },
    {
      id: 4,
      category: "Updates",
      date: "Feb 28, 2026",
      title: "Predictive Maintenance with AI Sensors",
      desc: "How IoT sensors and machine learning are preventing downtime before hardware failures occur in remote branches.",
      readTime: "6 min read",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      accent: "primary"
    },
    {
        id: 5,
        category: "Cloud",
        date: "Feb 15, 2026",
        title: "Hybrid Cloud Hardware Synergy",
        desc: "Balancing on-premise hardware performance with cloud scalability for fluctuating enterprise workloads.",
        readTime: "9 min read",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        accent: "purple"
      }
  ];

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 min-h-screen font-display">
      {/* Top Navigation Bar */}

      <main className=" mx-auto px-6 py-8">
        

        {/* Page Heading */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">AssetVerse Blog Archive</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Expert insights on hardware maintenance, lifecycle management, and enterprise security infrastructure.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-1 relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors"></span>
            <input 
              className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none transition-all shadow-sm" 
              placeholder="Search hardware updates..." 
              type="text"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <button className="h-14 px-6 flex items-center gap-2 bg-[#137fec] text-white font-bold rounded-xl shadow-md">All Topics <span className="material-symbols-outlined">expand_more</span></button>
            {['Security', 'Infrastructure', 'Lifecycle'].map(topic => (
              <button key={topic} className="h-14 px-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <button className="px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            Load More Articles
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-[#137fec] text-white font-bold rounded-lg">1</button>
            {[2, 3, '...', 12].map((p, i) => (
              <button key={i} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold">{p}</button>
            ))}
           
          </div>
        </div>
      </main>

    
    </div>
  );
};

// Sub-component for each Blog Card
const BlogCard = ({ post }) => {
  const accentColors = {
    primary: "bg-[#137fec]/10 text-[#137fec]",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  };

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col">
      <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <img 
          src={post.img} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${accentColors[post.accent] || accentColors.primary}`}>
            {post.category}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{post.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#137fec] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
          {post.desc}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <Link to={'/blog/${post.id}'} className="text-[#137fec] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all btn btn-primary">
            Read More 
          </Link>
          <span className="text-xs text-slate-400">{post.readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogArchive;