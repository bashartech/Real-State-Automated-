import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  
  const stats = [
    { icon: <Award className="text-red-600" />, label: t('about.stats.volume'), value: '$500M+' },
    { icon: <Users className="text-red-600" />, label: t('about.stats.satisfaction'), value: '1,200+' },
    { icon: <Clock className="text-red-600" />, label: t('about.stats.experience'), value: '15+' },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Scott J. Realtor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-600 rounded-3xl -z-0 hidden md:block" />
            <div className="absolute -top-10 -left-10 w-40 h-40 border-8 border-gray-100 rounded-full -z-0" />
            
            <div className="absolute bottom-8 left-8 right-8 glass-morphism p-6 rounded-2xl shadow-xl">
              <p className="text-luxury-black font-display font-bold text-xl mb-1">Scott J. Realtor</p>
              <p className="text-red-600 font-bold text-xs uppercase tracking-widest">Founder & Lead Agent</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {t('about.tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-luxury-black mb-8 leading-tight">
              {t('about.title')} <br />
              <span className="text-red-600">{t('about.titleAccent')}</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {t('about.desc1')} {t('about.desc2')}
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                'Hyper-local neighborhood expertise',
                'Advanced digital marketing strategies',
                'Exclusive off-market listing access',
                'Seamless end-to-end transaction management'
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="text-red-600" size={20} />
                  <span className="text-luxury-black font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="mb-2">{stat.icon}</div>
                  <p className="text-2xl font-display font-bold text-luxury-black">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
