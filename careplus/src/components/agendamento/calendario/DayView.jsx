import React from 'react';
import { daysOfWeek, months, formatTime } from './utils';

export const DayView = ({ currentDate, events, onAddEvent, onDragStart, onDragOver, onDrop, onEventClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayDate = currentDate;

  // Chave da data (ex: '2026-02-22')
  const dateKey = dayDate.toISOString().split('T')[0];
  
  // Pega apenas os eventos do dia
  const dayEvents = events[dateKey] || [];

  return (
    <div className="flex flex-col h-150 overflow-auto border border-gray-200 rounded-lg bg-white">
      {/* Header do Dia */}
      <div className="p-4 border-b border-gray-200 text-center sticky top-0 bg-white z-10 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">
          {daysOfWeek[dayDate.getDay()]}, {dayDate.getDate()} de {months[dayDate.getMonth()]}
        </h2>
      </div>
      
      {/* Lista de Horários */}
      <div className="relative">
         {hours.map(h => {
           // Armazena apenas os eventos que pertecem a hora do dia.
           const slotEvents = dayEvents.filter(e => e.date && e.date.getHours() === h);

           return (
             <div 
                key={h} 
                className="flex border-b border-gray-200 min-h-20 group hover:bg-gray-50 cursor-pointer transition-colors"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, dayDate, h)}
                onClick={() => onAddEvent(dayDate, h)}
             >
               <div className="w-20 border-r border-gray-200 p-2 text-right text-gray-500 text-sm bg-gray-50">
                 {formatTime(h)}
               </div>
               <div className="flex-1 p-2 relative">
                  {slotEvents.map(event => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, event)}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick(e, event);
                      }}
                      className={`${event.color} text-white p-2 rounded mb-1 cursor-move shadow-md hover:opacity-90 active:scale-95 transition-all`}
                    >
                       <div className="font-bold text-sm">{event.title}</div>
                       <div className="text-xs opacity-90">Das {formatTime(h)} às {formatTime(h+1)}</div>
                    </div>
                  ))}
               </div>
             </div>
           )
         })}
      </div>
    </div>
  );
};