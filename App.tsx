import React, { useState } from 'react';
import Layout from './components/Layout';
import TrackerDashboard from './components/TrackerDashboard';
import SeoArticle from './components/SeoArticle';
import { ChevronDownIcon } from './components/Icons';

const App: React.FC = () => {
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white animate-fade-in flex flex-col gap-12">
        
        {/* Main Dashboard Area */}
        <section className="w-full">
            <TrackerDashboard />
        </section>
        
        {/* Article Section with Read More Logic */}
        <section className="w-full max-w-5xl mx-auto mt-8 relative">
          <div className="bg-space-dark/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500">
             
             {/* Header */}
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-magenta">Financial Wisdom</h2>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Ultimate Guide</p>
                </div>
                <button
                    onClick={() => setIsArticleOpen(!isArticleOpen)}
                    className="text-gray-400 hover:text-white transition-transform duration-300"
                    aria-label="Toggle Article"
                >
                    <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isArticleOpen ? 'rotate-180' : ''}`} />
                </button>
             </div>

             {/* Content Container */}
             <div className={`relative transition-all duration-700 ease-in-out ${isArticleOpen ? 'max-h-[5000px] opacity-100' : 'max-h-40 opacity-80 overflow-hidden'}`}>
                <SeoArticle />
                
                {/* Gradient Overlay for collapsed state */}
                {!isArticleOpen && (
                    <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-space-dark/80 to-transparent flex items-end justify-center pb-8">
                         <button
                            onClick={() => setIsArticleOpen(true)}
                            className="bg-accent-cyan hover:bg-accent-cyan/80 text-space-dark font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(51,211,212,0.4)] hover:shadow-[0_0_30px_rgba(51,211,212,0.6)] transition-all transform hover:-translate-y-1"
                        >
                            Read Full Guide
                        </button>
                    </div>
                )}
             </div>

             {/* Footer Button for closing if open */}
             {isArticleOpen && (
                 <div className="p-4 bg-space-dark/50 text-center border-t border-white/10">
                    <button
                        onClick={() => setIsArticleOpen(false)}
                        className="text-gray-400 hover:text-white text-sm hover:underline"
                    >
                        Collapse Article
                    </button>
                 </div>
             )}

          </div>
        </section>

      </div>
    </Layout>
  );
};

export default App;