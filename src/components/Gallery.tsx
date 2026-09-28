/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
}

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Signature Haircut & Design",
      category: "Haircuts",
      src: "/src/assets/images/service_haircut_1790594864476.jpg"
    },
    {
      id: 2,
      title: "Luxury Skin Rejuvenation Facial",
      category: "Facial Treatment",
      src: "/src/assets/images/service_facial_1790594877862.jpg"
    },
    {
      id: 3,
      title: "Precision Beard Grooming & Outlining",
      category: "Beard Grooming",
      src: "/src/assets/images/service_grooming_1790594891403.jpg"
    },
    {
      id: 4,
      title: "Premium Barbershop Interior Atmosphere",
      category: "Salon Interior",
      src: "/src/assets/images/hero_bg_1790594846820.jpg"
    },
    {
      id: 5,
      title: "Artistic Modern Hair Styling",
      category: "Hair Styling",
      src: "/src/assets/images/service_haircut_1790594864476.jpg" // Reusing generated masterpiece
    },
    {
      id: 6,
      title: "Invigorating Scalp & Face Treatment",
      category: "Facial Treatment",
      src: "/src/assets/images/service_facial_1790594877862.jpg" // Reusing generated masterpiece
    }
  ];

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % galleryItems.length);
  };

  return (
    <section id="gallery" className="relative bg-dark-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
            Visual Experience
          </span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-widest text-[#FFFFFF] sm:text-4xl">
            SALON GALLERY
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#9CA3AF]">
            A glimpse into the premium grooming sessions at King Hair Saloon. Explore our high-standards of haircutting, beard detailing, and facial therapies in Anantnag.
          </p>
        </div>

        {/* Grid Display */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative aspect-square overflow-hidden border border-dark-800 bg-dark-950 cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-dark-950/90 via-dark-950/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                  {item.category}
                </span>
                <h3 className="mt-1 font-serif text-base font-bold tracking-wider text-white">
                  {item.title}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#FFFFFF]">
                  <Maximize2 className="h-3 w-3 text-gold-500" />
                  <span className="uppercase tracking-widest text-[10px] font-semibold">View Close-up</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/95 backdrop-blur-sm p-4 animate-fade-in">
          
          {/* Close Action Area */}
          <div className="absolute inset-0 cursor-default" onClick={handleCloseLightbox} />

          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 z-[110] p-2 text-[#9CA3AF] hover:text-[#FFFFFF] focus:outline-none bg-dark-900 border border-dark-800 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Slider Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-[110] p-2.5 text-[#9CA3AF] hover:text-[#FFFFFF] focus:outline-none bg-dark-900/50 hover:bg-dark-900 border border-dark-800/50 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 z-[110] p-2.5 text-[#9CA3AF] hover:text-[#FFFFFF] focus:outline-none bg-dark-900/50 hover:bg-dark-900 border border-dark-800/50 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Core Content Box */}
          <div className="relative max-h-[85vh] max-w-[90vw] overflow-hidden flex flex-col items-center">
            <img
              src={galleryItems[selectedImageIndex].src}
              alt={galleryItems[selectedImageIndex].title}
              className="max-h-[75vh] max-w-[85vw] object-contain border border-dark-800 bg-black shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Descriptive Caption Card */}
            <div className="mt-4 text-center max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                {galleryItems[selectedImageIndex].category}
              </span>
              <h4 className="font-serif text-lg font-bold tracking-wider text-white mt-1">
                {galleryItems[selectedImageIndex].title}
              </h4>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
