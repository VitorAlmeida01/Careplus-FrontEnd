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

  // Array de horários de 08:00 às 18:00
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const weekDays = getDaysOfCurrentWeek(currentDate);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Grid com 8 colunas: 1 para horários + 7 para dias */}
      <div className="grid grid-cols-8 gap-0">
        {/* Célula vazia no canto superior esquerdo */}
        <div className="bg-gray-100 border-b border-r border-gray-200"></div>
        
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
      </div>

      {/* Grid de horários e eventos */}
      <div className="grid grid-cols-8 gap-0">
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={`time-${timeIndex}`}>
            {/* Coluna de horários */}
            <div className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-600 border-r border-b border-gray-200">
              {time}
            </div>
            
            {/* Células dos dias para cada horário */}
            {weekDays.map((day, dayIndex) => {
              const dateKey = day.toISOString().split('T')[0];
              const dayEvents = events[dateKey] || [];
              const isToday = isSameDate(day, new Date());

              return (
                <div
                  key={`cell-${timeIndex}-${dayIndex}`}
                  className={`min-h-[60px] p-1 hover:bg-gray-50 transition-colors cursor-pointer border-r border-b border-gray-100 last:border-r-0 ${isToday ? 'bg-blue-50/30' : ''}`}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, day)}
                  onClick={() => onAddEvent(day)}
                >
                  {/* Mostra eventos apenas na primeira linha (simplificado) */}
                  {timeIndex === 0 && (
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
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};