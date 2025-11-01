'use client';
import React from 'react';
import { GoGear } from 'react-icons/go';

const WeeklyAvailability = () => {
  const days = [
    { day: 'monday', time: '09:00 - 17:00' },
    { day: 'tuesday', time: '09:00 - 17:00' },
    { day: 'wednesday', time: '09:00 - 17:00' },
    { day: 'thursday', time: '09:00 - 17:00' },
    { day: 'friday', time: '09:00 - 16:00' },
    { day: 'saturday', time: '10:00 - 15:00' },
    { day: 'sunday', time: 'Unavailable' },
  ];

  return (
    <div className="bg-white- border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Weekly Availability</h3>
      <ul className="space-y-3">
        {days.map(({ day, time }) => (
          <li key={day} className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="capitalize">{day}</span>
            </div>
            <div className='flex justify-center items-center gap-5'>

            <span className={`text-sm ${time === 'Unavailable' ? 'text-gray-400' : 'font-medium bg-gray-100 py-1 px-2 rounded-xl'}`}>
              {time}
            </span>
            <span>
              <GoGear size={20} className="inline text-black cursor-pointer" />
            </span>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyAvailability;
