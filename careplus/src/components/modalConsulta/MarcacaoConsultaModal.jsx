import React, { useEffect, useState } from "react"
import "./ConsultaModal.css"
import Modal from "react-modal"
import { buscarPacientePorNome, marcarConsulta } from '@/src/service/agendamento/consulta.service'
import { listarFuncionariosConsulta } from '@/src/service/agendamento/agendamento.service'
import { marcarConsultaRecorrente } from '@/src/service/agendamento/consulta.service'
import { toast } from "react-toastify"

Modal.setAppElement("#root")
//esse

export default function CadastroFuncionarioModal({ isOpen, onClose, events, dataSelecionada, tiposDeConsulta = [] }) {

  const [nome, setNome] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [areaSelecionada, setAreaSelecionada] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const slotsDisponiveis = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const horariosOcupados = (events && dataSelecionada && events[dataSelecionada])
    ? events[dataSelecionada].map(event => event.hour)
    : [];

  const horariosLivres = slotsDisponiveis.filter(horario =>
    !horariosOcupados.includes(horario)
  );



  useEffect(() => {
    if (!isOpen) return;

    const carregarDadosIniciais = async () => {
      try {
        const resFuncionarios = await listarFuncionariosConsulta();
        setFuncionarios(resFuncionarios.data);

        const areasUnicas = [...new Set(resFuncionarios.data.map(f => f.especialidade).filter(Boolean))];
        setAreas(areasUnicas);

        if (tiposDeConsulta.length > 0 && tipoSelecionado === '') {
         console.log("Tipos carregados com sucesso no Modal!");
        }

        if (nome && nome.length >= 2) {
          setLoading(true);
          const dadosPacientes = await buscarPacientePorNome(nome);
          setSugestoes(dadosPacientes || []);
        } else {
          setSugestoes([]);
        }
      } catch (error) {
        console.error('Erro na carga de dados:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosIniciais();

  }, [isOpen, nome]);

let tiposCache = [];

export default function CadastroFuncionarioModal({ isOpen, onClose, events, dataSelecionada, tiposDeConsulta = [] }) {

  const [nome, setNome] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [areaSelecionada, setAreaSelecionada] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [listaTipos, setListaTipos] = useState(() => tiposCache);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');

  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [dataSelecionadaLocal, setDataSelecionadaLocal] = useState(dataSelecionada || '');

  // --- Recorrência ---
  const [recorrenciaAtiva, setRecorrenciaAtiva] = useState(false);
  const [dataRecorrencia, setDataRecorrencia] = useState('');
  const [datasRecorrencia, setDatasRecorrencia] = useState([]);

  const slotsDisponiveis = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const horariosOcupados = (events && dataSelecionadaLocal && events[dataSelecionadaLocal])
    ? events[dataSelecionadaLocal].map(event => event.hour)
    : [];

  const horariosLivres = slotsDisponiveis.filter(horario =>
    !horariosOcupados.includes(horario)
  );

  useEffect(() => {
    if (!isOpen) return;

    const carregarDadosIniciais = async () => {
      try {
        const resFuncionarios = await listarFuncionariosConsulta();
        setFuncionarios(resFuncionarios.data);
        const areasUnicas = [...new Set(resFuncionarios.data.map(f => f.especialidade).filter(Boolean))];
        setAreas(areasUnicas);
        setListaTipos(tiposCache);
      } catch (error) {
        console.error('Erro na carga:', error);
      }
    };

    carregarDadosIniciais();
  }, [isOpen]);

  useEffect(() => {
    if (Array.isArray(tiposDeConsulta) && tiposDeConsulta.length > 0) {
      tiposCache = tiposDeConsulta;
      setListaTipos(tiposDeConsulta);
    }
  }, [tiposDeConsulta]);

  useEffect(() => {
    if (isOpen && nome?.length >= 2) {
      const buscar = async () => {
        const dados = await buscarPacientePorNome(nome);
        setSugestoes(dados || []);
      };
      buscar();
    } else {
      setSugestoes([]);
    }
  }, [nome, isOpen]);

  const handleClose = () => {
    setNome('');
    setPacienteSelecionado(null);
    setSugestoes([]);
    setAreaSelecionada('');
    setFuncionarioSelecionado('');
    setDataSelecionadaLocal(dataSelecionada || '');
    setHorarioSelecionado('');
    setTipoSelecionado('');
    setRecorrenciaAtiva(false);
    setDataRecorrencia('');
    setDatasRecorrencia([]);
    onClose();
  };

  // Adiciona uma data à lista de recorrência (sem duplicatas)
  const handleAdicionarDataRecorrencia = () => {
    if (!dataRecorrencia) {
      toast.warning("Selecione uma data para adicionar.");
      return;
    }
    if (datasRecorrencia.includes(dataRecorrencia)) {
      toast.warning("Esta data já foi adicionada.");
      return;
    }
    setDatasRecorrencia(prev => [...prev, dataRecorrencia].sort());
    setDataRecorrencia('');
  };

  const handleRemoverDataRecorrencia = (data) => {
    setDatasRecorrencia(prev => prev.filter(d => d !== data));
  };

  // Converte "HH:MM" para "HH:MM:SS" esperado pelo LocalTime do Spring
  const parseHorario = (horarioStr) => `${horarioStr}:00`;

  const handleSubmit = async () => {
    if (!pacienteSelecionado?.id || !funcionarioSelecionado || !dataSelecionadaLocal || !horarioSelecionado || !tipoSelecionado) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const dataHora = `${dataSelecionadaLocal} ${horarioSelecionado}:00`;

    // Marca a consulta principal
    const resultado = await marcarConsulta(
      pacienteSelecionado.id,
      Number(funcionarioSelecionado),
      dataHora,
      tipoSelecionado
    );

    if (!resultado) {
      toast.error("Erro ao marcar consulta. Tente novamente.");
      handleClose();
      return;
    }

    // Se recorrência está ativa e há datas, chama o endpoint de recorrentes
    if (recorrenciaAtiva && datasRecorrencia.length > 0) {
      const payload = {
        pacienteId: pacienteSelecionado.id,
        funcionarioId: Number(funcionarioSelecionado),
        datas: datasRecorrencia,           // ["2026-03-29", "2026-04-05", ...]
        horario: parseHorario(horarioSelecionado),
        tipo: tipoSelecionado,
      };

      const resultadoRecorrencia = await marcarConsultaRecorrente(payload);

      if (resultadoRecorrencia) {
        toast.success("Consulta e recorrências marcadas com sucesso!");
      } else {
        toast.warning("Consulta marcada, mas houve erro ao registrar as recorrências.");
      }
    } else {
      toast.success("Consulta marcada com sucesso!");
    }

    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="modal-overlay"
      contentLabel="Marcação de Consulta"
    >
      <div className="flex flex-col max-h-[90vh] relative w-full max-w-[500px] mx-auto p-0 border border-[#1eaafc] rounded-lg overflow-hidden bg-[#f1f1f1]">

        <div className="p-6">
          <button
            className="absolute top-4 right-5 text-3xl font-light text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
            onClick={handleClose}
          >×</button>
          <h2 className="text-3xl font-black text-center">Marcação de Consulta</h2>
          <h3 className="text-sm text-center text-gray-600 mt-1">Preencha as informações para agendar uma nova consulta</h3>
        </div>

        <div className="overflow-y-auto flex-1 pt-6 px-6">

          {/* Paciente */}
          <div className="modal-field relative mb-4">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Paciente *</label>
            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (pacienteSelecionado) setPacienteSelecionado(null);
              }}
            />

            {sugestoes.length > 0 && (
              <ul className="absolute left-0 top-[calc(100%+4px)] z-[9999] w-full bg-white border border-gray-300 rounded-lg shadow-2xl max-h-[200px] overflow-y-auto">
                {sugestoes.map((paciente) => (
                  <li
                    key={paciente.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setNome(paciente.nome);
                      setPacienteSelecionado(paciente);
                      setSugestoes([]);
                    }}
                    className="p-2 hover:bg-blue-100 cursor-pointer text-sm border-b last:border-none"
                  >
                    <span className="font-bold">{paciente.nome}</span>
                    <span className="text-gray-500 text-xs ml-2">({paciente.cpf})</span>
                  </li>
                ))}
              </ul>
            )}

            {loading && <p className="text-blue-500 text-[10px] mt-1">Buscando...</p>}
          </div>

          {/* Área */}
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Área *</label>
            <select
              value={areaSelecionada}
              onChange={(e) => {
                setAreaSelecionada(e.target.value);
                setFuncionarioSelecionado('');
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>Selecione a área</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Profissional */}
          <div className="modal-field">
            <p>DEBUG: Existem {tiposDeConsulta.length} tipos</p>
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Profissional de Preferência</label>
            <select
              className="w-full p-2 border rounded-md"
              disabled={!areaSelecionada}
              value={funcionarioSelecionado}
              onChange={(e) => setFuncionarioSelecionado(e.target.value)}
            >
              <option value="" disabled>
                {areaSelecionada ? "Selecione o Profissional" : "Selecione a área primeiro"}
              </option>
              {funcionarios
                .filter(f => f.especialidade === areaSelecionada)
                .map((prof) => (
                  <option key={prof.id} value={prof.id}>{prof.nome}</option>
                ))}
            </select>
          </div>

          {/* Data */}
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Data *</label>
            <input
              type="date"
              value={dataSelecionadaLocal}
              onChange={(e) => setDataSelecionadaLocal(e.target.value)}
            />
          </div>

          {/* Horário */}
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Horário *</label>
            <select
              className="w-full p-2 border rounded-md"
              value={horarioSelecionado}
              onChange={(e) => setHorarioSelecionado(e.target.value)}
            >
              <option value="" disabled>Selecione o horário</option>
              {horariosLivres.map((hora) => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Tipo de Consulta *</label>
            <select
              className="w-full p-2 border rounded-md"
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              <option value="" disabled>Selecione o tipo de consulta</option>
              {listaTipos.map((tipo, index) => (
                <option key={`tipo-${index}`} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <hr className="mb-5 border-0 h-px bg-black/15 shadow-[0_1px_4px_rgba(0,0,0,0.25)]" />

          {/* Recorrência */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-[0_3px_3px_0_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                id="recorrencia"
                className="w-4 h-4 cursor-pointer"
                checked={recorrenciaAtiva}
                onChange={(e) => {
                  setRecorrenciaAtiva(e.target.checked);
                  if (!e.target.checked) {
                    setDataRecorrencia('');
                    setDatasRecorrencia([]);
                  }
                }}
              />
              <label htmlFor="recorrencia" className="text-1xl font-bold text-gray-700 tracking-tighter cursor-pointer">
                Recorrência de Consulta
              </label>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed text-left ml-7">
              Selecione as datas adicionais em que esta consulta deve se repetir. O sistema verificará a disponibilidade de todos os profissionais
            </p>
          </div>

          {/* Campos de recorrência — só exibidos quando checkbox está ativo */}
          {recorrenciaAtiva && (
            <>
              <div className="modal-field mt-5">
                <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Adicionar Data de Recorrência</label>
                <input
                  type="date"
                  placeholder="Selecione uma data"
                  value={dataRecorrencia}
                  onChange={(e) => setDataRecorrencia(e.target.value)}
                  min={dataSelecionadaLocal || undefined}
                />
                <button
                  className="p-2 mt-[10px] border-0 rounded-[12px] cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white text-[12px]"
                  onClick={handleAdicionarDataRecorrencia}
                >
                  + Adicionar Data
                </button>
              </div>

              <div className="modal-field">
                <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Datas de Recorrência Selecionadas</label>
                {datasRecorrencia.length === 0 ? (
                  <h6 className="text-xs text-gray-600">Nenhuma data adicionada ainda</h6>
                ) : (
                  <ul className="mt-1 space-y-1">
                    {datasRecorrencia.map((data) => (
                      <li
                        key={data}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm"
                      >
                        <span className="text-gray-700">{data}</span>
                        <button
                          className="text-red-400 hover:text-red-600 text-xs font-bold ml-4 cursor-pointer"
                          onClick={() => handleRemoverDataRecorrencia(data)}
                        >
                          ✕ Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

        </div>

        <div className="p-6">
          <button className="btn-submit w-full" onClick={handleSubmit}>Salvar e Enviar para Aprovação</button>
        </div>
      </div>
    </Modal>
  )
}
