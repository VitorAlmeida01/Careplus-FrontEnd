import React, { useState, useEffect } from 'react';
import CalendarApp from '../../components/agendamento/calendario/Index'
import HintCard from '../../components/agendamento/tipes/HintCard';
import Layout from '../../components/layout/Layout'
import FilterBar from '../../components/agendamento/filterBar/FilterBar';
import {listarFuncionariosConsulta} from '@/src/service/agendamento/agendamento.service'
import { listarPacitentes } from '@/src/service/pacientes/pacientes.service'


function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [areas, setAreas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState({
    area: '',
    profissional: '',
    paciente: '',
    modo: 'profissional'
  });

  const [tiposDeConsulta, setTiposDeConsulta] = useState([]);

  useEffect(() => {
    listarFuncionariosConsulta().then((response) => {
      setFuncionarios(response.data);
        const areasUnicas = [...new Set(response.data.map(f => f.especialidade).filter(Boolean))];
        setAreas(areasUnicas);
    }).catch (error => {
      console.error('Erro ao buscar funcionários:', error);
    });

    listarPacitentes(0).then((response) => {
      setPacientes(response.content ?? []);
    }).catch(error => {
      console.error('Erro ao buscar pacientes:', error);
    });
  }, []);

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
              funcionarios={funcionarios}
              pacientes={pacientes}
              onApplyFilters={(filtros) => setAppliedFilters(filtros)}
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
            />
          </div>

        </div>
      </div>
    </Layout>

  );
}

export default App;