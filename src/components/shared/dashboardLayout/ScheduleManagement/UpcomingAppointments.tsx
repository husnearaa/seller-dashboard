


'use client';
import React from 'react';
import { Clock, Video, MapPin } from 'lucide-react';

const UpcomingAppointments = () => {
  const appointments = [
    {
      name: 'Emma Wilson',
      time: '2024-12-18 at 09:00',
      type: 'consultation',
    },
    {
      name: 'Michael Chen',
      time: '2024-12-18 at 11:30',
      type: 'service',
    },
    {
      name: 'Sarah Davis',
      time: '2024-12-18 at 14:00',
      type: 'consultation',
    },
    {
      name: 'James Brown',
      time: '2024-12-19 at 16:30',
      type: 'service',
    },
  ];

  const getTypeConfig = (type: string) => {
    if (type === 'consultation') {
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        icon: Video,
      };
    }
    return {
      bg: 'bg-green-100',
      text: 'text-green-600',
      icon: MapPin,
    };
  };

  return (
    <div className="bg-white- border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Upcoming Appointments</h3>
      <ul className="space-y-3">
        {appointments.map((item, idx) => {
          const TypeIcon = getTypeConfig(item.type).icon;
          return (
            <li key={idx} className="flex justify-between bg-gray-50 p-4 rounded-2xl items-center ">
              <div className="flex items-center">
                <Clock size={16} className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
              <div className='flex items-center justify-center'>

                <TypeIcon size={12} className={` ${getTypeConfig(item.type).text}`} />
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getTypeConfig(item.type).bg} ${getTypeConfig(item.type).text} ml-4`}
                >
                {item.type}
              </span>
                </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingAppointments;