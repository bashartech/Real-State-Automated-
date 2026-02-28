import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome, CheckCircle, AlertCircle } from 'lucide-react';
import { registerNewUser, saveCurrentUser } from '../lib/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.terms) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await registerNewUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        registrationType: 'email'
      });

      // Save user to localStorage
      saveCurrentUser({
        _id: user._id,
        fullName: formData.fullName,
        email: formData.email
      });

      setSuccess(true);

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      console.error('Error registering user:', error);
      if (error.message === 'Email already registered') {
        setError('This email is already registered. Please login instead.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignup = (provider: 'google' | 'github') => {
    // OAuth integration placeholder
    const clientId = provider === 'google'
      ? import.meta.env.VITE_GOOGLE_CLIENT_ID
      : import.meta.env.VITE_GITHUB_CLIENT_ID;

    if (!clientId) {
      setError(`${provider === 'google' ? 'Google' : 'GitHub'} OAuth is not configured. Please add credentials to .env file.`);
      return;
    }

    // In production, redirect to OAuth provider
    alert(`${provider === 'google' ? 'Google' : 'GitHub'} OAuth will be implemented here.\n\nAdd your OAuth credentials to .env file:\nVITE_GOOGLE_CLIENT_ID=your_client_id\nVITE_GITHUB_CLIENT_ID=your_client_id`);
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <img 
                src="https://storage.googleapis.com/aistudio-user-uploads-asia-southeast1/125187848896/f5qul5oup7irzbiqhnrp46/logo_0.png" 
                alt="Scott J. Realtor Group" 
                className="h-10 w-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
            <h2 className="text-3xl font-display font-extrabold text-luxury-black">{t('signup.title')}</h2>
            <p className="mt-2 text-sm text-gray-500">
              {t('signup.subtitle')}{' '}
              <Link to="/login" className="font-bold text-red-600 hover:text-luxury-black transition-colors">
                {t('signup.signInLink')}
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
              >
                <CheckCircle className="text-green-600" size={24} />
                <p className="text-green-800 font-medium">{t('signup.success')}</p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="text-red-600" size={24} />
                <p className="text-red-800 font-medium">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t('signup.fullName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t('signup.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t('signup.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{t('signup.passwordHint')}</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t('signup.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-luxury-black outline-none focus:border-red-600 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-500">
                    {t('signup.terms')}{' '}
                    <a href="#" className="font-bold text-red-600 hover:text-luxury-black transition-colors">
                      {t('signup.termsLink')}
                    </a>{' '}
                    {t('signup.and')}{' '}
                    <a href="#" className="font-bold text-red-600 hover:text-luxury-black transition-colors">
                      {t('signup.privacyLink')}
                    </a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-luxury-black transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('signup.creating') : t('signup.createAccount')}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 uppercase tracking-widest text-[10px] font-bold">{t('signup.orContinue')}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleOAuthSignup('google')}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  <Chrome className="h-5 w-5 mr-2" />
                  {t('signup.google')}
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthSignup('github')}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  <Github className="h-5 w-5 mr-2" />
                  {t('signup.github')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600607687940-c52af096999c?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Exterior"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-luxury-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <div className="max-w-xl">
            <h2 className="text-5xl font-display font-extrabold text-white mb-6 leading-tight">
              {t('signup.heroTitle')} <br />
              <span className="text-red-600">{t('signup.heroTitleAccent')}</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              {t('signup.heroSubtitle')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
