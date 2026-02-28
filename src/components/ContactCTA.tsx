import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Home, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-luxury-black rounded-[3rem] overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20">
              <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
                Ready to Move?
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8 leading-tight">
                Let's Find Your <br />
                <span className="text-red-600">Perfect Place.</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 max-w-md">
                Whether you're buying, selling, or just exploring your options, our team is here to provide expert guidance every step of the way.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact"
                  className="bg-red-600 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-all flex items-center justify-center group"
                >
                  {t('common.schedule')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link 
                  to="/listings"
                  className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  {t('common.viewAll')}
                </Link>
              </div>
            </div>

            <div className="bg-red-600 p-12 md:p-20 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                  <Calendar className="text-white mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-white font-bold text-xl mb-2">Book a Call</h4>
                  <p className="text-white/70 text-sm">Schedule a 15-min discovery call with Scott.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                  <Home className="text-white mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-white font-bold text-xl mb-2">{t('common.getValuation')}</h4>
                  <p className="text-white/70 text-sm">Get an instant estimate of your home's value.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                  <TrendingUp className="text-white mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-white font-bold text-xl mb-2">Market Report</h4>
                  <p className="text-white/70 text-sm">Receive monthly San Antonio market updates.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2">Join Newsletter</h4>
                  <p className="text-white/70 text-sm">Stay informed with exclusive off-market deals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
