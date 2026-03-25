import React, { useEffect, useState } from "react"
import "./ConsultaModal.css"
import Modal from "react-modal"
import { buscarPacientePorNome } from '@/src/service/agendamento/consulta.service'
import { listarFuncionariosConsulta } from '@/src/service/agendamento/agendamento.service'


// Configuração para acessibilidade
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
  const [listaTipos, setListaTipos] = useState([]);
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



  // useEffect(() => {
  //   if (!isOpen) return;

  //   const carregarDadosIniciais = async () => {
  //     try {
  //       const resFuncionarios = await listarFuncionariosConsulta();
  //       setFuncionarios(resFuncionarios.data);

  //       const areasUnicas = [...new Set(resFuncionarios.data.map(f => f.especialidade).filter(Boolean))];
  //       setAreas(areasUnicas);

  //       if (tiposDeConsulta.length > 0 && tipoSelecionado === '') {
  //        console.log("Tipos carregados com sucesso no Modal!");
  //       }

  //       console.log("Chegou vazio do props: ", tiposDeConsulta)

  //       if (nome && nome.length >= 2) {
  //         setLoading(true);
  //         const dadosPacientes = await buscarPacientePorNome(nome);
  //         setSugestoes(dadosPacientes || []);
  //       } else {
  //         setSugestoes([]);
  //       }
  //     } catch (error) {
  //       console.error('Erro na carga de dados:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   carregarDadosIniciais();

  // }, [isOpen, nome, tiposDeConsulta]);

  useEffect(() => {
    if (!isOpen) return;

    const carregarDadosIniciais = async () => {
      try {
        const resFuncionarios = await listarFuncionariosConsulta();
        setFuncionarios(resFuncionarios.data);

        const areasUnicas = [...new Set(resFuncionarios.data.map(f => f.especialidade).filter(Boolean))];
        setAreas(areasUnicas);
      } catch (error) {
        console.error('Erro na carga:', error);
      }
    };

    carregarDadosIniciais();

  }, [isOpen]);

  useEffect(() => {
    if (Array.isArray(tiposDeConsulta) && tiposDeConsulta.length > 0) {
      console.log("Modal sincronizado: ", tiposDeConsulta)
      setListaTipos(tiposDeConsulta)
    }
  }, [tiposDeConsulta])

  // busca por nome
  useEffect(() => {
    if (isOpen && nome?.length >= 2) {
      const buscar = async () => {
        const dados = await buscarPacientePorNome(nome);
        setSugestoes(dados || []);
      };
      buscar();
    }
  }, [nome, isOpen]);



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="modal-overlay"
      contentLabel="Marcação de Consulta"
    >
      <div className="flex flex-col max-h-[90vh] relative w-full max-w-[500px] mx-auto p-0 border border-[#1eaafc] rounded-lg overflow-hidden bg-[#f1f1f1] flex flex-col">

        <div className="p-6">
          <button className="absolute top-4 right-5 text-3xl font-light text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
            onClick={onClose}>
            ×
          </button>
          <h2 className="text-3xl font-black text-center">Marcação de Consulta</h2>
          <h3 className="text-sm text-center text-gray-600 mt-1">Preencha as informações para agendar uma nova consulta</h3>

        </div>

        <div className="overflow-y-auto flex-1 pt-6 px-6">
          {/* buscar paciente pelo nome */}
          <div className="modal-field relative mb-4">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Paciente *</label>
            <input className="relative group"
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            {/* Lista de Sugestões */}
            {sugestoes.length > 0 && (
              <ul className="bsolute left-0 top-[calc(100%+4px)] z-[9999] w-full bg-white border border-gray-300 rounded-lg shadow-2xl max-h-[200px] overflow-y-auto">
                {sugestoes.map((paciente) => (
                  <li
                    key={paciente.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setNome(paciente.nome); // Preenche o input com o nome escolhido
                      setSugestoes([]);       // Fecha a lista
                      console.log("Paciente selecionado:", paciente);
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

          {/* Selecionar area  */}
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Área *</label>
            <select
              value={areaSelecionada}
              onChange={(e) => setAreaSelecionada(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>Selecione a área</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Selecionar Profissional  */}
          <div className="modal-field">
            <p>Debug: {listaTipos.length}</p>
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Profissional de Preferência</label>
            <select className="w-full p-2 border rounded-md" disabled={!areaSelecionada}>
              <option value="" selected disabled>
                {areaSelecionada ? "Selecione o Profissional" : "Selecione a área primeiro"}
              </option>
              {funcionarios
                .filter(f => f.especialidade === areaSelecionada)
                .map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </option>
                ))}
            </select>
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Data *</label>
            <input
              type="date"
              // value={dataSelecionada || ""}
              placeholder="Selecione uma data" />
          </div>

          {/* Selecionar Horario  */}
          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Horário *</label>
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => setHorarioSelecionado(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Selecione o horário</option>
              {horariosLivres.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>

          {/* Selecionar Tipo da consulta  */}
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
              {console.log("xereca: ", listaTipos)}
            </select>
          </div>
          <hr className="mb-5 border-0 h-px bg-black/15 shadow-[0_1px_4px_rgba(0,0,0,0.25)]" />
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-[0_3px_3px_0_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-3 mb-2">
              <input type="checkbox" id="recorrencia" className="w-4 h-4 cursor-pointer" />
              <label htmlFor="recorrencia" className="text-1xl font-bold text-gray-700 tracking-tighter mb-1cursor-pointer">
                Recorrência de Consulta
              </label>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed text-left ml-7">
              Selecione as datas adicionais em que esta consulta deve se repetir. O sistema verificará a disponibilidade de todos os profissionais
            </p>
          </div>

          <div className="modal-field mt-5">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Adicionar Data de Recorrência</label>
            <input type="date" placeholder="Selecione uma data" />
            <button className="p-2 mt-[10px] border-0 rounded-[12px] cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white text-[12px]">+ Adicionar Data</button>
          </div>

          <div className="modal-field">
            <label className="text-1xl font-bold text-gray-700 tracking-tighter mb-1">Datas de Recorrência Selecionadas</label>
            <h6 className="text-xs text-gray-600">Nenhuma data adicionada ainda</h6>
          </div>

        </div>


        <div className="p-6">
          <button className="btn-submit w-full">Salvar e Enviar para Aprovação</button>
        </div>
      </div>
    </Modal>
  )
}
