/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scissors, MapPin, Phone, MessageSquare, Instagram, Globe } from 'lucide-react';
import { SALON_CONFIG } from '../config/salonConfig';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onNavigate, onOpenAdmin }: FooterProps) {
  
  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About Us', id: 'about' },
    { label: 'Appointments', id: 'book-appointment' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <footer className="bg-dark-950 border-t border-dark-800 text-[#9CA3AF]">
      
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <Scissors className="h-5 w-5 text-gold-500" />
              <span className="font-serif text-lg font-bold tracking-widest text-white">
                KING HAIR SALOON
              </span>
            </button>
            <p className="font-serif text-xs italic tracking-wider text-gold-400">
              “{SALON_CONFIG.tagline}”
            </p>
            <p className="text-[11px] leading-relaxed text-[#6B7280]">
              Providing the finest hair, beard, and skin care services in Anantnag. Experience luxury grooming at local comfort.
            </p>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-white">
              QUICK NAVIGATION
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-gold-400 transition-colors cursor-pointer text-[#9CA3AF] text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Col */}
          <div>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-white">
              SALON LOCATION
            </h3>
            <ul className="mt-4 space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#9CA3AF]">
                  {SALON_CONFIG.fullAddress}
                </span>
              </li>
              <li className="text-[10px] uppercase font-bold tracking-widest text-gold-500">
                Anantnag, J&K, India
              </li>
            </ul>
          </div>

          {/* Contact & Socials Col */}
          <div>
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-white">
              CONNECT WITH US
            </h3>
            <ul className="mt-4 space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                <a href={`tel:${SALON_CONFIG.phone}`} className="hover:text-gold-400 font-mono tracking-wide">
                  {SALON_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-[#25D366] shrink-0" />
                <a 
                  href={`https://wa.me/${SALON_CONFIG.whatsappNumber}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-gold-400 font-mono tracking-wide"
                >
                  WhatsApp Booking
                </a>
              </li>
            </ul>

            {/* Social Icons Grid (Zero Pill Badges - simple icon links) */}
            <div className="mt-6 flex items-center gap-4">
              <a 
                href={SALON_CONFIG.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-dark-900 border border-dark-800 text-[#9CA3AF] hover:text-gold-400 hover:border-gold-500/20 transition-all"
                aria-label="Instagram Link"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href={SALON_CONFIG.googleMapsUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-dark-900 border border-dark-800 text-[#9CA3AF] hover:text-gold-400 hover:border-gold-500/20 transition-all"
                aria-label="Google Maps directions"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright & Admin entrance bar */}
      <div className="border-t border-dark-800 bg-dark-950 py-6 text-center text-[10px]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-[#6B7280]">
          
          <p className="tracking-wider">
            &copy; 2026 King Hair Saloon. All Rights Reserved. Designed for premium grooming in Anantnag.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#6B7280] hover:text-gold-500 font-semibold tracking-widest uppercase text-[9px] cursor-pointer"
            >
              Master Admin Login
            </button>
            <span>·</span>
            <span className="uppercase tracking-widest text-[9px]">
              V1.2.0-SECURE
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}
