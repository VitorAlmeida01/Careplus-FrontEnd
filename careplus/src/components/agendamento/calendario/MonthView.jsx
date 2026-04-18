import React from 'react';
import { daysOfWeek, getDaysInMonth, getFirstDayOfMonth, isSameDate } from './utils';

export const MonthView = ({ currentDate, events, onAddEvent, onDragOver, onDrop, onEventClick }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalSlots = [...blanks, ...days];

  return (
    <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {daysOfWeek.map(day => (
        <div key={day} className="bg-gray-100 p-2 text-center font-semibold text-sm text-gray-700">
          {day}
        </div>
      ))}
      {totalSlots.map((day, idx) => {
        if (!day) return <div key={`blank-${idx}`} className="bg-gray-50 min-h-30"></div>;

        const cellDate = new Date(year, month, day);
        const dateKey = cellDate.toISOString().split('T')[0];
        const dayEvents = events[dateKey] || [];
        const isToday = isSameDate(cellDate, new Date());

        return (
          <div
            key={day}
            className={`min-h-30 p-2 hover:bg-gray-50 transition-colors cursor-pointer border-t border-l border-gray-100 ${isToday ? 'bg-blue-50/30' : ''}`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, cellDate)}
            onClick={() => onAddEvent(cellDate)}
          >
            <div className={`text-right mb-1 ${isToday ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
              {isToday ? <span className="bg-blue-100 px-2 py-0.5 rounded-full text-xs">{day}</span> : day}
            </div>
            <div className="space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  draggable
                  // onDragStart={(e) => onDragStart(e, event)}
                  onClick={(e) => { e.stopPropagation();   onEventClick(e, event)}}
                  className={`${event.color} text-white text-xs p-1.5 rounded shadow-sm cursor-pointer truncate hover:opacity-90 active:scale-95 transition-all`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
