import React from 'react';
import { daysOfWeek, isSameDate } from './utils';

export const WeekView = ({ currentDate, events, onAddEvent, onDragStart, onDragOver, onDrop, onEventClick }) => {
  // Pega os 7 dias da semana atual com base no currentDate
  const getDaysOfCurrentWeek = (date) => {
    const startOfWeek = new Date(date);
    // Ajusta para o domingo da semana atual
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDays = getDaysOfCurrentWeek(currentDate);

  return (
    <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho com os dias da semana */}
      {weekDays.map((day, index) => {
        const isToday = isSameDate(day, new Date());
        return (
          <div key={`header-${index}`} className="bg-gray-100 p-2 text-center font-semibold text-sm text-gray-700 border-b border-gray-200">
            <div>{daysOfWeek[index]}</div>
            <div className={`mt-1 ${isToday ? 'text-blue-600 font-bold' : ''}`}>
               {isToday ? <span className="bg-blue-100 px-2 py-0.5 rounded-full text-xs">{day.getDate()}</span> : day.getDate()}
            </div>
          </div>
        );
      })}

      {/* Colunas dos dias */}
      {weekDays.map((day, idx) => {
        // Transformamos a data no formato 'YYYY-MM-DD' para usar como chave
        const dateKey = day.toISOString().split('T')[0]; 
        
        // Pega os eventos direto do objeto. Se não tiver nada, usamos um array vazio fallback []
        const dayEvents = events[dateKey] || []; 
        const isToday = isSameDate(day, new Date());

        return (
          <div
            key={`day-${idx}`}
            className={`min-h-[60vh] p-2 hover:bg-gray-50 transition-colors cursor-pointer border-r border-gray-100 last:border-r-0 ${isToday ? 'bg-blue-50/30' : ''}`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, day)}
            onClick={() => onAddEvent(day)}
          >
            <div className="space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, event)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(e, event);
                  }}
                  className={`${event.color} text-white text-xs p-1.5 rounded shadow-sm cursor-move truncate hover:opacity-90 active:scale-95 transition-all mb-1`}
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