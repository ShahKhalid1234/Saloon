/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, ArrowRight, DollarSign } from 'lucide-react';
import { SALON_CONFIG, ServiceItem } from '../config/salonConfig';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Hair' | 'Skin' | 'Grooming'>('All');

  const categories: ('All' | 'Hair' | 'Skin' | 'Grooming')[] = ['All', 'Hair', 'Skin', 'Grooming'];

  const filteredServices = SALON_CONFIG.services.filter(service => {
    if (activeFilter === 'All') return true;
    return service.category === activeFilter;
  });

  return (
    <section id="services" className="relative bg-dark-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
            Artistry & Care
          </span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-widest text-[#FFFFFF] sm:text-4xl lg:text-5xl">
            OUR SERVICES
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#9CA3AF]">
            At King Hair Saloon, we offer a comprehensive suite of men’s grooming services. Experience professional hair design, relaxing facials, and premium styling from Anantnag’s masters of the craft.
          </p>
        </div>

        {/* Category Filters (Segmented Controls) */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gold-500 text-dark-950 font-bold'
                  : 'bg-dark-800 text-[#9CA3AF] hover:text-white hover:bg-dark-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            return (
              <div
                key={service.id}
                className="group flex flex-col overflow-hidden border border-dark-800 bg-dark-950 transition-all duration-300 hover:border-gold-500/30"
              >
                {/* Service Image with Error Fallback Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-900">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback in case of any loading issues
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = document.getElementById(`fallback-${service.id}`);
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  {/* Styled CSS/SVG Fallback Container */}
                  <div
                    id={`fallback-${service.id}`}
                    className="hidden absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-dark-900 to-dark-950 p-6 text-center"
                  >
                    <Sparkles className="h-10 w-10 text-gold-500 mb-2" />
                    <span className="font-serif text-lg font-bold tracking-wider text-white">{service.name}</span>
                    <span className="text-xs text-gold-400 mt-1">King Hair Saloon Premium Service</span>
                  </div>
                  
                  {/* Category Micro-Label */}
                  <span className="absolute top-4 left-4 bg-dark-950/80 border border-[#FFFFFF]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFFFFF]">
                    {service.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Header & Pricing */}
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-bold tracking-wider text-white transition-colors duration-300 group-hover:text-gold-400">
                      {service.name}
                    </h3>
                    <div className="flex items-center text-gold-400 font-mono text-base font-semibold">
                      <span>₹{service.startingPrice}</span>
                      <span className="ml-1 text-[10px] text-[#9CA3AF] font-sans font-normal uppercase">onwards</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF]">
                    {service.description}
                  </p>

                  {/* Highlights (Zero-Pill Discipline: Rendered as clean, unboxed typography list) */}
                  <div className="mt-4 pt-4 border-t border-dark-800">
                    <ul className="space-y-1.5">
                      {service.features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="h-1.5 w-1.5 bg-gold-500 rounded-full shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Trigger CTA */}
                  <div className="mt-auto pt-6">
                    <button
                      onClick={() => onSelectService(service.name)}
                      className="inline-flex w-full items-center justify-center gap-2 bg-dark-900 border border-dark-800 py-3 text-xs font-bold uppercase tracking-widest text-[#FFFFFF] transition-all duration-300 hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 active:scale-95 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
