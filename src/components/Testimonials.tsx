import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export default function Testimonials() {
  return (
    <section className="py-24 bg-luxury-black text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
            What Our <span className="text-red-600">Clients Say</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our commitment to excellence is reflected in the success of our clients. Hear from those who have experienced the Scott J. difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 p-10 rounded-3xl relative"
            >
              <Quote className="absolute top-8 right-8 text-red-600/20" size={60} />
              
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-red-600 text-red-600" />
                ))}
              </div>

              <p className="text-xl text-white/90 mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-red-600"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-widest text-white/50 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="User"
                className="w-12 h-12 rounded-full border-4 border-luxury-black"
                referrerPolicy="no-referrer"
              />
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-luxury-black bg-red-600 flex items-center justify-center text-[10px] font-bold">
              +500
            </div>
          </div>
          <p className="ml-6 flex items-center text-sm font-medium text-white/80">
            Join 1,200+ satisfied homeowners in San Antonio
          </p>
        </div>
      </div>
    </section>
  );
}
