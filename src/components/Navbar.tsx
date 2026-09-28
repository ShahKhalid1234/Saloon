/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Scissors, Calendar } from 'lucide-react';
import { SALON_CONFIG } from '../config/salonConfig';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
}

export default function Navbar({ onNavigate, activeSection, onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Book Now', id: 'book-appointment' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-800 bg-dark-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single typography wordmark */}
        <button 
          onClick={() => handleLinkClick('home')}
          className="group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <Scissors className="h-5 w-5 text-gold-500 transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-serif text-lg font-bold tracking-widest text-[#FFFFFF] transition-colors duration-200 group-hover:text-gold-400 sm:text-xl">
            KING HAIR SALOON
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative cursor-pointer py-1 text-xs uppercase tracking-widest transition-colors duration-200 focus:outline-none hover:text-gold-500 ${
                activeSection === link.id ? 'text-gold-400 font-semibold' : 'text-[#9CA3AF]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gold-500" />
              )}
            </button>
          ))}
          {/* Admin link inside navigation strictly as a simple text label */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenAdmin();
            }}
            className="text-xs uppercase tracking-widest text-[#6B7280] hover:text-gold-500 transition-colors cursor-pointer"
          >
            Admin
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleLinkClick('book-appointment')}
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-gold-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-dark-950 transition-all duration-300 hover:bg-gold-400 active:scale-95 cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Hamburger Toggle (Mobile) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#9CA3AF] hover:text-[#FFFFFF] focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Aggregate height under 15% sticky constraint when interactive) */}
      {isOpen && (
        <div className="border-t border-dark-800 bg-dark-900 md:hidden animate-fade-in">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full py-2.5 text-left text-sm font-medium uppercase tracking-wider transition-colors duration-150 ${
                  activeSection === link.id ? 'text-gold-400' : 'text-[#9CA3AF]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAdmin();
              }}
              className="block w-full py-2.5 text-left text-sm font-medium uppercase tracking-wider text-[#6B7280] hover:text-gold-400"
            >
              Salon Admin Dashboard
            </button>
            <div className="pt-4">
              <button
                onClick={() => handleLinkClick('book-appointment')}
                className="flex w-full items-center justify-center gap-2 bg-gold-500 py-3 text-xs font-bold uppercase tracking-widest text-dark-950"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
