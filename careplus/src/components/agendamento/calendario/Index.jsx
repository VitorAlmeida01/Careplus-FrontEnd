import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { EventModal } from './EventoModal';
import { generateId, getRandomColor } from './utils';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Usando props para atualizar a data e opções de area a selecionar.
const CalendarApp = ({ currentDate, setCurrentDate, selectedArea }) => {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState({}); 
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, data: null, isReadOnly: false });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axiosInstance.get('/consultas-prontuario', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mapaEventos = response.data.reduce((acc, evento) => {
          const dataKey = evento.dataHora.split(' ')[0];
          const eventoFormatado = {
            ...evento,
            date: new Date(evento.dataHora.replace(' ', 'T')),
            title: `${evento.paciente.nome} - ${evento.tipo}`,
            color: 'bg-blue-500'
          };
          if (!acc[dataKey]) acc[dataKey] = [];
          acc[dataKey].push(eventoFormatado);
          return acc;
        }, {});

        setEvents(mapaEventos);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEvents();
  }, []);99

  const filteredEvents = React.useMemo(() => {
    if (!selectedArea) return events; 

    const filtrados = {};
    Object.keys(events).forEach(dateKey => {
      const eventosDoDia = events[dateKey].filter(
        ev => ev.funcionario?.cargo === selectedArea
      );
      
      if (eventosDoDia.length > 0) {
        filtrados[dateKey] = eventosDoDia;
      }
    });
    return filtrados;
  }, [events, selectedArea]);

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate.getTime());
    const amount = direction === 'next' ? 1 : -1;

    if (view === 'month') {
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + amount);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (7 * amount));
    } else {
      newDate.setDate(newDate.getDate() + amount);
    }

    setCurrentDate(newDate);
  };

  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => e.preventDefault();

  // handleDrop: função para arrastar os eventos(consultas)
  const handleDrop = (e, targetDate, targetHour = null) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const sourceDateKey = draggedEvent.date.toISOString().split('T')[0];
    const targetDateKey = targetDate.toISOString().split('T')[0];

    setEvents(prev => {
      // Cria uma cópia do objeto de eventos atual
      const newEvents = { ...prev };

      // Remove o evento do dia de origem
      if (newEvents[sourceDateKey]) {
        newEvents[sourceDateKey] = newEvents[sourceDateKey].filter(ev => ev.id !== draggedEvent.id);
      }

      // Prepara o evento atualizado com a nova data e hora
      const updatedEvent = { ...draggedEvent, date: targetDate, hour: targetHour ?? draggedEvent.hour };

      // Adiciona o evento no dia de destino
      newEvents[targetDateKey] = [...(newEvents[targetDateKey] || []), updatedEvent];

      return newEvents;
    });

    setDraggedEvent(null);
  };

  // Salva um evento como objeto, quando o modal estiver pronto é só adaptar para estar no padrão do back-end
  const saveEvent = (title) => {
    const newEvent = {
      id: generateId(),
      title,
      date: modalState.data.date,
      hour: modalState.data.hour,
      color: getRandomColor()
    };

    // Descobre em qual lugar (chave) do objeto ele deve ser guardado.
    const dateKey = newEvent.date.toISOString().split('T')[0];

    // Pega a lista existente desse dia (ou uma lista vazia) e adiciona o novo no calendario
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));

    setModalState({ isOpen: false, data: null });
  };

  // Aguardando Modal do Bruno para chmar ele aqui.
  const openCreateModal = (date, hour = 9) => {
    setModalState({ isOpen: true, data: { date, hour }, isReadOnly: false });
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setModalState({ isOpen: true, data: event, isReadOnly: true });
  };



  return (
    <div className="w-full p-6 font-sans text-gray-900">
      <Header
        currentDate={currentDate}
        view={view}
        setView={setView}
        onNext={() => handleNavigate('next')}
        onPrev={() => handleNavigate('prev')}
        onToday={() => setCurrentDate(new Date())}
      />

      <main className="bg-gray-50 rounded-lg shadow-sm">
        {view === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={filteredEvents}
            onAddEvent={openCreateModal}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEventClick={handleEventClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onAddEvent={openCreateModal}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEventClick={handleEventClick}
          />
        )}
        {view === 'day' && (
          <DayView
            currentDate={currentDate}
            events={events}
            onAddEvent={openCreateModal}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEventClick={handleEventClick}
          />
        )}
      </main>

        {/* Modal do bruno vai ficar aqui */}
       <EventModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
        onSave={saveEvent} 
      />
    </div>
  );
};

export default CalendarApp;
