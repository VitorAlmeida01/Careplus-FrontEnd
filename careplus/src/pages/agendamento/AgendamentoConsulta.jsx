import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarApp from '../../components/agendamento/calendario'
import HintCard from '../../components/agendamento/tipes/HintCard';
import Layout from '../../components/layout/Layout'
import FilterBar from '../../components/agendamento/filterBar/FilterBar';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

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
    const fetchAreas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/funcionarios', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFuncionarios(res.data);
        const cargosUnicos = [...new Set(res.data.map(f => f.cargo).filter(Boolean))];
        setAreas(cargosUnicos);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };
    fetchAreas();
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