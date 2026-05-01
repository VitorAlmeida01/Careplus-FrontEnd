import React, { useState, useEffect } from 'react';
import CalendarApp from '../../components/agendamento/calendario/Index'
import HintCard from '../../components/agendamento/tipes/HintCard';
import Layout from '../../components/layout/Layout'
import FilterBar from '../../components/agendamento/filterBar/FilterBar';
import DetalhesConsultaModal from '../../components/modalConsulta/DetalhesConsultaModal'
import DetalhesConsultaProfissionalModal from '../../components/modalConsulta/DetalhesConsultaProfissionalModal'
import {listarFuncionariosConsulta} from '@/src/service/agendamento/agendamento.service'
import { buscarPacientes } from '@/src/service/pacientes/pacientes.service'
import { buscarFuncionarios } from '@/src/service/funcionarios/funcionarios.service'
import { hasRole } from '@/src/service/login/jwtDecoder'
import useDebouncedValue from '@/src/service/searchEngine/useDebounceValue'


function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [areas, setAreas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionariosBusca, setFuncionariosBusca] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [queryFuncionario, setQueryFuncionario] = useState('');
  const [queryPaciente, setQueryPaciente] = useState('');
  const debouncedQueryFuncionario = useDebouncedValue(queryFuncionario, 300);
  const debouncedQueryPaciente = useDebouncedValue(queryPaciente, 300);

  const [appliedFilters, setAppliedFilters] = useState({
    area: '',
    profissional: '',
    paciente: '',
    modo: 'profissional'
  });

  const [tiposDeConsulta, setTiposDeConsulta] = useState([]);
  const [detalhesModal, setDetalhesModal] = useState({ isOpen: false, consulta: null });
  const [refreshKey, setRefreshKey] = useState(0);
  const isProfissional = hasRole('USER');

  const handleEventClick = (event) => {
    setDetalhesModal({ isOpen: true, consulta: event });
  };

  useEffect(() => {
    listarFuncionariosConsulta().then((response) => {
      setFuncionarios(response.data);
        const areasUnicas = [...new Set(response.data.map(f => f.especialidade).filter(Boolean))];
        setAreas(areasUnicas);
    }).catch (error => {
      console.error('Erro ao buscar funcionários:', error);
    });
  }, []);

  const handleFuncionarioSearch = (query) => {
    setQueryFuncionario(query);
  };

  useEffect(() => {
    if (!debouncedQueryFuncionario || debouncedQueryFuncionario.length < 2) {
      setFuncionariosBusca([]);
      return;
    }
    buscarFuncionarios(debouncedQueryFuncionario).then((data) => {
      setFuncionariosBusca(Array.isArray(data) ? data : []);
    }).catch(error => {
      console.error('Erro ao buscar funcionários:', error);
    });
  }, [debouncedQueryFuncionario]);

  const handlePacienteSearch = (query) => {
    setQueryPaciente(query);
  };

  useEffect(() => {
    if (!debouncedQueryPaciente || debouncedQueryPaciente.length < 2) {
      setPacientes([]);
      return;
    }
    buscarPacientes(debouncedQueryPaciente).then((data) => {
      setPacientes(Array.isArray(data) ? data : []);
    }).catch(error => {
      console.error('Erro ao buscar pacientes:', error);
    });
  }, [debouncedQueryPaciente]);

  const handleFilterDateChange = (dateString) => {
    if (!dateString) return;
    const [y, m, d] = dateString.split('-').map(Number);
    setCurrentDate(new Date(y, m - 1, d, 12, 0, 0));
  };

  return (
    <Layout>

      <div className="App">
        <div className="flex flex-col items-center w-full min-h-screen gap-6 p-4 md:p-6">

          {/* Container do FilterBar */}
          <div className='w-full lg:max-w-[95%] xl:max-w-1200px mx-auto'>
            <FilterBar
              onDateChange={handleFilterDateChange}
              currentDate={currentDate}
              areas={areas}
              funcionarios={funcionariosBusca}
              pacientes={pacientes}
              onApplyFilters={(filtros) => setAppliedFilters(filtros)}
              onFuncionarioSearch={handleFuncionarioSearch}
              onPacienteSearch={handlePacienteSearch}
              tiposDeConsulta={tiposDeConsulta}
            />
          </div>

          {/* Container do HintCard */}
          <div className='w-full lg:max-w-[95%] xl:max-w-1200px mx-auto'>
            <HintCard />
          </div>

          {/* Container do CalendarApp */}
          <div className='w-full lg:max-w-[95%] xl:max-w-1200px mx-auto'>
            <CalendarApp
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedArea={appliedFilters.area}
              selectedProfissional={appliedFilters.profissional}
              selectedPaciente={appliedFilters.paciente}
              filterMode={appliedFilters.modo}
              funcionarios={funcionarios}
              pacientes={pacientes}
              onTiposChange={setTiposDeConsulta}
              onEventClick={handleEventClick}
              refreshKey={refreshKey}
            />

            <DetalhesConsultaModal
              isOpen={detalhesModal.isOpen}
              onClose={() => setDetalhesModal({ isOpen: false, consulta: null })}
              consulta={detalhesModal.consulta}
              onUpdate={() => {
                setDetalhesModal({ isOpen: false, consulta: null });
                setRefreshKey(k => k + 1);
              }}
              allFuncionarios={funcionarios}
              tiposDeConsulta={tiposDeConsulta}
            />
          </div>

        </div>
      </div>
    </Layout>

  );
}

export default App;