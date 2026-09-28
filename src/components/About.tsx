/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scissors, Sparkles, MapPin, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SALON_CONFIG } from '../config/salonConfig';

export default function About() {
  const features = [
    {
      icon: <Scissors className="h-5 w-5 text-gold-500" />,
      title: "Professional Haircuts",
      desc: "Precision haircuts tailored individually to your head shape, facial features, and styling goals."
    },
    {
      icon: <Sparkles className="h-5 w-5 text-gold-500" />,
      title: "Modern Styling",
      desc: "Expert application of premium wax, blowouts, and trends for daily wear or grand local festivities."
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-gold-500" />,
      title: "Facial & Grooming",
      desc: "Deep skin cleaning, rejuvenation masks, and refreshing shaving treatments designed for ultimate relaxation."
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-gold-500" />,
      title: "Quality Service",
      desc: "Using professional, hygienic products and sterilized tools to ensure a safe, high-end environment."
    },
    {
      icon: <MapPin className="h-5 w-5 text-gold-500" />,
      title: "Anantnag Location",
      desc: "Conveniently situated in the heart of Anantnag, offering local citizens easy access and a pristine atmosphere."
    },
    {
      icon: <Calendar className="h-5 w-5 text-gold-500" />,
      title: "Easy Appointment Booking",
      desc: "Seamless online or mobile reservations with immediate local configuration and clear confirmations."
    }
  ];

  return (
    <section id="about" className="relative bg-dark-950 py-24 sm:py-32">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 left-0 h-[250px] w-full bg-gradient-to-b from-dark-900 to-transparent opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* About Section Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Brand Story */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
              Our Philosophy
            </span>
            <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-widest text-white sm:text-4xl">
              ABOUT KING HAIR SALOON
            </h2>
            <div className="mt-4 h-[1px] w-16 bg-gold-500" />
            
            <p className="mt-6 text-sm leading-relaxed text-[#9CA3AF]">
              King Hair Saloon is a premier local grooming destination in Anantnag, Jammu & Kashmir, offering expert hair design, custom beard trimming, and restorative facial skin treatments. Our single, clear mission is to provide every client with a meticulously clean, comfortable, and highly professional grooming experience.
            </p>
            
            <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF]">
              We believe grooming is not just a routine, but a form of self-expression. We take pride in helping the men of Anantnag feel sharp, confident, and refreshed, combining classic craftsmanship with contemporary style trends under a highly welcoming local roof.
            </p>

            {/* Quick Contact Highlight */}
            <div className="mt-8 border-l-2 border-gold-500 pl-4">
              <span className="block font-serif text-xs uppercase tracking-wider text-gold-400">Located in</span>
              <span className="block font-serif text-lg font-bold tracking-wide text-white">{SALON_CONFIG.location}</span>
            </div>
          </div>

          {/* Right Column: Decorative Visual Design Detail representing craftsmanship */}
          <div className="relative flex flex-col justify-center border border-dark-800 bg-dark-900 p-8 sm:p-12">
            <span className="font-serif text-lg font-bold uppercase tracking-wider text-white">
              The King’s Standard
            </span>
            <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF]">
              To maintain an unmatched local reputation, we practice rigorous sanitation, precise alignment, and use only tested, top-shelf grooming formulations. Every visit is designed to make you feel like royalty.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gold-500" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white">Daily Hygiene Checks</span>
                  <span className="text-[11px] text-[#6B7280]">All styling clippers, shears, and towels are sanitized prior to client contact.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gold-500" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white">Comfortable Lounge</span>
                  <span className="text-[11px] text-[#6B7280]">Enjoy relaxed seating, light air conditioning, and professional grooming consultation.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section Segment: Why Choose Us Feature Cards */}
        <div className="mt-24 pt-16 border-t border-dark-800">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
              Why Choose Us
            </span>
            <h3 className="mt-2 font-serif text-2xl font-extrabold tracking-widest text-white sm:text-3xl">
              CRAFTED FOR CONFIDENCE
            </h3>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, index) => (
              <div
                key={index}
                className="flex flex-col border border-dark-800 bg-dark-900 p-6 transition-all duration-300 hover:border-gold-500/10 hover:bg-dark-900/60"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-dark-950 border border-dark-800">
                  {feat.icon}
                </div>
                <h4 className="font-serif text-sm font-bold tracking-wider text-white">
                  {feat.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
