import React, { useState } from 'react';
import { PROPERTIES } from '../constants';
import PropertyCard from './PropertyCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ListingGrid() {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const { t } = useLanguage();

  const filteredProperties = PROPERTIES.filter(p => 
    filter === 'All' ? true : p.type === filter
  );

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('listings.tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-luxury-black">
              {t('listings.title')} <span className="text-red-600">{t('listings.titleAccent')}</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
              {['All', 'Luxury', 'Single Family', 'Condo'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    filter === type 
                      ? 'bg-luxury-black text-white' 
                      : 'text-gray-500 hover:text-luxury-black'
                  }`}
                >
                  {t(`listings.filter${type.replace(' ', '')}`)}
                </button>
              ))}
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 text-xs font-bold uppercase tracking-widest text-luxury-black">
                <SlidersHorizontal size={16} className="text-red-600" />
                <span>Sort: {sortBy}</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <Link 
            to="/listings"
            className="inline-block px-10 py-4 rounded-full bg-transparent border-2 border-luxury-black text-luxury-black font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all"
          >
            {t('common.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
