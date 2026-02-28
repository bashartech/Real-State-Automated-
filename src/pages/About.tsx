import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Users, Clock, CheckCircle2, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>About Us | Scott J. Realtor Group</title>
        <meta name="description" content="Learn about Scott J. Realtor Group, the premier real estate team in San Antonio. Discover our mission, values, and track record." />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                {t('aboutPage.tag')}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-luxury-black mb-8 leading-tight">
                {t('aboutPage.title')} <br />
                <span className="text-red-600">{t('aboutPage.titleAccent')}</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t('aboutPage.subtitle')}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      alt="Team Member"
                      className="w-12 h-12 rounded-full border-4 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-luxury-black uppercase tracking-widest">
                  {t('aboutPage.team')}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden aspect-[4/5] luxury-shadow">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                  alt="Scott J. Realtor"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-red-600 p-10 rounded-[2rem] text-white shadow-2xl hidden md:block">
                <p className="text-4xl font-display font-black mb-1">15+</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">{t('aboutPage.years')}</p>
              </div>
            </motion.div>
          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
            {[
              { title: t('aboutPage.mission'), desc: t('aboutPage.missionDesc') },
              { title: t('aboutPage.vision'), desc: t('aboutPage.visionDesc') },
              { title: t('aboutPage.values'), desc: t('aboutPage.valuesDesc') }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-2xl font-display font-bold text-luxury-black mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Detailed Bio Section */}
          <div className="bg-luxury-black rounded-[3rem] p-12 md:p-20 text-white mb-32">
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8">{t('aboutPage.meetScott')} <span className="text-red-600">{t('aboutPage.scottName')}</span></h2>
              <div className="space-y-6 text-white/70 text-lg leading-relaxed mb-12">
                <p>
                  As the founder and lead agent of the Scott J. Realtor Group, Scott has spent over a decade mastering the San Antonio real estate landscape. His background in finance and marketing provides a unique advantage for his clients, allowing him to navigate complex negotiations and develop high-impact marketing campaigns.
                </p>
                <p>
                  Scott is consistently ranked among the top 1% of agents in San Antonio and has been recognized by the San Antonio Business Journal for his outstanding sales volume and client satisfaction ratings.
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <a href="tel:2103849434" className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all">
                  <Phone size={20} className="text-red-600" />
                  <span className="font-bold uppercase tracking-widest text-xs">210.384.9434</span>
                </a>
                <a href="mailto:scott@scottjrealtor.com" className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all">
                  <Mail size={20} className="text-red-600" />
                  <span className="font-bold uppercase tracking-widest text-xs">scott@scottjrealtor.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
