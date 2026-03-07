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

  const filteredProperties = PROPERTIES.filter(p => {
    if (filter === 'All') return true;
    return p.type === filter;
  });

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex-shrink-0">
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('listings.tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-luxury-black leading-tight">
              {t('listings.title')} <span className="text-red-600">{t('listings.titleAccent')}</span>
            </h2>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
              {['All', 'Luxury', 'Single Family', 'Condo'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 lg:px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === type
                      ? 'bg-luxury-black text-white'
                      : 'text-gray-500 hover:text-luxury-black'
                  }`}
                >
                  {t(`listings.filter${type.replace(' ', '')}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters - Mobile */}
        <div className="md:hidden mb-6">
          <div className="relative -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Luxury', 'Single Family', 'Condo'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0 ${
                    filter === type
                      ? 'bg-luxury-black text-white'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {t(`listings.filter${type.replace(' ', '')}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-luxury-black">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
            {filter !== 'All' && <span> in <span className="font-bold">{filter}</span></span>}
          </p>
        </div>

        {/* Property Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-base sm:text-lg mb-4">No properties found in this category.</p>
                <button
                  onClick={() => setFilter('All')}
                  className="text-red-600 font-bold uppercase tracking-widest text-xs sm:text-sm hover:underline"
                >
                  View All Properties
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/listings"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-transparent border-2 border-luxury-black text-luxury-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-luxury-black hover:text-white transition-all"
          >
            {t('common.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
