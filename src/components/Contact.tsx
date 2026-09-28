/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Clock, Compass, PhoneCall, Calendar } from 'lucide-react';
import { SALON_CONFIG } from '../config/salonConfig';

interface ContactProps {
  onBookClick: () => void;
}

export default function Contact({ onBookClick }: ContactProps) {
  
  // Custom dialer function
  const handleCall = () => {
    window.location.href = `tel:${SALON_CONFIG.phone}`;
  };

  // Maps router
  const handleDirections = () => {
    window.open(SALON_CONFIG.googleMapsUrl, '_blank');
  };

  return (
    <section id="contact" className="relative bg-dark-900 py-24 sm:py-32 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
            Hours & Location
          </span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-widest text-[#FFFFFF] sm:text-4xl">
            VISIT KING HAIR SALOON
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#9CA3AF]">
            We are located in Anantnag, Jammu & Kashmir. Walk in or reserve your slot in advance for the best grooming experience.
          </p>
        </div>

        {/* Info Grid - 60-30-10 Layout Discipline */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          
          {/* Card 1: Location */}
          <div className="border border-dark-800 bg-dark-950 p-8 text-center flex flex-col items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center bg-gold-500/10 text-gold-500 mb-6">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold tracking-wider text-white">
                OUR SALON ADDRESS
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF] max-w-xs mx-auto">
                {SALON_CONFIG.fullAddress}
              </p>
              <p className="mt-1 text-[11px] text-gold-400 font-semibold uppercase tracking-widest">
                📍 Anantnag, Jammu & Kashmir
              </p>
            </div>
            <div className="mt-6 w-full">
              <button
                onClick={handleDirections}
                className="inline-flex w-full items-center justify-center gap-2 bg-dark-900 border border-dark-800 hover:border-gold-500/30 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 cursor-pointer"
              >
                <Compass className="h-3.5 w-3.5 text-gold-500" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          {/* Card 2: Contact Numbers */}
          <div className="border border-dark-800 bg-dark-950 p-8 text-center flex flex-col items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center bg-gold-500/10 text-gold-500 mb-6">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold tracking-wider text-white">
                CALL OR REACH OUT
              </h3>
              <p className="mt-3 text-xs text-[#9CA3AF]">
                Have a special request or wish to inquire about pricing details?
              </p>
              <p className="mt-2 font-mono text-base font-bold tracking-wider text-gold-400">
                {SALON_CONFIG.phone}
              </p>
            </div>
            <div className="mt-6 w-full">
              <button
                onClick={handleCall}
                className="inline-flex w-full items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 py-3 text-xs font-bold uppercase tracking-widest text-dark-950 transition-all duration-300 cursor-pointer"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Call Now</span>
              </button>
            </div>
          </div>

          {/* Card 3: Opening Hours */}
          <div className="border border-dark-800 bg-dark-950 p-8 text-center flex flex-col items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center bg-gold-500/10 text-gold-500 mb-6">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold tracking-wider text-white">
                OPENING HOURS
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF] max-w-xs mx-auto">
                We are open 7 days a week to ensure you always look your best.
              </p>
              <p className="mt-2 font-serif text-xs font-semibold text-gold-400 tracking-wider">
                {SALON_CONFIG.openingHours}
              </p>
            </div>
            <div className="mt-6 w-full">
              <button
                onClick={onBookClick}
                className="inline-flex w-full items-center justify-center gap-2 bg-dark-900 border border-dark-800 hover:border-gold-500/30 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5 text-gold-500" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

        </div>

        {/* Embedded Interactive Map Placeholder visual - Premium look */}
        <div className="mt-12 overflow-hidden border border-dark-800 bg-dark-950 p-2.5">
          <div className="relative h-[250px] w-full bg-dark-900 flex items-center justify-center text-center p-6">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/src/assets/images/hero_bg_1790594846820.jpg')" }} />
            <div className="relative z-10 max-w-md">
              <MapPin className="mx-auto h-8 w-8 text-gold-500 mb-2" />
              <h4 className="font-serif text-sm font-bold tracking-wider text-white">📍 ANANTNAG TOWN OFFICE PORTAL</h4>
              <p className="text-[11px] text-[#9CA3AF] mt-1.5 leading-relaxed">
                King Hair Saloon is located in the bustling Main Market district of Anantnag, Jammu & Kashmir. Highly accessible on foot or by local transportation.
              </p>
              <button
                onClick={handleDirections}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 tracking-wider uppercase font-semibold cursor-pointer"
              >
                <span>Navigate via Google Maps</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
