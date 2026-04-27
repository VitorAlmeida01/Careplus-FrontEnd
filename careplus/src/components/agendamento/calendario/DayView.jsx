import React from 'react';
import { daysOfWeek, months, formatEventTime } from './utils';

const HOUR_HEIGHT = 64;
const START_HOUR = 7;
const END_HOUR = 20;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => START_HOUR + i);

function timeStrToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function getEventStyle(horarioInicio, horarioFim) {
  const startMin = timeStrToMinutes(horarioInicio);
  if (startMin === null) return null;
  const startOffset = startMin - START_HOUR * 60;
  if (startOffset < 0 || startOffset >= TOTAL_HOURS * 60) return null;
  const top = (startOffset / 60) * HOUR_HEIGHT;
  let height;
  if (horarioFim) {
    const endMin = timeStrToMinutes(horarioFim);
    height = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT, 22);
  } else {
    height = HOUR_HEIGHT;
  }
  return { top, height };
}

export const DayView = ({ currentDate, events, onAddEvent, onEventClick }) => {
  const dayDate = currentDate;
  const dateKey = [
    dayDate.getFullYear(),
    String(dayDate.getMonth() + 1).padStart(2, '0'),
    String(dayDate.getDate()).padStart(2, '0'),
  ].join('-');
  const dayEvents = events[dateKey] || [];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 text-center sticky top-0 bg-white z-10 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">
          {daysOfWeek[dayDate.getDay()]}, {dayDate.getDate()} de {months[dayDate.getMonth()]}
        </h2>
      </div>

      {/* Corpo com scroll */}
      <div className="overflow-y-auto" style={{ maxHeight: 600 }}>
        <div className="flex">
          {/* Coluna de horas */}
          <div className="w-20 shrink-0 bg-gray-50 border-r border-gray-200">
            {hours.map(h => (
              <div
                key={h}
                style={{ height: HOUR_HEIGHT }}
                className="border-b border-gray-100 flex items-start justify-end pr-3 pt-1"
              >
                <span className="text-xs text-gray-400">
                  {`${h.toString().padStart(2, '0')}:00`}
                </span>
              </div>
            ))}
          </div>

          {/* Coluna de eventos */}
          <div
            className="flex-1 relative"
            style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}
          >
            {/* Linhas de hora */}
            {hours.map(h => (
              <div
                key={h}
                className="absolute left-0 right-0 border-b border-gray-100 cursor-pointer hover:bg-gray-50/80"
                style={{ top: (h - START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                onClick={() => onAddEvent(dayDate, h)}
              />
            ))}

            {/* Eventos posicionados absolutamente */}
            {dayEvents.map(event => {
              const style = getEventStyle(event.horarioInicio, event.horarioFim);
              if (!style) return null;
              return (
                <div
                  key={event.id}
                  onClick={(e) => { e.stopPropagation(); onEventClick(e, event); }}
                  className={`${event.color} text-white rounded-md shadow-md cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all absolute overflow-hidden px-3 py-1.5`}
                  style={{ top: style.top + 1, height: style.height - 2, left: 6, right: 6 }}
                >
                  <div className="font-bold text-sm leading-tight truncate">{event.title}</div>
                  {style.height > 30 && (
                    <div className="text-xs opacity-90 leading-tight">
                      {formatEventTime(event.horarioInicio)}
                      {event.horarioFim ? ` – ${formatEventTime(event.horarioFim)}` : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};