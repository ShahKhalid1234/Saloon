/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Calendar, Compass } from 'lucide-react';
import { SALON_CONFIG } from '../config/salonConfig';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden py-24 sm:py-32">
      
      {/* Background Image with Premium Measured Scrim Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_bg_1790594846820.jpg"
          alt={`${SALON_CONFIG.salonName} Premium Interior Backdrop`}
          className="h-full w-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Heavy gradients to ensure WCAG AA typography readability over dynamic imagery */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-dark-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Location Indicator - Styled with clean unboxed text and separator constraint */}
        <div className="mb-6 inline-flex items-center gap-2 bg-dark-900/80 border border-gold-500/20 px-4 py-1.5 backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-gold-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Anantnag, Jammu & Kashmir
          </span>
        </div>

        {/* Brand Main Heading - Large elegant serif typography */}
        <h1 className="font-serif text-5xl font-extrabold uppercase tracking-widest text-[#FFFFFF] sm:text-7xl lg:text-8xl">
          <span className="block text-gold-400 drop-shadow-md">KING HAIR</span>
          <span className="block tracking-wider text-white">SALOON</span>
        </h1>

        {/* Tagline & Subheading */}
        <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic tracking-widest text-gold-200/90 sm:text-xl">
          “{SALON_CONFIG.tagline}”
        </p>

        <h2 className="mx-auto mt-3 max-w-xl text-sm font-medium uppercase tracking-widest text-[#D1D5DB] sm:text-base">
          Premium Hair & Grooming Services in Anantnag
        </h2>

        {/* Core Short Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#9CA3AF] sm:text-base sm:leading-relaxed">
          Look sharp, feel confident. Experience professional hair styling, precision beard trimming, and premium facial treatments tailored specifically for you at Anantnag’s premier grooming destination.
        </p>

        {/* Responsive Hero CTAs - Standard Primary / Secondary Pairing */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => onNavigate('book-appointment')}
            className="flex w-full items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 active:scale-95 px-8 py-4 text-xs font-bold uppercase tracking-widest text-dark-950 transition-all duration-300 sm:w-auto cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Book an Appointment</span>
          </button>
          
          <button
            onClick={() => onNavigate('services')}
            className="flex w-full items-center justify-center gap-2 border border-[#FFFFFF]/20 bg-dark-900/40 hover:bg-dark-900 hover:border-gold-500/40 active:scale-95 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 sm:w-auto cursor-pointer"
          >
            <Compass className="h-4 w-4 text-gold-500" />
            <span>View Services</span>
          </button>
        </div>

      </div>

      {/* Elegant Bottom Border Decorative Line */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
    </section>
  );
}
