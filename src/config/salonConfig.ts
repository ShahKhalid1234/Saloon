/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  startingPrice: number;
  image: string;
}

export interface SalonConfiguration {
  salonName: string;
  tagline: string;
  location: string;
  fullAddress: string;
  phone: string;
  whatsappNumber: string; // international format without + (e.g. '910000000000')
  openingHours: string;
  googleMapsUrl: string;
  instagramUrl: string;
  services: ServiceItem[];
}

export const SALON_CONFIG: SalonConfiguration = {
  salonName: "King Hair Saloon",
  tagline: "Your Style. Your King.",
  location: "Anantnag, Jammu & Kashmir",
  fullAddress: "Main Market, Anantnag, Jammu & Kashmir, 192101, India",
  phone: "+91 99060 00000", // Clearly marked editable placeholder
  whatsappNumber: "919906000000", // For pre-filled booking URLs
  openingHours: "Monday – Sunday: 10:00 AM – 8:00 PM",
  googleMapsUrl: "https://maps.google.com/?q=King+Hair+Saloon+Anantnag+Jammu+Kashmir",
  instagramUrl: "https://instagram.com/king_hair_saloon_anantnag_placeholder",
  services: [
    {
      id: "hair-cut",
      name: "Hair Cut",
      category: "Hair",
      description: "Professional haircut and custom styling adapted to your face structure and personal hair goals.",
      features: ["Hair Cut", "Styling", "Professional Finish"],
      startingPrice: 150,
      image: "/src/assets/images/service_haircut_1790594864476.jpg"
    },
    {
      id: "facial",
      name: "Facial",
      category: "Skin",
      description: "Relaxing deep-cleansing facial treatment designed to restore skin moisture, clean pores, and refresh complexion.",
      features: ["Face Cleaning", "Facial Treatment", "Skin Refresh"],
      startingPrice: 300,
      image: "/src/assets/images/service_facial_1790594877862.jpg"
    },
    {
      id: "beard-grooming",
      name: "Beard Grooming",
      category: "Grooming",
      description: "Precision beard trimming, clean hot-towel razor outlines, and application of luxury beard conditioning oil.",
      features: ["Trimming & Shaping", "Hot Towel Finish", "Beard Oil Massage"],
      startingPrice: 80,
      image: "/src/assets/images/service_grooming_1790594891403.jpg"
    },
    {
      id: "hair-styling",
      name: "Hair Styling",
      category: "Hair",
      description: "Modern wax, pomade, or gel blow-dry styling tailored for special events, celebrations, or daily high-impact looks.",
      features: ["Blow Dry & Volume", "Matte/Gloss Wax Finish", "Trend Styling"],
      startingPrice: 100,
      image: "/src/assets/images/service_haircut_1790594864476.jpg" // Using beautiful generated asset
    },
    {
      id: "hair-wash",
      name: "Hair Wash",
      category: "Hair",
      description: "Deep scalp treatment and revitalizing hair wash utilizing premium professional shampoos and conditioning formulas.",
      features: ["Premium Shampoo", "Relaxing Scalp Massage", "Conditioning treatment"],
      startingPrice: 70,
      image: "/src/assets/images/service_facial_1790594877862.jpg" // Using beautiful generated asset
    }
  ]
};
