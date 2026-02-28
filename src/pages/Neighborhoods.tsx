import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Info, TrendingUp, Users } from 'lucide-react';

const NEIGHBORHOODS = [
  { name: 'Stone Oak', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80', desc: 'Upscale living with top-rated schools and gated communities.', price: '$450k - $2M+' },
  { name: 'The Dominion', image: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=600&q=80', desc: 'San Antonio\'s premier luxury gated community.', price: '$800k - $10M+' },
  { name: 'Alamo Heights', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', desc: 'Historic charm with a sophisticated, small-town feel.', price: '$500k - $3M+' },
  { name: 'Fair Oaks Ranch', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', desc: 'Spacious lots and hill country views just outside the city.', price: '$400k - $1.5M+' },
  { name: 'Downtown', image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=600&q=80', desc: 'Urban living with historic lofts and modern penthouses.', price: '$300k - $2M+' },
  { name: 'Boerne', image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80', desc: 'A blend of German heritage and modern hill country luxury.', price: '$400k - $5M+' }
];

export default function Neighborhoods() {
  return (
    <>
      <Helmet>
        <title>Neighborhood Insights | Scott J. Realtor Group</title>
        <meta name="description" content="Explore the best neighborhoods in San Antonio. Get local insights, market trends, and community information." />
      </Helmet>

      <div className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Local Expertise
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-luxury-black mb-6">
              Neighborhood <span className="text-red-600">Insights</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              San Antonio is a city of diverse communities. Explore our guide to find the neighborhood that perfectly matches your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEIGHBORHOODS.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2rem] overflow-hidden luxury-shadow border border-gray-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-display font-bold text-white">{area.name}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{area.desc}</p>
                  <div className="flex items-center justify-between py-4 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Price Range</p>
                      <p className="text-sm font-bold text-luxury-black">{area.price}</p>
                    </div>
                    <button className="p-3 rounded-xl bg-gray-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                      <Info size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Market Trends Section */}
          <div className="mt-24 bg-luxury-black rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8 leading-tight">
                  San Antonio <br />
                  <span className="text-red-600">Market Trends</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-600">
                      <TrendingUp size={32} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">+8.5%</p>
                      <p className="text-sm text-white/50 uppercase tracking-widest">Year-over-Year Growth</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-600">
                      <Users size={32} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,200+</p>
                      <p className="text-sm text-white/50 uppercase tracking-widest">New Residents Monthly</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-white/80 leading-relaxed mb-6">
                  "The San Antonio market remains resilient with strong demand in luxury sectors. We're seeing a significant influx of out-of-state buyers looking for quality of life and value."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Scott J."
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold">Scott J. Realtor</p>
                    <p className="text-xs text-white/50 uppercase tracking-widest">Market Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
