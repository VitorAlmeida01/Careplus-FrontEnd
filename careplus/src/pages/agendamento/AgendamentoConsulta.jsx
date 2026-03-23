import React, { useState, useEffect } from 'react';
import CalendarApp from '../../components/agendamento/calendario/Index'
import HintCard from '../../components/agendamento/tipes/HintCard';
import Layout from '../../components/layout/Layout'
import FilterBar from '../../components/agendamento/filterBar/FilterBar';
import {listarFuncionariosConsulta} from '@/src/service/agendamento/agendamento.service'


function App() {
  const [currentDate, setCurrentDate] = useState(new Date());


  const [areas, setAreas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState({
    area: '',
    profissional: ''
  });

  // Busca os funcionários apenas para extrair os cargos para o Select
  useEffect(() => {
    listarFuncionariosConsulta().then((response) => {
      setFuncionarios(response.data);
        const areasUnicas = [...new Set(response.data.map(f => f.especialidade).filter(Boolean))];
        setAreas(areasUnicas);
    }).catch (error => {
      console.error('Erro ao buscar funcionários:', error);
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
              onApplyFilters={(filtros) => setAppliedFilters(filtros)}
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
            />
          </div>

        </div>
      </div>
    </Layout>

  );
}

export default App;