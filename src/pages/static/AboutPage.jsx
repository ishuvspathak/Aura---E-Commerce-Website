import React from 'react';
import { FiTarget, FiHeart, FiLayers } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold tracking-wider uppercase text-accent">Our Brand</span>
        <h1 className="text-3xl font-black text-primary dark:text-white tracking-tight">The AURA Philosophy</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          We believe in items built to last. Stripping away the excess to focus entirely on quality, detail, and utility.
        </p>
      </div>

      {/* Grid highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl shadow-premium space-y-3">
          <div className="p-3 bg-accent/10 text-accent rounded-xl w-fit"><FiLayers /></div>
          <h3 className="text-sm font-bold text-primary dark:text-white">Minimalist Design</h3>
          <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
            Clean geometries, curated tones, and zero clutter. Our designs integrate seamlessly into any modern workflow or home.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl shadow-premium space-y-3">
          <div className="p-3 bg-accent/10 text-accent rounded-xl w-fit"><FiHeart /></div>
          <h3 className="text-sm font-bold text-primary dark:text-white">Ethical Crafting</h3>
          <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
            Sourced from gold-rated tanneries, natural rubber crops, and certified manufacturers. Safe conditions and fair trade.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl shadow-premium space-y-3">
          <div className="p-3 bg-accent/10 text-accent rounded-xl w-fit"><FiTarget /></div>
          <h3 className="text-sm font-bold text-primary dark:text-white">Sustainable Future</h3>
          <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
            Zero-plastic packaging, carbon-neutral carrier partnerships, and recraftable Blake-stitched shoes. Minimizing waste.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-8 sm:p-12 shadow-premium grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-primary dark:text-white">Our Journey</h2>
          <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
            Established in 2024, AURA began as a simple collaboration between industrial product designers and master tailors. Dissatisfied with cheap, fast-fashion alternatives, we set out to build a platform that focuses strictly on raw quality.
          </p>
          <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
            Today, our collections extend from full-grain leather accessories to high-performance workspace electronics. Each piece carries our signature attention to detail.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop" 
          alt="Studio Workspace" 
          className="rounded-2xl w-full object-cover max-h-[250px]" 
        />
      </section>
    </div>
  );
};

export default AboutPage;
