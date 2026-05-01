import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import CadastroConsultaModal from '../../modalConsulta/MarcacaoConsultaModal'
import {
  listarAgendaSemanal,
  listarAgendaDiaria,
  listarAgendaMensal,
  normalizarConsultas,
} from '@/src/service/agendamento/agendamento.service';

const toISODate = (date) => {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

// Retorna a segunda-feira da semana que contém `date`
const getMondayOf = (date) => {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  const dow = d.getDay(); // 0=Dom … 6=Sáb
  const diff = dow === 0 ? 1 : 1 - dow; // Dom → +1; outros → volta até segunda
  d.setDate(d.getDate() + diff);
  return d;
};

const CalendarApp = ({
  currentDate,
  setCurrentDate,
  selectedArea,
  selectedProfissional,
  selectedPaciente,
  filterMode = 'profissional',
  funcionarios = [],
  pacientes = [],
  onTiposChange,
  onEventClick,
  refreshKey = 0,
}) => {
  const [view, setView] = useState('week');
  const [events, setEvents] = useState({});
  const [modalState, setModalState] = useState({ isOpen: false, data: null });

  // Resolve IDs a partir dos nomes selecionados
  const selectedFuncionario = React.useMemo(() => {
    if (!selectedProfissional || !funcionarios.length) return null;
    return funcionarios.find(f => f.nome === selectedProfissional) ?? null;
  }, [selectedProfissional, funcionarios]);

  const selectedFuncionarioId = selectedFuncionario?.id ?? null;

  const selectedPacienteObj = React.useMemo(() => {
    if (!selectedPaciente || !pacientes.length) return null;
    return pacientes.find(p => p.nome === selectedPaciente) ?? null;
  }, [selectedPaciente, pacientes]);

  const selectedPacienteId = selectedPacienteObj?.id ?? null;

  // Só há filtro ativo quando um dos dois campos estiver selecionado
  const hasFilter = filterMode === 'profissional' ? !!selectedFuncionarioId : !!selectedPacienteId;

  const fetchEventos = React.useCallback(() => {
    if (!hasFilter) {
      setEvents({});
      return;
    }

    const id = filterMode === 'profissional' ? selectedFuncionarioId : selectedPacienteId;
    const tipo = filterMode === 'profissional' ? 'funcionario' : 'paciente';
    const dataRef = toISODate(currentDate);
    if (view === 'week') {
      const dataRefSemana = toISODate(getMondayOf(currentDate));
      listarAgendaSemanal(id, tipo, dataRefSemana)
        .then(lista => {
          setEvents(normalizarConsultas(lista))
        })
        .catch(console.error);
    } else if (view === 'day') {
      listarAgendaDiaria(id, tipo, dataRef)
        .then(lista => {
          setEvents(normalizarConsultas(lista))
          console.log("Estou no dia")
        })
        .catch(console.error);
    } else {
      listarAgendaMensal(id, tipo, dataRef)
        .then(lista => setEvents(normalizarConsultas(lista)))
        .catch(console.error);
    }
  }, [hasFilter, filterMode, selectedPacienteId, selectedFuncionarioId, view, currentDate]);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  useEffect(() => {
    if (refreshKey > 0) fetchEventos();
  }, [refreshKey, fetchEventos]);

  const filteredEvents = React.useMemo(() => {
    if (!selectedArea) return events;
    const filtrados = {};
    Object.keys(events).forEach(dateKey => {
      const eventosDoDia = events[dateKey].filter(
        ev => ev.funcionario?.especialidade === selectedArea
      );
      if (eventosDoDia.length > 0) filtrados[dateKey] = eventosDoDia;
    });
    return filtrados;
  }, [events, selectedArea]);

  const tiposDeConsultaUnicos = React.useMemo(() => {
    const tipos = new Set();
    Object.values(events || {}).flat().forEach(c => { if (c?.tipo) tipos.add(c.tipo); });
    return Array.from(tipos);
  }, [events]);

  React.useEffect(() => {
    if (onTiposChange) onTiposChange(tiposDeConsultaUnicos);
  }, [tiposDeConsultaUnicos]);

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

  const openCreateModal = (date, hour = 9) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(12, 0, 0, 0); // noon evita shift de timezone no toISOString()
    setModalState({
      isOpen: true,
      data: {
        date: normalizedDate,
        hour,
        pacientePreSelecionado: filterMode === 'paciente' ? selectedPacienteObj : null,
        profissionalPreSelecionado: filterMode === 'profissional' ? selectedFuncionario : null,
      },
    })
    
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    setTimeout(() => fetchEventos(), 200);
  };

  const handleEventClick = (e, event) => {
    if (onEventClick) onEventClick(event);
  };

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12 opacity-40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
      <p className="text-[14px] font-medium">Selecione um profissional ou paciente para visualizar a agenda</p>
    </div>
  );

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
        {!hasFilter ? emptyState : (
          <>
            {view === 'month' && (
              <MonthView
                currentDate={currentDate}
                events={filteredEvents}
                onAddEvent={openCreateModal}
                onEventClick={handleEventClick}
              />
            )}
            {view === 'week' && (
              <WeekView
                currentDate={currentDate}
                events={events}
                onAddEvent={openCreateModal}
                onEventClick={handleEventClick}
              />
            )}
            {view === 'day' && (
              <DayView
                currentDate={currentDate}
                events={events}
                onAddEvent={openCreateModal}
                onEventClick={handleEventClick}
              />
            )}
          </>
        )}
      </main>

      {/* Modal de criação */}
      <CadastroConsultaModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        events={events}
        dataSelecionada={modalState.data?.date?.toISOString().split('T')[0]}
        horaSelecionada={modalState.data?.hour}
        pacientePreSelecionado={modalState.data?.pacientePreSelecionado}
        profissionalPreSelecionado={modalState.data?.profissionalPreSelecionado}
        tiposDeConsulta={tiposDeConsultaUnicos}
      />


    </div>
  );
};

export default CalendarApp;
