import React, { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/layout/Layout'
import { Header } from '../../components/agendamento/calendario/Header'
import { MonthView } from '../../components/agendamento/calendario/MonthView'
import { WeekView } from '../../components/agendamento/calendario/WeekView'
import { DayView } from '../../components/agendamento/calendario/DayView'
import CadastroConsultaModal from '../../components/modalConsulta/MarcacaoConsultaModal'
import DetalhesConsultaModal from '../../components/modalConsulta/DetalhesConsultaModal'
import DetalhesConsultaProfissionalModal from '../../components/modalConsulta/DetalhesConsultaProfissionalModal'
import {
  listarAgendaSemanal,
  listarAgendaDiaria,
  listarAgendaMensal,
  normalizarConsultas,
} from '../../service/agendamento/agendamento.service'
import { getFuncionarioId, getFuncionarioNome, hasRole } from '../../service/login/jwtDecoder'

const toISODate = (date) => {
  const d = new Date(date)
  d.setHours(12, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

const getMondayOf = (date) => {
  const d = new Date(date)
  d.setHours(12, 0, 0, 0)
  const dow = d.getDay()
  const diff = dow === 0 ? 1 : 1 - dow
  d.setDate(d.getDate() + diff)
  return d
}

export default function Consultas() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('week')
  const [events, setEvents] = useState({})
  const [modalState, setModalState] = useState({ isOpen: false, data: null })
  const [detalhesModal, setDetalhesModal] = useState({ isOpen: false, consulta: null })
  const [tiposDeConsulta, setTiposDeConsulta] = useState([])

  const funcionarioId = getFuncionarioId()
  const funcionarioNome = getFuncionarioNome()
  const isProfissional = hasRole('USER')

  const fetchEventos = useCallback(() => {
    if (!funcionarioId) return

    const dataRef = toISODate(currentDate)

    if (view === 'week') {
      listarAgendaSemanal(funcionarioId, 'funcionario', toISODate(getMondayOf(currentDate)))
        .then((lista) => setEvents(normalizarConsultas(lista)))
        .catch(console.error)
    } else if (view === 'day') {
      listarAgendaDiaria(funcionarioId, 'funcionario', dataRef)
        .then((lista) => setEvents(normalizarConsultas(lista)))
        .catch(console.error)
    } else {
      listarAgendaMensal(funcionarioId, 'funcionario', dataRef)
        .then((lista) => setEvents(normalizarConsultas(lista)))
        .catch(console.error)
    }
  }, [funcionarioId, view, currentDate])

  useEffect(() => {
    fetchEventos()
  }, [fetchEventos])

  useEffect(() => {
    const tipos = new Set()
    Object.values(events || {}).flat().forEach((c) => { if (c?.tipo) tipos.add(c.tipo) })
    setTiposDeConsulta(Array.from(tipos))
  }, [events])

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate.getTime())
    const amount = direction === 'next' ? 1 : -1
    if (view === 'month') {
      newDate.setDate(1)
      newDate.setMonth(newDate.getMonth() + amount)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7 * amount)
    } else {
      newDate.setDate(newDate.getDate() + amount)
    }
    setCurrentDate(newDate)
  }

  const openCreateModal = (date, hour = 9) => {
    const normalizedDate = new Date(date)
    normalizedDate.setHours(12, 0, 0, 0)
    setModalState({
      isOpen: true,
      data: {
        date: normalizedDate,
        hour,
        profissionalPreSelecionado: funcionarioId ? { id: funcionarioId, nome: funcionarioNome } : null,
      },
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
    setTimeout(() => fetchEventos(), 200)
  }

  const handleEventClick = (_, event) => {
    setDetalhesModal({ isOpen: true, consulta: event })
  }

  return (
    <Layout>
      <div className="w-full h-full px-4 md:px-6 py-4">
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
              events={events}
              // onAddEvent={openCreateModal}
              onEventClick={handleEventClick}
            />
          )}
          {view === 'week' && (
            <WeekView
              currentDate={currentDate}
              events={events}
              // onAddEvent={openCreateModal}
              onEventClick={handleEventClick}
            />
          )}
          {view === 'day' && (
            <DayView
              currentDate={currentDate}
              events={events}
              // onAddEvent={openCreateModal}
              onEventClick={handleEventClick}
            />
          )}
        </main>
        {/* Comentado para que o funcionario não possa marcar uma consulta */}
        {/* <CadastroConsultaModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          events={events}
          dataSelecionada={modalState.data?.date?.toISOString().split('T')[0]}
          horaSelecionada={modalState.data?.hour}
          profissionalPreSelecionado={modalState.data?.profissionalPreSelecionado}
          tiposDeConsulta={tiposDeConsulta}
        /> */}


          <DetalhesConsultaProfissionalModal
            isOpen={detalhesModal.isOpen}
            onClose={() => setDetalhesModal({ isOpen: false, consulta: null })}
            consulta={detalhesModal.consulta}
          />

      </div>
    </Layout>
  )
}
