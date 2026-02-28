import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ListingGrid from '../components/ListingGrid';
import AboutSection from '../components/AboutSection';
import RecentSales from '../components/RecentSales';
import Testimonials from '../components/Testimonials';
import ContactCTA from '../components/ContactCTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Scott J. Realtor Group | Luxury Real Estate San Antonio</title>
        <meta name="description" content="Discover premium real estate in San Antonio with Scott J. Realtor Group. Expert guidance for buying and selling luxury homes." />
      </Helmet>
      
      <main>
        <Hero />
        <AboutSection />
        <ListingGrid />
        <RecentSales />
        <Testimonials />
        <ContactCTA />
      </main>
    </>
  );
}
