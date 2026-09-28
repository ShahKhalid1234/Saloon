/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export interface Appointment {
  appointmentId: string;
  customerName: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

// Helper to get formatted dates relative to today
const getRelativeDateString = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const INITIAL_MOCK_APPOINTMENTS: Appointment[] = [
  {
    appointmentId: "apt-1",
    customerName: "Suhail Ahmad",
    phone: "+91 99061 11222",
    service: "Hair Cut",
    date: getRelativeDateString(0), // Today
    time: "11:00",
    notes: "Needs a classic taper fade haircut",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
  },
  {
    appointmentId: "apt-2",
    customerName: "Muzaffar Bhat",
    phone: "+91 97972 33445",
    service: "Facial",
    date: getRelativeDateString(0), // Today
    time: "14:30",
    notes: "First time trying skin rejuvenation facial treatment",
    status: "Pending",
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
  },
  {
    appointmentId: "apt-3",
    customerName: "Arshid Wani",
    phone: "+91 94190 55667",
    service: "Beard Grooming",
    date: getRelativeDateString(1), // Tomorrow
    time: "10:30",
    notes: "Beard grooming with oil massage and razor alignment",
    status: "Pending",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    appointmentId: "apt-4",
    customerName: "Yawar Dar",
    phone: "+91 70060 88990",
    service: "Hair Styling",
    date: getRelativeDateString(1), // Tomorrow
    time: "17:00",
    notes: "Attending a wedding. Needs modern styling.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  },
  {
    appointmentId: "apt-5",
    customerName: "Irshad Lone",
    phone: "+91 99065 44332",
    service: "Hair Cut",
    date: getRelativeDateString(-1), // Yesterday (Completed)
    time: "12:00",
    notes: "Regular trim",
    status: "Completed",
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString()
  },
  {
    appointmentId: "apt-6",
    customerName: "Zahid Shah",
    phone: "+91 96221 77889",
    service: "Hair Wash",
    date: getRelativeDateString(-2), // Day before yesterday (Cancelled)
    time: "15:00",
    notes: "No-show / had emergency",
    status: "Cancelled",
    createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString()
  }
];

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load appointments from localStorage or fall back to mock seeds
  useEffect(() => {
    const saved = localStorage.getItem('king_salon_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading appointments:", e);
        setAppointments(INITIAL_MOCK_APPOINTMENTS);
      }
    } else {
      setAppointments(INITIAL_MOCK_APPOINTMENTS);
      localStorage.setItem('king_salon_appointments', JSON.stringify(INITIAL_MOCK_APPOINTMENTS));
    }
  }, []);

  // Sync state back to localStorage
  const saveAppointmentsToStorage = (newApts: Appointment[]) => {
    setAppointments(newApts);
    localStorage.setItem('king_salon_appointments', JSON.stringify(newApts));
  };

  // Add a new booking
  const addAppointment = (booking: Omit<Appointment, 'appointmentId' | 'status' | 'createdAt'>) => {
    const newApt: Appointment = {
      ...booking,
      appointmentId: `apt-${Math.random().toString(36).substr(2, 9)}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newApt, ...appointments];
    saveAppointmentsToStorage(updated);
    return newApt;
  };

  // Update appointment status
  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updated = appointments.map(apt => 
      apt.appointmentId === id ? { ...apt, status } : apt
    );
    saveAppointmentsToStorage(updated);
  };

  // Statistics
  const todayDateStr = getRelativeDateString(0);
  
  const stats = {
    todayCount: appointments.filter(apt => apt.date === todayDateStr && apt.status !== 'Cancelled').length,
    upcomingCount: appointments.filter(apt => {
      // Any date >= today where status is Pending or Confirmed (excluding completed/cancelled)
      return apt.date >= todayDateStr && (apt.status === 'Pending' || apt.status === 'Confirmed');
    }).length,
    completedCount: appointments.filter(apt => apt.status === 'Completed').length,
    cancelledCount: appointments.filter(apt => apt.status === 'Cancelled').length,
  };

  return {
    appointments,
    addAppointment,
    updateAppointmentStatus,
    stats,
    todayDateStr
  };
}
