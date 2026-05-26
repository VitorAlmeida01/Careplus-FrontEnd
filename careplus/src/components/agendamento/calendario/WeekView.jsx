import React from 'react';
import { daysOfWeek, isSameDate, formatEventTime } from './utils';

const HOUR_HEIGHT = 64; // px por hora
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

const localDateKey = (d) => [
  d.getFullYear(),
  String(d.getMonth() + 1).padStart(2, '0'),
  String(d.getDate()).padStart(2, '0'),
].join('-');

export const WeekView = ({ currentDate, events, onAddEvent, onEventClick }) => {
  const getDaysOfCurrentWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDays = getDaysOfCurrentWeek(currentDate);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="flex border-b border-gray-200 bg-gray-100 sticky top-0 z-10">
        <div className="w-16 shrink-0 border-r border-gray-200" />
        {weekDays.map((day, i) => {
          const isToday = isSameDate(day, new Date());
          const isWeekend = day.getDay() === 0;
          return (
            <div key={i} className={`flex-1 p-2 text-center font-semibold text-sm border-l border-gray-200 first:border-l-0 ${isWeekend ? 'text-gray-400 bg-gray-200/60' : 'text-gray-700'}`}>
              <div className="text-xs">{daysOfWeek[i]}</div>
              <div className={`text-base mt-0.5 ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                {isToday
                  ? <span className="bg-blue-500 text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-sm">{day.getDate()}</span>
                  : day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Corpo com scroll */}
      <div className="overflow-y-auto" style={{ maxHeight: 600 }}>
        <div className="flex">
          {/* Coluna de horas */}
          <div className="w-16 shrink-0">
            {hours.map(h => (
              <div
                key={h}
                style={{ height: HOUR_HEIGHT }}
                className="border-b border-gray-100 flex items-start justify-end pr-2 pt-1"
              >
                <span className="text-[11px] text-gray-400">
                  {`${h.toString().padStart(2, '0')}:00`}
                </span>
              </div>
            ))}
          </div>

          {/* Colunas dos dias */}
          {weekDays.map((day, dayIndex) => {
            const dateKey = localDateKey(day);
            const dayEvents = events[dateKey] || [];
            const isToday = isSameDate(day, new Date());
            const isWeekend = day.getDay() === 0;

            return (
              <div
                key={dayIndex}
                className={`flex-1 relative border-l border-gray-200 ${isToday ? 'bg-blue-50/20' : ''} ${isWeekend ? 'bg-gray-100/70 opacity-50' : ''}`}
                style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}
              >
                {/* Linhas de hora */}
                {hours.map(h => (
                  <div
                    key={h}
                    className={`absolute left-0 right-0 border-b border-gray-100 ${isWeekend ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50/80'}`}
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                    onClick={() => !isWeekend && onAddEvent(day, h)}
                  />
                ))}

                {/* Linha meia hora */}
                {hours.map(h => (
                  <div
                    key={`half-${h}`}
                    className="absolute left-0 right-0 border-b border-gray-50"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT + HOUR_HEIGHT / 2, height: 0 }}
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
                      className={`${event.color} text-white text-xs rounded-md shadow cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all absolute overflow-hidden px-2 py-1`}
                      style={{ top: style.top + 1, height: style.height - 2, left: 2, right: 2 }}
                    >
                      <div className="font-semibold leading-tight truncate">{event.title}</div>
                      {style.height > 28 && (
                        <div className="opacity-85 leading-tight">
                          {formatEventTime(event.horarioInicio)}
                          {event.horarioFim ? ` – ${formatEventTime(event.horarioFim)}` : ''}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};