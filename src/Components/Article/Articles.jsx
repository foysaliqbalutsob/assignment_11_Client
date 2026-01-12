import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const Articles = () => {
  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen font-sans">
      {/* Main Wrapper - Responsive container for Web */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#136dec] p-2 rounded-xl text-white">
              
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">AssetVerse Hub</h1>
              <p className="text-sm text-slate-500">Resource center for hardware lifecycle</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group flex-1 md:flex-none">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></span>
              <input 
                type="text" 
                placeholder="Search blogs..." 
                className="pl-10 pr-4 py-2 w-full md:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full outline-none focus:ring-2 focus:ring-[#136dec] transition-all"
              />
            </div>
          </div>
        </header>

        {/* Hero Banner Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 min-h-[450px] flex flex-col justify-end p-8 md:p-12 border border-slate-800 shadow-2xl group">
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-cover bg-center opacity-50 transition-transform duration-1000 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient from-[#101822] via-[#101822]/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-[#136dec] text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">Featured Insight</span>
              <h2 className="text-white text-4xl md:text-5xl font-black leading-tight mb-6">
                The Future of Enterprise Asset Tracking
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Discover how AI and IoT are reshaping how global organizations manage high-value equipment in 2026.
              </p>
              <Link to={'/'} className="bg-[#136dec] hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center gap-3 w-fit">
                Read Full Article
                <span className="material-symbols-outlined">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Resources Grid - Responsive Grid (1 to 3 columns) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Latest Resources</h3>
            <button className="text-[#136dec] font-bold hover:underline flex items-center gap-1">
              Browse All <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard 
              category="Maintenance" 
              title="Maximizing Hardware Lifespan" 
              info="12 min read • Essential care tips"
              img="https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80"
            />
            <ResourceCard 
              category="Wellness" 
              title="Ergonomics & Productivity" 
              info="8 min read • Workspace optimization"
              img="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80"
            />
            <ResourceCard 
              category="Operations" 
              title="Tracking Remote Assets" 
              info="15 min read • Strategy tips"
              img="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
            />
          </div>
        </section>

        {/* Newsletter & Stats - 2 Column Layout on Web */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Newsletter */}
          <section className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="bg-[#136dec]/10 p-6 rounded-2xl text-[#136dec]">
              <span className="material-symbols-outlined text-5xl">mail</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black mb-2">Stay Ahead of the Curve</h3>
              <p className="text-slate-500 mb-6">Join 5,000+ professionals for weekly inventory insights.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-6 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-[#136dec]"
                />
                <button className="bg-[#136dec] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </section>

          {/* Stats Box */}
          <section className="grid grid-cols-1 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex justify-between items-center">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Enterprise Users</span>
              <span className="text-3xl font-black text-[#136dec]">500+</span>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex justify-between items-center">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Managed Assets</span>
              <span className="text-3xl font-black text-[#136dec]">12k</span>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <footer className="bg-[#136dec]  p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4">Simplify Your Inventory Today</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Take control of your hardware lifecycle with our world-class platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-[#136dec] px-10 py-4 rounded-full font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                Get Started Now <FaArrowRight />
              </button>
              <button className="px-10 py-4 rounded-full font-bold border-2 border-white/30 hover:bg-white/10 transition-all">
                Schedule a Demo
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Sub-component for Resource Cards
const ResourceCard = ({ category, title, info, img }) => (
  <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 group hover:shadow-xl transition-all duration-300">
    <div className="relative aspect-video overflow-hidden">
      <div 
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest">
        {category}
      </div>
    </div>
    <div className="p-6">
      <h4 className="text-xl font-bold mb-2 group-hover:text-[#136dec] transition-colors">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{info}</p>
    </div>
  </div>
);

export default Articles;