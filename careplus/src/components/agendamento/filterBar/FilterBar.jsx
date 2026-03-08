import React, { useState, useMemo } from 'react';
// import IniciarConsultaModal from '../../modalConsulta/IniciarConsultaModal';
import CadastroFuncionarioModal from '../../modalConsulta/MarcacaoConsultaModal'

const FilterBar = ({ 
  onDateChange, 
  selectedDate, 
  areas = [], 
  funcionarios = [], // Agora recebemos a lista bruta de funcionários do App
  onApplyFilters //Função disparada pelo botão Aplicar
}) => {
  const [inputType, setInputType] = useState("text");

  //Estado Modal
  const [modal, setModal] = useState(false);

  // ESTADOS DE RASCUNHO (Só vivem aqui até clicar em aplicar)
  const [tempArea, setTempArea] = useState("");
  const [tempProfissional, setTempProfissional] = useState("");
  // Regra: Se tem área selecionada, mostra os profissionais dela. 
  const profissionaisFiltrados = useMemo(() => {
    if (!tempArea) return funcionarios;
    return funcionarios.filter(func => func.cargo === tempArea);
  }, [funcionarios, tempArea]);

  const handleAreaChange = (e) => {
    setTempArea(e.target.value);
    setTempProfissional(""); // Limpa o profissional se a área mudar
  };

  // Aplicar filtros
  const handleApplyClick = () => {
    // Envia os rascunhos para o App.jsx
    onApplyFilters({
      area: tempArea,
      profissional: tempProfissional
    });
  };

return (
  <div className="bg-white rounded-[20px] p-3 shadow-sm w-full flex flex-wrap items-center justify-between gap-3">
    
    {/* Grupo da Esquerda: Filtros */}
    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full sm:flex-1 sm:min-w-300px">
      
      <span className="text-slate-600 font-medium text-[14px] px-1 whitespace-nowrap w-full sm:w-auto text-left">
        Filtros
      </span>

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full sm:flex-1">
        
        {/* Seletor de Data */}
        <div className="flex items-center bg-[#F4F4F5] hover:bg-[#e4e4e7] rounded-xl px-3 py-2 transition-colors focus-within:ring-2 focus-within:ring-[#2B8BFF]/40 w-full sm:flex-1 sm:min-w-140px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-500 mr-2 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <input 
            type={selectedDate ? "date" : inputType}
            placeholder="Data"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            onFocus={() => setInputType("date")}
            onBlur={() => { if (!selectedDate) setInputType("text"); }}
            className="bg-transparent text-slate-600 text-[13px] outline-none w-full font-medium"
          />
        </div>

        {/* Seletor de Área */}
        <div className="relative w-full sm:flex-1 sm:min-w-110px">
          <select
            value={tempArea}
            onChange={handleAreaChange}
            className="w-full appearance-none bg-[#F4F4F5] hover:bg-[#e4e4e7] text-slate-600 px-3 py-2 rounded-xl text-[13px] outline-none cursor-pointer pr-8"
          >
            <option value="">Área</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* Seletor de Profissional */}
        <div className="relative w-full sm:flex-1 sm:min-w-150px">
          <select
            value={tempProfissional}
            onChange={(e) => setTempProfissional(e.target.value)}
            className="w-full appearance-none bg-[#F4F4F5] hover:bg-[#e4e4e7] text-slate-600 px-3 py-2 rounded-xl text-[13px] outline-none cursor-pointer pr-8"
          >
            <option value="">Profissional</option>
            {profissionaisFiltrados.map((prof) => (
              <option key={prof.id} value={prof.nome}>{prof.nome}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Botão Aplicar*/}
      <button 
        onClick={handleApplyClick} 
        className="bg-[#2B8BFF] hover:bg-[#1A7AEB] text-white px-5 py-2 rounded-xl text-[13px] font-medium transition-colors whitespace-nowrap w-full sm:w-auto"
      >
        Aplicar
      </button>
    </div>

    {/* Botão Nova Consulta */}
    <div className="w-full sm:w-auto">
      <button onClick={()=> setModal(true)} className="bg-[#00D2A0] hover:bg-[#00C092] text-white flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-[13px] font-medium w-full transition-colors whitespace-nowrap" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Nova Consulta
      </button>
      <CadastroFuncionarioModal 
      isOpen={modal} onClose={() => setModal(false)} 
      />
    </div>
  </div>
);};

export default FilterBar;