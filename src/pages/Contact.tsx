import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitLead } from '../lib/sanity';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Buying a Home',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitLead(formData);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Buying a Home',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');

      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Scott J. Realtor Group</title>
        <meta name="description" content="Get in touch with the Scott J. Realtor Group. We're here to answer your questions and help you with your real estate needs." />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {t('contact.tag')}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-luxury-black mb-6">
              {t('contact.title')} <span className="text-red-600">{t('contact.titleAccent')}</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-xl font-display font-bold text-luxury-black mb-8">{t('contact.details')}</h3>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-600 shadow-sm border border-gray-100">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{t('contact.phone')}</p>
                      <p className="text-luxury-black font-bold">210.384.9434</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-600 shadow-sm border border-gray-100">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{t('contact.email')}</p>
                      <p className="text-luxury-black font-bold">scott@scottjrealtor.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-600 shadow-sm border border-gray-100">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Office</p>
                      <p className="text-luxury-black font-bold">123 Luxury Way, Suite 100<br />San Antonio, TX 78258</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-luxury-black p-10 rounded-[2.5rem] text-white">
                <h3 className="text-xl font-display font-bold mb-6">Office Hours</h3>
                <div className="space-y-4 text-white/60 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white font-bold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white font-bold">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] luxury-shadow border border-gray-100">
                <h3 className="text-2xl font-display font-bold text-luxury-black mb-8">{t('contact.form.title')}</h3>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle className="text-green-600" size={24} />
                    <p className="text-green-800 font-medium">{t('contact.form.success')}</p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3"
                  >
                    <AlertCircle className="text-red-600" size={24} />
                    <p className="text-red-800 font-medium">{t('contact.form.error')}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('contact.form.firstName')}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-luxury-black outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('contact.form.lastName')}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-luxury-black outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-luxury-black outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('contact.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="210.000.0000"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-luxury-black outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('contact.form.subject')}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-luxury-black outline-none focus:border-red-600 transition-colors appearance-none cursor-pointer"
                    >
                      <option>{t('contact.form.subjects.buying')}</option>
                      <option>{t('contact.form.subjects.selling')}</option>
                      <option>{t('contact.form.subjects.investment')}</option>
                      <option>{t('contact.form.subjects.general')}</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('contact.form.message')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-luxury-black outline-none focus:border-red-600 transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-luxury-black transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                      <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
