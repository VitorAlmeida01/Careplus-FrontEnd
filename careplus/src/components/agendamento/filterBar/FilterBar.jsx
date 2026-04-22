import React, { useState, useMemo, useRef, useEffect as useEffectDOM } from 'react';
// import IniciarConsultaModal from '../../modalConsulta/IniciarConsultaModal';
import CadastroFuncionarioModal from '../../modalConsulta/MarcacaoConsultaModal'
import { toast} from 'react-toastify'
import { notificarResponsavel } from '@/src/service/agendamento/agendamento.service'

function AutocompleteInput({ lista, valor, onChange, onQueryChange, placeholder, icone }) {
  const [query, setQuery] = useState(valor || "");
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef(null);

  const sugestoes = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return lista.filter(item =>
      (item.nome && item.nome.toLowerCase().includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.documento && item.documento.toLowerCase().includes(q)) ||
      (item.cpf && item.cpf.toLowerCase().includes(q))
    );
  }, [query, lista]);

  useEffectDOM(() => {
    if (valor) setQuery(valor);
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
    if (onQueryChange) onQueryChange(e.target.value);
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
                <p>{item.nome}</p>
                <p className="text-gray-400">{item.email}</p>
                {/* {
                  item.cpf != null ? <p className="text-gray-400">{item.cpf}</p> : <p className="text-gray-400">{item.documento}</p>
                } */}
              

              
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
  onApplyFilters,
  onFuncionarioSearch,
  onPacienteSearch,
  currentDate,
  tiposDeConsulta = [],
}) => {
  const [inputType, setInputType] = useState("text");
  const [modal, setModal] = useState(false);
  const [confirmarNotificacao, setConfirmarNotificacao] = useState(false);
  const [enviandoNotificacao, setEnviandoNotificacao] = useState(false);
  const [modo, setModo] = useState("profissional");

  // const [tempArea, setTempArea] = useState("");
  const [tempProfissional, setTempProfissional] = useState("");
  const [tempPaciente, setTempPaciente] = useState("");

  const profissionaisFiltrados = useMemo(() => {
    // if (!tempArea) return funcionarios;
    return funcionarios;
  }, [funcionarios]);

  const handleAreaChange = (e) => {
    // setTempArea(e.target.value);
    setTempProfissional("");
  };

  const handleModoChange = (novoModo) => {
    setModo(novoModo);
    setTempProfissional("");
    setTempPaciente("");
    // setTempArea("");
  };

  const handleApplyClick = () => {
    onApplyFilters({
      modo,
      // area: tempArea,
      profissional: tempProfissional,
      paciente: tempPaciente,
    });
    toast.success("Filtros aplicados com sucesso!")
  };

  const selectedPacienteObj = useMemo(() => {
    if (!tempPaciente || !pacientes.length) return null;
    return pacientes.find(p => p.nome === tempPaciente) ?? null;
  }, [tempPaciente, pacientes]);

  const toISODate = (date) => {
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    return d.toISOString().split('T')[0];
  };

  const handleEnviarNotificacao = async () => {
    if (!selectedPacienteObj) return;
    setEnviandoNotificacao(true);
    try {
      const dataRef = currentDate ? toISODate(currentDate) : toISODate(new Date());
      await notificarResponsavel(selectedPacienteObj.id, dataRef);
      toast.success("Notificação enviada com sucesso!");
      setConfirmarNotificacao(false);
    } catch (error) {
      toast.error("Erro ao enviar notificação.");
    } finally {
      setEnviandoNotificacao(false);
    }
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
        {/* <div className="relative w-full sm:flex-1 sm:min-w-110px">
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
        </div> */}

        {/* Input dinâmico: Profissional ou Paciente */}
        {modo === "profissional" ? (
          <AutocompleteInput
            lista={profissionaisFiltrados}
            valor={tempProfissional}
            onChange={setTempProfissional}
            onQueryChange={(q) => onFuncionarioSearch && onFuncionarioSearch(q)}
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
            onQueryChange={(q) => onPacienteSearch && onPacienteSearch(q)}
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

    {/* Botão Enviar Notificação (só no modo paciente com paciente selecionado) */}
    {modo === "paciente" && selectedPacienteObj && (
      <div className="w-full sm:w-auto">
        <button
          onClick={() => setConfirmarNotificacao(true)}
          className="bg-[#F59E0B] hover:bg-[#D97706] text-white flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-[13px] font-medium w-full transition-colors whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          Enviar notificação
        </button>
      </div>
    )}

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
      tiposDeConsulta={tiposDeConsulta}
      />
    </div>

    {/* Modal de confirmação de notificação */}
    {confirmarNotificacao && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FEF3C7]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F59E0B" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h3 className="text-[16px] font-semibold text-slate-800">Confirmar envio de notificação</h3>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl p-4 mb-5 space-y-2">
            <p className="text-[13px] text-slate-600">
              <span className="font-medium text-slate-700">Paciente:</span> {selectedPacienteObj?.nome}
            </p>
            <p className="text-[13px] text-slate-600">
              <span className="font-medium text-slate-700">Data de referência:</span> {currentDate ? toISODate(currentDate) : toISODate(new Date())}
            </p>
            <p className="text-[13px] text-slate-500 mt-2">
              O responsável pelo paciente será notificado sobre as consultas agendadas.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setConfirmarNotificacao(false)}
              disabled={enviandoNotificacao}
              className="px-4 py-2 rounded-xl text-[13px] font-medium text-slate-600 bg-[#F4F4F5] hover:bg-[#e4e4e7] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleEnviarNotificacao}
              disabled={enviandoNotificacao}
              className="px-4 py-2 rounded-xl text-[13px] font-medium text-white bg-[#F59E0B] hover:bg-[#D97706] transition-colors flex items-center gap-2"
            >
              {enviandoNotificacao ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Enviando...
                </>
              ) : 'Confirmar envio'}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);};

export default FilterBar;