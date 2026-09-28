/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import AppointmentForm from './components/AppointmentForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { useAppointments } from './hooks/useAppointments';
import { SALON_CONFIG } from './config/salonConfig';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');

  // Local storage reactive state hook
  const { 
    appointments, 
    addAppointment, 
    updateAppointmentStatus, 
    stats, 
    todayDateStr 
  } = useAppointments();

  // Scroll active section observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'book-appointment', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Navigation function
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Preset Selection from card
  const handleSelectService = (serviceName: string) => {
    setSelectedServicePreset(serviceName);
    handleNavigate('book-appointment');
  };

  return (
    <div className="relative min-h-screen bg-dark-950 font-sans text-dark-50 antialiased selection:bg-gold-500/20 selection:text-white">
      
      {/* Navigation Header bar */}
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Main Flow Sections */}
      <main>
        
        {/* Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* Services Grid Section */}
        <Services onSelectService={handleSelectService} />

        {/* About Section */}
        <About />

        {/* Gallery Section */}
        <Gallery />

        {/* Dynamic Appointment Form Section */}
        <AppointmentForm 
          onAddBooking={addAppointment} 
          selectedServicePreset={selectedServicePreset}
          onClearPreset={() => setSelectedServicePreset('')}
        />

        {/* Contact and Map Details Section */}
        <Contact onBookClick={() => handleNavigate('book-appointment')} />

      </main>

      {/* Footer Section */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Persistent Fullscreen Admin Dashboard Modal Overlay */}
      {isAdminOpen && (
        <AdminDashboard
          appointments={appointments}
          updateStatus={updateAppointmentStatus}
          stats={stats}
          todayDateStr={todayDateStr}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
