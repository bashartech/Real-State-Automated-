import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { Search, SlidersHorizontal, Map as MapIcon, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Listings() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('type') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();

  // Advanced filters
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    types: [] as string[],
    minSize: '',
    maxSize: '',
    neighborhoods: [] as string[],
    statuses: [] as string[]
  });

  useEffect(() => {
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    if (search) setSearchQuery(search);
    if (type) setFilter(type);
  }, [searchParams]);

  // Get unique neighborhoods from properties
  const neighborhoods = [...new Set(PROPERTIES.map(p => p.neighborhood))];

  const filteredProperties = PROPERTIES.filter(p => {
    // Basic type filter (from quick filters)
    const matchesQuickType = filter === 'All' ? true : p.type === filter;

    // Search query
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

    // Advanced filters
    const matchesMinPrice = filters.minPrice ? p.price >= parseInt(filters.minPrice) : true;
    const matchesMaxPrice = filters.maxPrice ? p.price <= parseInt(filters.maxPrice) : true;
    const matchesTypes = filters.types.length > 0 ? filters.types.includes(p.type) : true;
    const matchesMinSize = filters.minSize ? p.sqft >= parseInt(filters.minSize) : true;
    const matchesMaxSize = filters.maxSize ? p.sqft <= parseInt(filters.maxSize) : true;
    const matchesNeighborhoods = filters.neighborhoods.length > 0 ? filters.neighborhoods.includes(p.neighborhood) : true;
    const matchesStatuses = filters.statuses.length > 0 ? filters.statuses.includes(p.status) : true;

    return matchesQuickType && matchesSearch && matchesMinPrice && matchesMaxPrice &&
           matchesTypes && matchesMinSize && matchesMaxSize && matchesNeighborhoods && matchesStatuses;
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxFilter = (key: 'types' | 'neighborhoods' | 'statuses', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      types: [],
      minSize: '',
      maxSize: '',
      neighborhoods: [],
      statuses: []
    });
    setFilter('All');
    setSearchQuery('');
  };

  const activeFilterCount = [
    filters.minPrice,
    filters.maxPrice,
    filters.minSize,
    filters.maxSize,
    ...filters.types,
    ...filters.neighborhoods,
    ...filters.statuses
  ].filter(Boolean).length;

  return (
    <>
      <Helmet>
        <title>Property Listings | Scott J. Realtor Group</title>
        <meta name="description" content="Browse exclusive luxury real estate listings in San Antonio and surrounding areas." />
      </Helmet>

      <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {t('listings.tag')}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-luxury-black mb-4">
              {t('listings.title')} <span className="text-red-600">{t('listings.titleAccent')}</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Discover your next home from our curated selection of luxury estates, modern condos, and family residences.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 mb-12 flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1 w-full flex items-center px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full bg-transparent outline-none text-luxury-black font-medium"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar">
                {['All', 'Luxury', 'Single Family', 'Condo'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      filter === type 
                        ? 'bg-luxury-black text-white shadow-lg' 
                        : 'text-gray-500 hover:text-luxury-black'
                    }`}
                  >
                    {t(`listings.filter${type.replace(' ', '')}`)}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-luxury-black text-white px-6 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-all relative"
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 mb-12 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-display font-bold text-luxury-black">Advanced Filters</h3>
                    <button
                      onClick={clearAllFilters}
                      className="text-red-600 font-bold text-sm uppercase tracking-widest hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Price Range */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Price Range
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Size Range (sqft) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Size (sqft)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minSize}
                          onChange={(e) => handleFilterChange('minSize', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxSize}
                          onChange={(e) => handleFilterChange('maxSize', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Property Type
                      </label>
                      <div className="space-y-2">
                        {['Luxury', 'Single Family', 'Condo'].map((type) => (
                          <label key={type} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.types.includes(type)}
                              onChange={() => handleCheckboxFilter('types', type)}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Neighborhoods */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Neighborhoods
                      </label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {neighborhoods.map((neighborhood) => (
                          <label key={neighborhood} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.neighborhoods.includes(neighborhood)}
                              onChange={() => handleCheckboxFilter('neighborhoods', neighborhood)}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">{neighborhood}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Status
                      </label>
                      <div className="space-y-2">
                        {['Active', 'Pending'].map((status) => (
                          <label key={status} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.statuses.includes(status)}
                              onChange={() => handleCheckboxFilter('statuses', status)}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-500 font-medium">
              Showing <span className="text-luxury-black font-bold">{filteredProperties.length}</span> properties
            </p>
            <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <button className="p-2 bg-gray-100 rounded-lg text-luxury-black">
                <Grid size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-luxury-black transition-colors">
                <MapIcon size={18} />
              </button>
            </div>
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-2xl font-display font-bold text-gray-400">No properties found matching your criteria.</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-red-600 font-bold uppercase tracking-widest text-sm hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
