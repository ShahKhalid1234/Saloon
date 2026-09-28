/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  BarChart3, Calendar, Check, X, Filter, RefreshCw, LogOut, Lock, 
  Eye, CheckCircle2, AlertTriangle, HelpCircle, Phone, Search 
} from 'lucide-react';
import { Appointment } from '../hooks/useAppointments';
import { SALON_CONFIG } from '../config/salonConfig';

interface AdminDashboardProps {
  appointments: Appointment[];
  updateStatus: (id: string, status: Appointment['status']) => void;
  stats: {
    todayCount: number;
    upcomingCount: number;
    completedCount: number;
    cancelledCount: number;
  };
  todayDateStr: string;
  onClose: () => void;
}

export default function AdminDashboard({ appointments, updateStatus, stats, todayDateStr, onClose }: AdminDashboardProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard States
  const [activeTab, setActiveTab] = useState<'All' | 'Today' | 'Upcoming' | 'Completed' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Credentials check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'king123' || passcode === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid passcode. Use "king123" to access.');
    }
  };

  // Immediate login shortcut for convenience
  const handleDemoUnlock = () => {
    setIsAuthenticated(true);
  };

  // Filter logic
  const filteredAppointments = appointments.filter(apt => {
    // 1. Search filter (by name or phone)
    const matchesSearch = 
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      apt.phone.includes(searchQuery);

    if (!matchesSearch) return false;

    // 2. Tab filter
    if (activeTab === 'All') return true;
    if (activeTab === 'Today') return apt.date === todayDateStr;
    if (activeTab === 'Upcoming') return apt.date > todayDateStr && (apt.status === 'Pending' || apt.status === 'Confirmed');
    if (activeTab === 'Completed') return apt.status === 'Completed';
    if (activeTab === 'Cancelled') return apt.status === 'Cancelled';
    
    return true;
  });

  // Get Status Style Utility (Strict unboxed text indicator with indicator colors)
  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return <span className="text-xs font-semibold text-emerald-400 font-mono tracking-wider">● CONFIRMED</span>;
      case 'Completed':
        return <span className="text-xs font-semibold text-blue-400 font-mono tracking-wider">✓ COMPLETED</span>;
      case 'Cancelled':
        return <span className="text-xs font-semibold text-red-400 font-mono tracking-wider">✕ CANCELLED</span>;
      default:
        return <span className="text-xs font-semibold text-amber-400 font-mono tracking-wider">○ PENDING</span>;
    }
  };

  // If not authenticated, show elegant PIN Code Dialog
  if (!isAuthenticated) {
    return (
      <section className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/95 backdrop-blur-sm p-4">
        <div className="w-full max-w-md border border-dark-800 bg-dark-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-gold-500/10 text-gold-500">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold tracking-widest text-white uppercase">
              SALON OWNER ACCESS
            </h2>
            <p className="mt-1.5 text-xs text-[#9CA3AF]">
              Please enter the master passcode to access the schedule database.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">
                Passcode <span className="text-xs text-[#6B7280] font-normal">(Demo PIN: <strong className="text-gold-400">king123</strong>)</span>
              </label>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••"
                className="w-full bg-dark-950 border border-dark-800 py-3 px-4 text-center text-sm font-mono tracking-widest text-white outline-none transition-all duration-300 focus:border-gold-500/50"
                autoFocus
              />
              {loginError && (
                <p className="mt-2 text-center text-[11px] text-red-500 font-medium">⚠️ {loginError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-400 py-3 text-xs font-bold uppercase tracking-widest text-dark-950 transition-all cursor-pointer"
              >
                Unlock Dashboard
              </button>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDemoUnlock}
                  className="w-full bg-dark-800 hover:bg-dark-800/80 text-[#9CA3AF] hover:text-white border border-dark-800 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Quick Unlock (Demo)
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-transparent text-[#6B7280] hover:text-[#9CA3AF] py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Return to Site
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="fixed inset-0 z-50 overflow-y-auto bg-dark-950 text-white animate-fade-in">
      
      {/* Admin Top Header Zone */}
      <header className="sticky top-0 z-10 border-b border-dark-800 bg-dark-900/90 backdrop-blur-md py-4">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-gold-500" />
            <h1 className="font-serif text-base font-extrabold tracking-widest uppercase text-white sm:text-lg">
              KING HAIR SALOON <span className="font-sans font-light text-xs lowercase text-gold-400">owner dashboard</span>
            </h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 border border-dark-800 bg-dark-950 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-white hover:border-red-500/30 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Lock Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Navigation Escape Back to Main website */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs text-[#9CA3AF]">
            Review, confirm, or complete client appointments. Changes persist in real-time.
          </p>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-gold-500 hover:text-gold-400 font-semibold cursor-pointer"
          >
            ← Exit Admin Panel
          </button>
        </div>

        {/* 1. Statistics Cards Area */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
          
          <div className="border border-dark-800 bg-dark-900 p-5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">TODAY'S RESERVATIONS</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-extrabold text-white">{stats.todayCount}</span>
              <span className="text-[10px] font-mono text-gold-400 font-medium">Active</span>
            </div>
          </div>

          <div className="border border-dark-800 bg-dark-900 p-5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">UPCOMING SCHEDULE</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-extrabold text-white">{stats.upcomingCount}</span>
              <span className="text-[10px] font-mono text-gold-400 font-medium">Pending/Confirmed</span>
            </div>
          </div>

          <div className="border border-dark-800 bg-dark-900 p-5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">COMPLETED SERVICES</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-extrabold text-[#10B981]">{stats.completedCount}</span>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">Closed</span>
            </div>
          </div>

          <div className="border border-dark-800 bg-dark-900 p-5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">CANCELLED REQUESTS</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-extrabold text-red-400">{stats.cancelledCount}</span>
              <span className="text-[10px] font-mono text-red-400/60 font-medium">Voided</span>
            </div>
          </div>

        </div>

        {/* 2. Control Row: Filters & Search bar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-dark-800 pb-6">
          
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-dark-900 border border-dark-800 w-fit">
            {(['All', 'Today', 'Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gold-500 text-dark-950'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-dark-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#6B7280]">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by client name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-900 border border-dark-800 py-2.5 pl-9 pr-4 text-xs font-medium text-white placeholder-[#4B5563] outline-none focus:border-gold-500/40 transition-all"
            />
          </div>

        </div>

        {/* 3. Schedule Table / Cards List */}
        {filteredAppointments.length === 0 ? (
          <div className="border border-dark-800 bg-dark-900/40 p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-[#4B5563] mb-4" />
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-white">
              No Appointments Found
            </h3>
            <p className="mt-1 text-xs text-[#6B7280]">
              There are no reservations matching the chosen filters or search constraints.
            </p>
          </div>
        ) : (
          <div>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto border border-dark-800 bg-dark-900">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-dark-800 bg-dark-950 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Time</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800 text-xs">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.appointmentId} className="hover:bg-dark-950/40 transition-colors">
                      <td className="py-4 px-6">
                        <span className="block font-bold text-white">{apt.customerName}</span>
                        {apt.notes && (
                          <span className="block text-[11px] text-[#9CA3AF] italic mt-1 max-w-xs truncate" title={apt.notes}>
                            "{apt.notes}"
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 font-mono text-[#9CA3AF] tracking-wide">
                        <a href={`tel:${apt.phone}`} className="hover:text-gold-400 flex items-center gap-1.5">
                          <Phone className="h-3 w-3" />
                          <span>{apt.phone}</span>
                        </a>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gold-300">{apt.service}</td>
                      <td className="py-4 px-6 font-mono">{apt.date}</td>
                      <td className="py-4 px-6 font-mono">{apt.time}</td>
                      <td className="py-4 px-6">{getStatusBadge(apt.status)}</td>
                      <td className="py-4 px-6 text-right">
                        
                        {/* Interactive Actions Grid */}
                        <div className="flex justify-end gap-1.5">
                          {apt.status === 'Pending' && (
                            <button
                              onClick={() => updateStatus(apt.appointmentId, 'Confirmed')}
                              className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-dark-950 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                              title="Confirm Appointment"
                            >
                              Confirm
                            </button>
                          )}
                          
                          {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                            <>
                              <button
                                onClick={() => updateStatus(apt.appointmentId, 'Completed')}
                                className="bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-dark-950 border border-blue-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                                title="Mark Completed"
                              >
                                Done
                              </button>
                              
                              <button
                                onClick={() => updateStatus(apt.appointmentId, 'Cancelled')}
                                className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-dark-950 border border-red-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                                title="Cancel Appointment"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          
                          {(apt.status === 'Completed' || apt.status === 'Cancelled') && (
                            <span className="text-[10px] text-[#4B5563] uppercase tracking-widest select-none">
                              No actions
                            </span>
                          )}
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Stack View */}
            <div className="lg:hidden space-y-4">
              {filteredAppointments.map((apt) => (
                <div key={apt.appointmentId} className="border border-dark-800 bg-dark-900 p-5 space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{apt.customerName}</h4>
                      <p className="font-semibold text-gold-400 text-xs mt-0.5">{apt.service}</p>
                    </div>
                    <div>
                      {getStatusBadge(apt.status)}
                    </div>
                  </div>

                  {apt.notes && (
                    <p className="text-[11px] text-[#9CA3AF] italic leading-relaxed border-l-2 border-dark-800 pl-2.5">
                      "{apt.notes}"
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-dark-800 pt-3.5">
                    <div>
                      <span className="block text-[9px] text-[#6B7280] uppercase tracking-wider font-sans font-bold">DATE / TIME</span>
                      <span className="text-white">{apt.date} at {apt.time}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-[#6B7280] uppercase tracking-wider font-sans font-bold">CONTACT</span>
                      <a href={`tel:${apt.phone}`} className="text-gold-500 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" />
                        <span>{apt.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Actions (Mobile Toggles) */}
                  <div className="flex items-center justify-end gap-2 border-t border-dark-800 pt-3 mt-1">
                    {apt.status === 'Pending' && (
                      <button
                        onClick={() => updateStatus(apt.appointmentId, 'Confirmed')}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-dark-950 py-2.5 text-[10px] font-bold uppercase tracking-widest text-center transition-all cursor-pointer"
                      >
                        Confirm Slot
                      </button>
                    )}
                    
                    {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                      <>
                        <button
                          onClick={() => updateStatus(apt.appointmentId, 'Completed')}
                          className="flex-1 bg-blue-500 hover:bg-blue-400 text-dark-950 py-2.5 text-[10px] font-bold uppercase tracking-widest text-center transition-all cursor-pointer"
                        >
                          Mark Done
                        </button>
                        <button
                          onClick={() => updateStatus(apt.appointmentId, 'Cancelled')}
                          className="flex-1 bg-dark-950 hover:bg-dark-950/80 text-red-400 border border-dark-800 py-2.5 text-[10px] font-bold uppercase tracking-widest text-center transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {(apt.status === 'Completed' || apt.status === 'Cancelled') && (
                      <span className="text-[10px] text-[#4B5563] uppercase tracking-widest py-1 select-none">
                        Completed Record
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </section>
  );
}
