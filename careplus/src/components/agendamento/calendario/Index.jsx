import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import CadastroConsultaModal from '../../modalConsulta/MarcacaoConsultaModal'
import { listarConsultas } from '@/src/service/agendamento/agendamento.service';

// Usando props para atualizar a data e opções de area a selecionar.
const CalendarApp = ({ currentDate, setCurrentDate, selectedArea }) => {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState({});
  // const [draggedEvent, setDraggedEvent] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, data: null, isReadOnly: false });

  const fetchConsultas = () => {
    listarConsultas().then((response) => {
      setEvents(response);
    }).catch(error => {
      console.error("Erro ao buscar consultas:", error);
    });
  };

  useEffect(() => {
    fetchConsultas();
  }, []);


  const filteredEvents = React.useMemo(() => {
    if (!selectedArea) return events;

    const filtrados = {};
    Object.keys(events).forEach(dateKey => {
      const eventosDoDia = events[dateKey].filter(
        ev => ev.funcionario?.especialidade === selectedArea
      );

      if (eventosDoDia.length > 0) {
        filtrados[dateKey] = eventosDoDia;
      }
    });
    return filtrados;
  }, [events, selectedArea]);

  const tiposDeConsultaUnicos = React.useMemo(() => {
    const todosOsDias = Object.values(events || {});
    // transformar em uma lista única de consultas
    const todasAsConsultas = todosOsDias.flat();
    const tipos = new Set();

    todasAsConsultas.forEach(consulta => {
      if (consulta?.tipo) tipos.add(consulta.tipo);
    });

    const resultado = Array.from(tipos);
    return resultado;
  }, [events]);

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

  // const handleDragStart = (e, event) => {
  //   setDraggedEvent(event);
  //   e.dataTransfer.effectAllowed = 'move';
  // };

  // Aguardando Modal do Bruno para chmar ele aqui.
  const openCreateModal = (date, hour = 9) => {
    setModalState({ isOpen: true, data: { date, hour }, isReadOnly: false });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    setTimeout(() => {
    fetchConsultas();
  }, 200);
  };

  const handleEventClick = (event) => {
    setModalState({ isOpen: true, data: event, isReadOnly: true });
  };


  return (
    <div className="w-full py-6 font-sans text-gray-900">
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
            // onDragStart={handleDragStart}
            // onDragOver={handleDragOver}
            // onDrop={handleDrop}
            onEventClick={handleEventClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onAddEvent={openCreateModal}
            // onDragStart={handleDragStart}
            // onDragOver={handleDragOver}
            // onDrop={handleDrop}
            onEventClick={handleEventClick}
          />
        )}
        {view === 'day' && (
          <DayView
            currentDate={currentDate}
            events={events}
            onAddEvent={openCreateModal}
            // onDragStart={handleDragStart}
            // onDragOver={handleDragOver}
            // onDrop={handleDrop}
            onEventClick={handleEventClick}
          />
        )}
      </main>

      {/* Modal do bruno vai ficar aqui */}
      <CadastroConsultaModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        events={events}
        dataSelecionada={modalState.data?.date?.toISOString().split('T')[0]}
        tiposDeConsulta={tiposDeConsultaUnicos}
      />
    </div>
  );
};

export default CalendarApp;
