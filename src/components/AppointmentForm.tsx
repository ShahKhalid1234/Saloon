/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare, Sparkles, CheckCircle2, MessageSquareText, PhoneCall } from 'lucide-react';
import { SALON_CONFIG } from '../config/salonConfig';
import { Appointment } from '../hooks/useAppointments';

interface AppointmentFormProps {
  onAddBooking: (booking: {
    customerName: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    notes: string;
  }) => Appointment;
  selectedServicePreset?: string;
  onClearPreset?: () => void;
}

export default function AppointmentForm({ onAddBooking, selectedServicePreset, onClearPreset }: AppointmentFormProps) {
  // Form States
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Error & Confirmation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Set preset if passed from outside
  useEffect(() => {
    if (selectedServicePreset) {
      setService(selectedServicePreset);
      if (onClearPreset) onClearPreset();
    }
  }, [selectedServicePreset]);

  // Today's date string to prevent past date booking
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getTodayDateString();

  // Validate fields
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!customerName.trim()) tempErrors.customerName = "Full Name is required";
    if (!phone.trim()) {
      tempErrors.phone = "Mobile Number is required";
    } else if (phone.trim().length < 10) {
      tempErrors.phone = "Enter a valid mobile number";
    }
    if (!service) tempErrors.service = "Please select a service";
    if (!date) {
      tempErrors.date = "Please select a preferred date";
    } else if (date < todayStr) {
      tempErrors.date = "Appointment cannot be booked for past dates";
    }
    if (!time) tempErrors.time = "Please select a preferred time";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newApt = onAddBooking({
        customerName: customerName.trim(),
        phone: phone.trim(),
        service,
        date,
        time,
        notes: notes.trim()
      });
      setConfirmedBooking(newApt);
    }
  };

  // Pre-filled WhatsApp Booking URL Generator
  const triggerWhatsAppBooking = (apt: Appointment) => {
    const message = `Hello King Hair Saloon, I would like to book an appointment.

Name: ${apt.customerName}
Service: ${apt.service}
Preferred Date: ${apt.date}
Preferred Time: ${apt.time}
${apt.notes ? `Notes: ${apt.notes}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Reset form to book again
  const handleResetForm = () => {
    setCustomerName('');
    setPhone('');
    setService('');
    setDate('');
    setTime('');
    setNotes('');
    setErrors({});
    setConfirmedBooking(null);
  };

  // If appointment is confirmed, show beautiful Receipt Panel
  if (confirmedBooking) {
    return (
      <section id="book-appointment" className="relative bg-dark-950 py-24 sm:py-32 scroll-mt-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="border border-gold-500/30 bg-dark-900 p-8 sm:p-12 text-center relative overflow-hidden">
            
            {/* Top gold banner strip */}
            <div className="absolute top-0 left-0 h-[4px] w-full bg-gold-500" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h2 className="mt-6 font-serif text-2xl font-extrabold tracking-widest text-white sm:text-3xl">
              APPOINTMENT REQUEST RECEIVED!
            </h2>
            <p className="mt-3 text-xs text-[#9CA3AF] tracking-wide">
              Your appointment request has been recorded securely in our salon database.
            </p>

            {/* Structured Receipt Voucher Details */}
            <div className="mt-8 border border-dark-800 bg-dark-950 p-6 text-left">
              <div className="mb-4 text-center border-b border-dark-800 pb-4">
                <span className="font-serif text-sm font-semibold tracking-widest text-gold-400">
                  {SALON_CONFIG.salonName}
                </span>
                <span className="block text-[10px] text-[#6B7280] uppercase tracking-wider mt-1">
                  📍 {SALON_CONFIG.location}
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B7280] uppercase tracking-wider font-semibold text-[10px]">Client Name</span>
                  <span className="text-white font-medium">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] uppercase tracking-wider font-semibold text-[10px]">Contact Mobile</span>
                  <span className="text-white font-medium">{confirmedBooking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] uppercase tracking-wider font-semibold text-[10px]">Grooming Service</span>
                  <span className="text-gold-400 font-semibold">{confirmedBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] uppercase tracking-wider font-semibold text-[10px]">Selected Date</span>
                  <span className="text-white font-medium">{confirmedBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] uppercase tracking-wider font-semibold text-[10px]">Selected Time</span>
                  <span className="text-white font-medium">{confirmedBooking.time}</span>
                </div>
                {confirmedBooking.notes && (
                  <div className="border-t border-dark-800 pt-3.5 mt-3.5">
                    <span className="block text-[#6B7280] uppercase tracking-wider font-semibold text-[10px] mb-1">Your Notes</span>
                    <p className="text-[#9CA3AF] text-xs italic leading-relaxed">{confirmedBooking.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#9CA3AF]">
              Thank you for choosing King Hair Saloon. We’ll confirm your appointment shortly. You can speed up confirmation by clicking the WhatsApp button below.
            </p>

            {/* Interactive action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => triggerWhatsAppBooking(confirmedBooking)}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Confirm via WhatsApp</span>
              </button>

              <button
                onClick={handleResetForm}
                className="flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-800/80 border border-dark-800 hover:border-gold-500/20 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer"
              >
                <span>Book Another Service</span>
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-appointment" className="relative bg-dark-950 py-24 sm:py-32 scroll-mt-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
            Reservation
          </span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold tracking-widest text-white sm:text-4xl">
            BOOK AN APPOINTMENT
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#9CA3AF]">
            Choose your signature service and preferred slot. Fill in the secure form below to reserve your personal styling session at King Hair Saloon.
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="mt-16 border border-dark-800 bg-dark-900 p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid gap-6 sm:grid-cols-2">
              
              {/* Full Name */}
              <div>
                <label htmlFor="customerName" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                  Full Name <span className="text-gold-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6B7280]">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-dark-950 border border-dark-800 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-[#4B5563] outline-none transition-all duration-300 focus:border-gold-500/50"
                  />
                </div>
                {errors.customerName && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium tracking-wide">⚠️ {errors.customerName}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                  Mobile Number <span className="text-gold-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6B7280]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 99060 XXXXX"
                    className="w-full bg-dark-950 border border-dark-800 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-[#4B5563] outline-none transition-all duration-300 focus:border-gold-500/50"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium tracking-wide">⚠️ {errors.phone}</p>
                )}
              </div>

              {/* Select Service */}
              <div>
                <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                  Select Service <span className="text-gold-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full appearance-none bg-dark-950 border border-dark-800 py-3 px-4 text-xs font-medium text-white outline-none transition-all duration-300 focus:border-gold-500/50"
                  >
                    <option value="" disabled className="text-[#6B7280]">-- Choose a Signature Service --</option>
                    {SALON_CONFIG.services.map((item) => (
                      <option key={item.id} value={item.name} className="bg-dark-900 text-white">
                        {item.name} (Starts at ₹{item.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.service && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium tracking-wide">⚠️ {errors.service}</p>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                  Select Date <span className="text-gold-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6B7280] pointer-events-none">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <input
                    type="date"
                    id="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-dark-950 border border-dark-800 py-3 pl-10 pr-4 text-xs font-medium text-white outline-none transition-all duration-300 focus:border-gold-500/50"
                  />
                </div>
                {errors.date && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium tracking-wide">⚠️ {errors.date}</p>
                )}
              </div>

              {/* Time Selection */}
              <div>
                <label htmlFor="time" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                  Select Time <span className="text-gold-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6B7280] pointer-events-none">
                    <Clock className="h-4 w-4" />
                  </span>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full appearance-none bg-dark-950 border border-dark-800 py-3 pl-10 pr-4 text-xs font-medium text-white outline-none transition-all duration-300 focus:border-gold-500/50"
                  >
                    <option value="" disabled>-- Select Time Slot --</option>
                    <option value="10:00 AM">10:00 AM (Opening Slot)</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM (Noon)</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="07:30 PM">07:30 PM (Last Booking)</option>
                  </select>
                </div>
                {errors.time && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium tracking-wide">⚠️ {errors.time}</p>
                )}
              </div>

            </div>

            {/* Notes/Optional message */}
            <div>
              <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                Special Notes / Grooming Preferences <span className="text-[#6B7280] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3.5 text-[#6B7280]">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us if you have any sensitive skin, specific haircut styles, or requests..."
                  className="w-full bg-dark-950 border border-dark-800 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-[#4B5563] outline-none transition-all duration-300 focus:border-gold-500/50"
                />
              </div>
            </div>

            {/* Direct Instant Booking via WhatsApp Option Disclaimer */}
            <div className="border-t border-dark-800 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-[#6B7280] max-w-md">
                By submitting this form, your request is logged directly. You will have the option to forward it straight to WhatsApp for immediate booking.
              </p>
              
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 active:scale-95 px-8 py-4 text-xs font-bold uppercase tracking-widest text-dark-950 transition-all duration-300 sm:w-auto cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Confirm Appointment</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
