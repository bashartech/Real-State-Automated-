import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, ChevronDown, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../translations';
import { getCurrentUser, logoutUser, isAuthenticated } from '../lib/auth';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const authenticated = isAuthenticated();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsUserMenuOpen(false);
    navigate('/');
    window.location.reload(); // Refresh to update UI
  };

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ',
        isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6 group">
            <div className="flex items-center space-x-4 ">
              <img 
                src="https://dims.web.production.kw-prod.brightspot.cloud/dims4/default/7ce5add/2147483647/strip/true/crop/2880x886+0+0/resize/400x123!/quality/90/?url=https%3A%2F%2Fstorage.googleapis.com%2Fattachment-prod-e2ad%2F191055%2Fd60hl11beopc70ni220g.png" 
                alt="Scott J. Realtor Group" 
                className={cn(
                  "h-10 w-auto transition-all duration-300",
                  // isScrolled ? "brightness-100" : "brightness-0 invert"
                )}
                referrerPolicy="no-referrer"
              />
              <div className={cn(
                "w-px h-8 transition-colors",
                // isScrolled ? "bg-gray-200" : "bg-white/20"
              )} />
              <img 
                src="https://dims.web.production.kw-prod.brightspot.cloud/dims4/default/eb7835f/2147483647/strip/true/crop/2722x1721+0+0/resize/400x253!/quality/90/?url=https%3A%2F%2Fstorage.googleapis.com%2Fattachment-prod-e2ad%2F229192%2Fcmkor5cj3bls70lom3vg.png" 
                alt="KW Heritage" 
                className={cn(
                  "h-10 w-auto transition-all duration-300",
                  // isScrolled ? "brightness-100" : "brightness-0 invert"
                )}
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium uppercase tracking-widest transition-all hover:text-red-600 relative py-2',
                  location.pathname === item.href ? 'text-red-600' : (isScrolled ? 'text-luxury-black' : 'text-black'

                  ),
                  'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full',
                  location.pathname === item.href && 'after:w-full'
                )}
              >
                {t(`nav.${item.name.toLowerCase()}`)}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  "flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors",
                  isScrolled ? "text-luxury-black" : "text-white"
                )}
              >
                <span>{currentLang?.flag}</span>
                <ChevronDown size={14} className={cn("transition-transform", isLangOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto px-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-2 rounded-xl text-sm transition-colors",
                            language === lang.code ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <span>{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu / Auth Links */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-8">
              {authenticated && currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={cn(
                      "flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors",
                      isScrolled ? "text-luxury-black hover:text-red-600" : "text-white hover:text-red-600"
                    )}
                  >
                    <User size={16} />
                    <span>{currentUser.fullName?.split(' ')[0] || 'User'}</span>
                    <ChevronDown size={14} className={cn("transition-transform", isUserMenuOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-bold text-luxury-black">{currentUser.fullName}</p>
                          <p className="text-xs text-gray-500">{currentUser.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <LogOut size={16} />
                          <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2",
                    isScrolled ? "text-luxury-black hover:text-red-600" : "text-white hover:text-red-600"
                  )}
                >
                  <User size={16} />
                  <span>{t('nav.login')}</span>
                </Link>
              )}

              <Link
                to="/contact"
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                  isScrolled
                    ? "bg-luxury-black text-white hover:bg-red-600"
                    : "bg-white text-luxury-black hover:bg-red-600 hover:text-white"
                )}
              >
                {t('nav.schedule')}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isScrolled ? "text-luxury-black hover:bg-black/5" : "text-white hover:bg-white/10"
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-[60] lg:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-bottom">
              <span className="text-xl font-display font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl font-display font-medium hover:text-red-600 transition-colors"
                >
                  {t(`nav.${item.name.toLowerCase()}`)}
                </Link>
              ))}
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Select Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-xl text-sm transition-colors",
                        language === lang.code ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 border-t space-y-4">
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl border border-gray-200 text-luxury-black font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                <User size={20} />
                <span>{t('nav.login')}</span>
              </Link>
              <Link 
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full bg-luxury-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center"
              >
                {t('nav.schedule')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
