import { Property, Testimonial } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '2',
    title: 'Elegant Hill Country Estate',
    price: 895000,
    address: '128 Fairway Ridge',
    city: 'Boerne',
    state: 'TX',
    zip: '78006',
    beds: 4,
    baths: 3.5,
    sqft: 3500,
    type: 'Single Family',
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled on a quiet cul-de-sac, this Boerne beauty offers breathtaking views of the Texas Hill Country. Open floor plan with vaulted ceilings and custom woodwork throughout.',
    features: ['Hill Country Views', 'Vaulted Ceilings', 'Three-Car Garage', 'Media Room'],
    neighborhood: 'Fair Oaks Ranch',
    yearBuilt: 2018,
    lotSize: '1.2 Acres'
  },
  {
    id: '3',
    title: 'Chic Downtown Penthouse',
    price: 675000,
    address: '300 Convent St #2201',
    city: 'San Antonio',
    state: 'TX',
    zip: '78205',
    beds: 2,
    baths: 2,
    sqft: 1800,
    type: 'Condo',
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Urban living at its finest. This penthouse unit offers panoramic views of the San Antonio skyline, high-end finishes, and access to premium building amenities including a rooftop pool and fitness center.',
    features: ['Skyline Views', 'Rooftop Pool', '24/7 Concierge', 'Fitness Center'],
    neighborhood: 'Downtown',
    yearBuilt: 2015,
    lotSize: 'N/A'
  },
  {
    id: '4',
    title: 'Classic Suburban Charm',
    price: 450000,
    address: '8814 Timber Hawk',
    city: 'San Antonio',
    state: 'TX',
    zip: '78250',
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    type: 'Single Family',
    status: 'Pending',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Beautifully maintained family home in a sought-after neighborhood. Spacious backyard, updated kitchen, and excellent school district.',
    features: ['Large Backyard', 'Updated Kitchen', 'Fireplace', 'Walk-in Closets'],
    neighborhood: 'Great Northwest',
    yearBuilt: 1995,
    lotSize: '0.25 Acres'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Michael Thompson',
    role: 'Home Buyers',
    content: 'Scott and his team made our first home buying experience incredibly smooth. Their knowledge of the San Antonio market is unmatched. We found our dream home in less than a month!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: '2',
    name: 'David Rodriguez',
    role: 'Home Seller',
    content: 'Professionalism at its best. The marketing strategy for my property was top-notch, leading to multiple offers within the first week. Highly recommend the Scott J. Realtor Group.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80'
  }
];

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'Neighborhoods', href: '/neighborhoods' },
  { name: 'Sell', href: '/sell' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];
