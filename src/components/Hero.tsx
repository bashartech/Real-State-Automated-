import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Home, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('Property Type');
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery);
    if (propertyType !== 'Property Type') params.append('type', propertyType);
    
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={HERO_IMAGES[currentImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            alt="Luxury Home"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/40 to-transparent" />
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-4">
        <button 
          onClick={prevImage}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-red-600 transition-all border border-white/20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextImage}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-red-600 transition-all border border-white/20"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 
            
            */}
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight mb-6">
              {t('hero.title')} <br />
              <span className="text-red-600">{t('hero.titleAccent')}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-2xl"
          >
            <form onSubmit={handleSearch} className="flex-1 w-full flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full bg-transparent outline-none text-luxury-black placeholder:text-gray-400 font-medium"
              />
            </form>
            <div className="hidden md:flex items-center px-4 py-3 border-r border-gray-100">
              <Home className="text-gray-400 mr-3" size={20} />
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent outline-none text-luxury-black font-medium cursor-pointer"
              >
                <option value="Property Type">{t('hero.propertyType')}</option>
                <option value="Single Family">{t('hero.singleFamily')}</option>
                <option value="Condo">{t('hero.condo')}</option>
                <option value="Luxury">{t('hero.luxury')}</option>
              </select>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-red-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-luxury-black transition-all flex items-center justify-center group"
            >
              {t('hero.searchBtn')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex items-center space-x-12"
          >
            <div>
              <p className="text-3xl font-display font-bold text-white">$500M+</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Sales Volume</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-3xl font-display font-bold text-white">15+</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Years Experience</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-3xl font-display font-bold text-white">100%</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Client Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
