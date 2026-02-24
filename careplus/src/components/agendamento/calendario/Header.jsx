import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { months } from './utils';

export const Header = ({ currentDate, view, setView, onNext, onPrev, onToday }) => {
  return (
  <header className="flex flex-wrap items-center justify-between mb-6 gap-y-4 gap-x-2 border-b pb-4">
    
    <div className="flex items-center gap-3 min-w-max">
      <div className="bg-indigo-600 p-2 rounded-lg text-white shrink-0">
        <CalendarIcon size={22} />
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">
        Meu Calendário
      </h1>
    </div>

    {/* Controles de Navegação (Setas e Hoje) */}
    <div className="flex items-center bg-white shadow-sm border border-gray-200 rounded-lg p-1 min-w-max">
      <button onClick={onPrev} className="p-2 hover:bg-gray-100 rounded-md transition shrink-0">
        <ChevronLeft size={20} />
      </button>
      <button onClick={onToday} className="px-4 py-1 text-sm font-medium hover:bg-gray-100 rounded-md transition whitespace-nowrap">
        Hoje
      </button>
      <button onClick={onNext} className="p-2 hover:bg-gray-100 rounded-md transition shrink-0">
        <ChevronRight size={20} />
      </button>
    </div>
    
    {/* Data Atual - fica o mês e ano - EX. Janeiro 2026 */}
    <div className="text-lg font-semibold text-gray-700 min-w-160px text-center px-2">
      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
    </div>

    {/* Seletores de Visualização (Mês/Semana/Dia) */}
    <div className="flex bg-gray-100 p-1 rounded-lg min-w-max ml-auto sm:ml-0">
      {['month', 'week', 'day'].map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
            view === v ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {v === 'month' && 'Mês'}
          {v === 'week' && 'Semana'}
          {v === 'day' && 'Dia'}
        </button>
      ))}
    </div>

  </header>
);
};