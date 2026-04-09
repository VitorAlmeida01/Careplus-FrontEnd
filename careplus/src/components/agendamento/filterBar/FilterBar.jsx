import React, { useState, useMemo, useRef, useEffect as useEffectDOM } from 'react';
// import IniciarConsultaModal from '../../modalConsulta/IniciarConsultaModal';
import CadastroFuncionarioModal from '../../modalConsulta/MarcacaoConsultaModal'
import { toast} from 'react-toastify'

function AutocompleteInput({ lista, valor, onChange, placeholder, icone }) {
  const [query, setQuery] = useState(valor || "");
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef(null);

  const sugestoes = useMemo(() => {
    if (query.length < 2) return [];
    return lista.filter(item =>
      item.nome.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, lista]);

  useEffectDOM(() => {
    setQuery(valor || "");
  }, [valor]);

  useEffectDOM(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (nome) => {
    setQuery(nome);
    onChange(nome);
    setAberto(false);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onChange("");
    setAberto(true);
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    setAberto(false);
  };

  return (
    <div ref={containerRef} className="relative w-full sm:flex-1 sm:min-w-150px">
      <div className="flex items-center bg-[#F4F4F5] hover:bg-[#e4e4e7] rounded-xl px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#2B8BFF]/40 transition-colors">
        <span className="shrink-0 text-slate-400">{icone}</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => { if (query.length >= 2) setAberto(true); }}
          placeholder={placeholder}
          className="bg-transparent text-slate-600 text-[13px] outline-none w-full"
        />
        {query && (
          <button type="button" onClick={handleClear} className="shrink-0 text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {aberto && sugestoes.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
          {sugestoes.map(item => (
            <li
              key={item.id}
              onMouseDown={() => handleSelect(item.nome)}
              className="px-3 py-2 text-[13px] text-slate-700 hover:bg-[#EEF4FF] cursor-pointer"
            >
              {item.nome}
            </li>
          ))}
        </ul>
      )}
      {aberto && query.length >= 2 && sugestoes.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2 text-[13px] text-slate-400">
          Nenhum resultado encontrado
        </div>
      )}
    </div>
  );
}

const FilterBar = ({ 
  onDateChange, 
  selectedDate, 
  areas = [], 
  funcionarios = [],
  pacientes = [],
  onApplyFilters
}) => {
  const [inputType, setInputType] = useState("text");
  const [modal, setModal] = useState(false);
  const [modo, setModo] = useState("profissional");

  const [tempArea, setTempArea] = useState("");
  const [tempProfissional, setTempProfissional] = useState("");
  const [tempPaciente, setTempPaciente] = useState("");

  const profissionaisFiltrados = useMemo(() => {
    if (!tempArea) return funcionarios;
    return funcionarios.filter(func => func.especialidade === tempArea);
  }, [funcionarios, tempArea]);

  const handleAreaChange = (e) => {
    setTempArea(e.target.value);
    setTempProfissional("");
  };

  const handleModoChange = (novoModo) => {
    setModo(novoModo);
    setTempProfissional("");
    setTempPaciente("");
    setTempArea("");
  };

  const handleApplyClick = () => {
    onApplyFilters({
      modo,
      area: tempArea,
      profissional: tempProfissional,
      paciente: tempPaciente,
    });
    toast.success("Filtros aplicados com sucesso!")
  };

return (
  <div className="bg-white rounded-[20px] p-3 shadow-sm w-full flex flex-wrap items-center justify-between gap-3">
    
    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full sm:flex-1 sm:min-w-300px">
      
      {/* Label Filtros */}
      <span className="text-slate-600 font-medium text-[14px] px-1 whitespace-nowrap w-full sm:w-auto text-left flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        Filtros
      </span>

      {/* Toggle Profissional / Paciente */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 shrink-0">
        <button
          type="button"
          onClick={() => handleModoChange("profissional")}
          className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors whitespace-nowrap ${
            modo === "profissional"
              ? "bg-[#2B8BFF] text-white"
              : "bg-white text-slate-600 hover:bg-gray-50"
          }`}
        >
          {/* Stethoscope icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          Profissional
        </button>
        <button
          type="button"
          onClick={() => handleModoChange("paciente")}
          className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors whitespace-nowrap ${
            modo === "paciente"
              ? "bg-[#2B8BFF] text-white"
              : "bg-white text-slate-600 hover:bg-gray-50"
          }`}
        >
          {/* Person icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          Paciente
        </button>
      </div>

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

        {/* Seletor de Área (sempre visível) */}
        <div className="relative w-full sm:flex-1 sm:min-w-110px">
          <select value={tempArea} onChange={handleAreaChange} className="w-full appearance-none bg-[#F4F4F5] hover:bg-[#e4e4e7] text-slate-600 px-3 py-2 rounded-xl text-[13px] outline-none cursor-pointer pr-8">
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

        {/* Input dinâmico: Profissional ou Paciente */}
        {modo === "profissional" ? (
          <AutocompleteInput
            lista={profissionaisFiltrados}
            valor={tempProfissional}
            onChange={setTempProfissional}
            placeholder="Profissional"
            icone={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            }
          />
        ) : (
          <AutocompleteInput
            lista={pacientes}
            valor={tempPaciente}
            onChange={setTempPaciente}
            placeholder="Paciente"
            icone={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          />
        )}
      </div>

      {/* Botão Aplicar */}
      <button 
        onClick={handleApplyClick} 
        className="bg-[#2B8BFF] hover:bg-[#1A7AEB] text-white flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-medium transition-colors whitespace-nowrap w-full sm:w-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
        </svg>
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