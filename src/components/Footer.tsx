import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <img 
                src="https://storage.googleapis.com/aistudio-user-uploads-asia-southeast1/125187848896/f5qul5oup7irzbiqhnrp46/logo_0.png" 
                alt="Scott J. Realtor Group" 
                className="h-10 w-auto"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-xl font-display font-extrabold tracking-tighter text-luxury-black">
                  SCOTT J. <span className="text-red-600">REALTOR</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-charcoal">
                  Group of Option One Real Estate
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {t('footer.about')}
            </p>
            <div className="flex items-center space-x-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-luxury-black font-bold uppercase tracking-widest text-xs mb-8">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Listings', href: '/listings' },
                { name: 'Neighborhoods', href: '/neighborhoods' },
                { name: 'Sell', href: '/sell' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">
                    {t(`nav.${item.name.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-luxury-black font-bold uppercase tracking-widest text-xs mb-8">{t('footer.services')}</h4>
            <ul className="space-y-4">
              <li><Link to="/listings" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">{t('footer.buy')}</Link></li>
              <li><Link to="/sell" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">{t('footer.sell')}</Link></li>
              <li><Link to="/listings" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">{t('footer.invest')}</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">{t('footer.relocation')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-luxury-black font-bold uppercase tracking-widest text-xs mb-8">{t('footer.contact')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-luxury-black mb-1">Office</p>
                  <p className="text-gray-500 text-sm">1717 N Loop 1604 E,<br />San Antonio, TX 78232</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-luxury-black mb-1">Phone</p>
                  <p className="text-gray-500 text-sm">210.384.9434</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-luxury-black mb-1">Email</p>
                  <p className="text-gray-500 text-sm">scott@scottjrealtor.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src="https://storage.googleapis.com/aistudio-user-uploads-asia-southeast1/125187848896/f5qul5oup7irzbiqhnrp46/logo_1.png" 
              alt="KW Heritage" 
              className="h-8 w-auto opacity-50 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Scott J. Realtor Group. All Rights Reserved. 
              <span className="mx-2">|</span> 
              Option One Real Estate
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="#" className="text-gray-400 hover:text-luxury-black text-xs transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-400 hover:text-luxury-black text-xs transition-colors">Terms of Service</Link>
            <Link to="#" className="text-gray-400 hover:text-luxury-black text-xs transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
