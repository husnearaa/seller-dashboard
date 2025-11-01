
'use client';
import React, { useState } from 'react';
// import WeeklyAvailability from './components/WeeklyAvailability';
// import UpcomingAppointments from './components/UpcomingAppointments';
import { GoGear } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa6';
// import CalendarGrid from './components/CalendarGrid';
import Link from 'next/link';
import WeeklyAvailability from '@/components/shared/dashboardLayout/ScheduleManagement/WeeklyAvailability';
// import AvailabilityModal from './components/AvailabilityModal';

const SchedulePage = () => {
  const [showModal, setShowModal] = useState(false);

  // Mock array of off days for visualization (ISO date strings)
  const offDays = [
    '2025-08-07',
    '2025-08-14',
    '2025-08-20',  
    '2025-08-27',
  ];

  // Additional highlighted days (e.g., available or special, in blue)
  const highlightedDays = [''];

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    // Handle save logic, e.g., update off days array or API call
    console.log('Saved off days:', offDays);
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-[calc(100vh-150px)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Calendar & Schedule</h1>
            <p className="text-sm text-gray-500">Manage your availability and appointments</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleOpenModal}
              className="border border-gray-200 font-semibold rounded-lg px-4 py-2 flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
            >
              <span><GoGear /></span> 
              Availability Settings
            </button>
            <Link 
              href="/specialist-dashboard/schedule/block-time" 
              className="bg-black text-white px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-sm hover:bg-gray-800"
            >
              <span><FaPlus /></span> Block Time
            </Link>
          </div>
        </div>
        {/* Calendar Grid */}
        <CalendarGrid />
        {/* Bottom 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyAvailability />
          <UpcomingAppointments />
        </div>
      </div>

      {/* Reusable Availability Modal */}
      <AvailabilityModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        offDays={offDays}
        highlightedDays={highlightedDays}
      />
    </div>
  );
};

export default SchedulePage;