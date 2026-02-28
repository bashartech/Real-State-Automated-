import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PROPERTIES } from '../constants';
import {
  Bed, Bath, Square, MapPin, Calendar,
  ArrowLeft, Share2, Heart, CheckCircle2,
  Phone, Mail, MessageSquare, ChevronRight, Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { submitPropertyInquiry } from '../lib/sanity';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInquiryForm({
      ...inquiryForm,
      [e.target.name]: e.target.value
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitPropertyInquiry({
        ...inquiryForm,
        propertyId: property.id,
        propertyTitle: property.title,
        propertyPrice: property.price
      });
      setSubmitStatus('success');
      setInquiryForm({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!property) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Property Not Found</h2>
        <Link to="/listings" className="text-red-600 font-bold uppercase tracking-widest hover:underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{property.title} | Scott J. Realtor Group</title>
        <meta name="description" content={property.description} />
      </Helmet>

      <div className="pt-24 pb-24 bg-white">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link to="/listings" className="flex items-center text-gray-500 hover:text-red-600 transition-colors font-bold uppercase tracking-widest text-xs">
            <ArrowLeft size={16} className="mr-2" />
            Back to Listings
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
              <Heart size={18} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px] md:h-[600px]">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden relative">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 flex space-x-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeImage === i ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-4">
              {property.images.slice(1, 3).map((img, i) => (
                <div key={i} className="rounded-3xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${property.title} ${i + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-red-600/10 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                    {property.status}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-luxury-black text-white text-[10px] font-bold uppercase tracking-widest">
                    {property.type}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-extrabold text-luxury-black mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-500 text-lg">
                  <MapPin size={20} className="mr-2 text-red-600" />
                  {property.address}, {property.city}, {property.state} {property.zip}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100 mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-red-600">
                    <Bed size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-luxury-black">{property.beds}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-red-600">
                    <Bath size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-luxury-black">{property.baths}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-red-600">
                    <Square size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-luxury-black">{property.sqft.toLocaleString()}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sq Ft</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-red-600">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-luxury-black">{property.yearBuilt}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Year Built</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h3 className="text-2xl font-display font-bold text-luxury-black mb-6">About This Property</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {property.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl">
                      <CheckCircle2 className="text-red-600" size={20} />
                      <span className="font-medium text-luxury-black">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhood */}
              <div className="mb-12">
                <h3 className="text-2xl font-display font-bold text-luxury-black mb-6">Location & Neighborhood</h3>
                <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-home+ff0000(-98.4936,29.4241)/-98.4936,29.4241,12/800x400?access_token=placeholder`}
                    alt="Map Placeholder"
                    className="w-full h-full object-cover opacity-50 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-xs">
                      <MapPin className="text-red-600 mx-auto mb-3" size={32} />
                      <p className="font-bold text-luxury-black mb-1">{property.neighborhood}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">San Antonio, TX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-white rounded-3xl luxury-shadow border border-gray-100 p-8 mb-8">
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Price</p>
                  <p className="text-4xl font-display font-extrabold text-luxury-black mb-8">
                    ${property.price.toLocaleString()}
                  </p>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2"
                    >
                      <CheckCircle2 className="text-green-600" size={20} />
                      <p className="text-green-800 text-sm font-medium">Inquiry sent successfully!</p>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"
                    >
                      <MessageSquare className="text-red-600" size={20} />
                      <p className="text-red-800 text-sm font-medium">Failed to send. Please try again.</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      value={inquiryForm.fullName}
                      onChange={handleInquiryChange}
                      placeholder="Full Name"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      value={inquiryForm.email}
                      onChange={handleInquiryChange}
                      placeholder="Email Address"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 transition-colors"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={inquiryForm.phone}
                      onChange={handleInquiryChange}
                      placeholder="Phone Number"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 transition-colors"
                    />
                    <textarea
                      name="message"
                      value={inquiryForm.message}
                      onChange={handleInquiryChange}
                      placeholder="I'm interested in this property..."
                      rows={4}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 transition-colors resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-luxury-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? 'Sending...' : 'Inquire Now'}
                      {!isSubmitting && <Send className="ml-2" size={16} />}
                    </button>
                  </form>
                </div>

                {/* Agent Card */}
                <div className="bg-luxury-black rounded-3xl p-8 text-white">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Scott J."
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-lg">Scott J. Realtor</p>
                      <p className="text-xs uppercase tracking-widest text-white/50">Lead Agent</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <a href="tel:2103849434" className="flex items-center space-x-3 text-white/80 hover:text-red-600 transition-colors">
                      <Phone size={18} />
                      <span className="font-medium">210.384.9434</span>
                    </a>
                    <a href="mailto:scott@scottjrealtor.com" className="flex items-center space-x-3 text-white/80 hover:text-red-600 transition-colors">
                      <Mail size={18} />
                      <span className="font-medium">scott@scottjrealtor.com</span>
                    </a>
                  </div>
                  <button className="w-full mt-6 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all flex items-center justify-center">
                    <MessageSquare size={16} className="mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
