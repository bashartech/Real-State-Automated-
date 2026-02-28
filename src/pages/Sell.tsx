import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, TrendingUp, DollarSign, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { submitHomeValuation } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';

export default function Sell() {
  const { t } = useLanguage();
  const [valuationForm, setValuationForm] = useState({
    propertyAddress: '',
    city: '',
    zipCode: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuationForm({
      ...valuationForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitHomeValuation(valuationForm);
      setSubmitStatus('success');
      setValuationForm({
        propertyAddress: '',
        city: '',
        zipCode: '',
        email: ''
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting valuation:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Sell Your Home | Scott J. Realtor Group</title>
        <meta name="description" content="Get a free home valuation and learn how Scott J. Realtor Group can help you sell your property for top dollar." />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                {t('sell.tag')}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-luxury-black mb-8 leading-tight">
                {t('sell.title')} <br />
                <span className="text-red-600">{t('sell.titleAccent')}</span>
              </h1>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                {t('sell.subtitle')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600 shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-luxury-black mb-1">{t('sell.marketAnalysis')}</h4>
                    <p className="text-gray-500 text-sm">{t('sell.marketAnalysisDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600 shrink-0">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-luxury-black mb-1">{t('sell.maxExposure')}</h4>
                    <p className="text-gray-500 text-sm">{t('sell.maxExposureDesc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-luxury-black p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <h3 className="text-2xl font-display font-bold text-white mb-8">{t('sell.form.title')}</h3>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 relative z-10"
                >
                  <CheckCircle className="text-green-600" size={24} />
                  <p className="text-green-800 font-medium">{t('sell.form.success')}</p>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 relative z-10"
                >
                  <AlertCircle className="text-red-600" size={24} />
                  <p className="text-red-800 font-medium">{t('sell.form.error')}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">{t('sell.form.address')}</label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={valuationForm.propertyAddress}
                    onChange={handleChange}
                    placeholder="Enter your street address..."
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-red-600 transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">{t('sell.form.city')}</label>
                    <input
                      type="text"
                      name="city"
                      value={valuationForm.city}
                      onChange={handleChange}
                      placeholder="San Antonio"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-red-600 transition-colors placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">{t('sell.form.zip')}</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={valuationForm.zipCode}
                      onChange={handleChange}
                      placeholder="78258"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-red-600 transition-colors placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">{t('sell.form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={valuationForm.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-red-600 transition-colors placeholder:text-white/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('sell.form.submitting') : t('sell.form.submit')}
                  {!isSubmitting && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Process Section */}
          <div className="py-24 border-t border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-luxury-black mb-4">Our Selling <span className="text-red-600">Process</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto">We've refined our process to ensure a stress-free experience and the highest possible return on your investment.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: '01', title: 'Strategic Pricing', desc: 'We analyze current market trends to position your home competitively.' },
                { step: '02', title: 'Premium Marketing', desc: 'Professional photography, 3D tours, and targeted social media campaigns.' },
                { step: '03', title: 'Expert Negotiation', desc: 'We represent your interests to secure the best terms and price.' }
              ].map((item, i) => (
                <div key={i} className="relative p-8 bg-gray-50 rounded-3xl border border-gray-100">
                  <span className="text-6xl font-display font-black text-red-600/10 absolute top-4 right-8">{item.step}</span>
                  <h4 className="text-xl font-bold text-luxury-black mb-4 relative z-10">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
