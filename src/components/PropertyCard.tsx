import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Property } from '../types';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  key?: string | number;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden luxury-shadow border border-gray-100"
    >
      <Link to={`/property/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            property.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
          }`}>
            {property.status}
          </span>
          {property.type === 'Luxury' && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-luxury-black text-white">
              Luxury
            </span>
          )}
        </div>
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-red-600 transition-colors">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-2xl font-display font-bold text-white">
            ${property.price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-luxury-black mb-1 group-hover:text-red-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin size={14} className="mr-1" />
              <span className="line-clamp-1">{property.address}, {property.city}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-luxury-black font-bold">
              <Bed size={16} className="mr-1.5 text-red-600" />
              {property.beds}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Beds</span>
          </div>
          <div className="flex flex-col items-center border-x border-gray-100">
            <div className="flex items-center text-luxury-black font-bold">
              <Bath size={16} className="mr-1.5 text-red-600" />
              {property.baths}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-luxury-black font-bold">
              <Square size={16} className="mr-1.5 text-red-600" />
              {property.sqft.toLocaleString()}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Sqft</span>
          </div>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="mt-4 w-full block text-center py-3 rounded-xl border border-gray-200 text-sm font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
