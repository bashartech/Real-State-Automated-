import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function RecentSales() {
  const { t } = useLanguage();
  
  const sales = [
    { id: 1, image: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=600&q=80', price: '$1.4M', address: 'Stone Oak', status: 'Sold' },
    { id: 2, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', price: '$850K', address: 'Fair Oaks', status: 'Sold' },
    { id: 3, image: 'https://images.unsplash.com/photo-1600607687940-c52af096999c?auto=format&fit=crop&w=600&q=80', price: '$920K', address: 'The Dominion', status: 'Sold' },
    { id: 4, image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80', price: '$1.1M', address: 'Alamo Heights', status: 'Sold' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
              Proven Track Record
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-luxury-black">
              Recent <span className="text-red-600">Sales</span>
            </h2>
          </div>
          <Link 
            to="/listings"
            className="text-luxury-black font-bold uppercase tracking-widest text-xs border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors"
          >
            {t('common.viewAllSales')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sales.map((sale, i) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={sale.image}
                alt={sale.address}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-display font-bold text-xl mb-1">{sale.price}</p>
                <p className="text-white/70 text-xs uppercase tracking-widest font-medium">{sale.address}</p>
              </div>
              <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {sale.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
