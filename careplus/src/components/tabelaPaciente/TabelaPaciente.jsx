import {
  Trash2,
  User,
  FileText,
  UserCheck,
  Calendar,
  Phone,
  Eye,
  RotateCcw
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import ConfirmacaoModal from "../modalConfirmacao/ConfirmacaoModal"
import { deletarPaciente, reativarPaciente } from "../../service/pacientes/pacientes.service"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

export default function TabelaPaciente({ pacientes, mostrandoInativos = false }) {
  const navigate = useNavigate()

  const [pacientesData, setPacientesData] = useState(pacientes)
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false)
  const [pacienteParaExcluir, setPacienteParaExcluir] = useState(null)
  const [modalReativacaoAberto, setModalReativacaoAberto] = useState(false)
  const [pacienteParaReativar, setPacienteParaReativar] = useState(null)

  useEffect(() => {
    setPacientesData(pacientes)
  }, [pacientes])

  const abrirModalExclusao = (paciente) => {
    setPacienteParaExcluir(paciente)
    setModalExclusaoAberto(true)
  }

  const confirmarExclusao = async () => {
    try {
      await deletarPaciente(pacienteParaExcluir.id)
      setPacientesData(prev => prev.filter(p => p.id !== pacienteParaExcluir.id))
      toast.success(`Paciente ${pacienteParaExcluir.nome} inativado com sucesso`)
    } catch (error) {
      toast.error('Não foi possível inativar o paciente')
    } finally {
      setPacienteParaExcluir(null)
    }
  }

  const abrirModalReativacao = (paciente) => {
    setPacienteParaReativar(paciente)
    setModalReativacaoAberto(true)
  }

  const confirmarReativacao = async () => {
    try {
      await reativarPaciente(pacienteParaReativar.id)
      setPacientesData(prev => prev.filter(p => p.id !== pacienteParaReativar.id))
      toast.success(`Paciente ${pacienteParaReativar.nome} reativado com sucesso`)
    } catch (error) {
      toast.error('Não foi possível reativar o paciente')
    } finally {
      setPacienteParaReativar(null)
    }
  }

  function fichaClinicaPaciente(id){
    navigate(`/pacientes/ficha-clinica?idPaciente=${id}`)
  }

  return (
    <div className="bg-white w-[90%] min-h-[700px] max-h-[700px] my-[1%] mx-[4%] shadow-md rounded-lg overflow-auto">
      {/* Visualização Desktop - Tabela */}
      <div className="hidden md:block">
        <table className="w-full min-w-[800px] border-separate border-spacing-0 rounded-lg overflow-hidden">
          <thead className="bg-linear-to-r from-[#4fc3f7] to-[#5fcb9f]">
            <tr>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <User size={18} className="inline align-middle mr-2" />
                Nome
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <FileText size={18} className="inline align-middle mr-2" />{" "}
                Documento
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <UserCheck size={18} className="inline align-middle mr-2" />
                Convênio
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <Calendar size={18} className="inline align-middle mr-2" />
                Data Nascimento
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <Phone size={18} className="inline align-middle mr-2" />
                Telefone Responsável
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle"></th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle"></th>
            </tr>
          </thead>
          <tbody>
            {pacientesData.map((paciente) => {
              return (
                <tr key={paciente.id}>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    <div>
                      <div className="flex flex-col text-left">
                        <span>{paciente.nome}</span>
                        <span className="text-gray-600 text-[13px]">
                          {paciente.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {paciente.cpf}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {paciente.convenio || "-"}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {paciente.dtNascimento}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {paciente.telefone}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer hover:text-blue-500" onClick={() => fichaClinicaPaciente(paciente.id)}>
                    <Eye size={18} />
                  </td>
                  <td
                    className={`p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer ${mostrandoInativos ? 'hover:text-green-500' : 'hover:text-red-500'}`}
                    onClick={() => mostrandoInativos ? abrirModalReativacao(paciente) : abrirModalExclusao(paciente)}
                  >
                    {mostrandoInativos ? <RotateCcw size={18} /> : <Trash2 size={18} />}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Visualização Mobile - Cards */}
      <div className="md:hidden p-4 space-y-4">
        {pacientesData.map((paciente) => (
          <div 
            key={paciente.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            {/* Nome e Email */}
            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
              <User size={18} className="text-gray-600 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{paciente.nome}</p>
                <p className="text-sm text-gray-600 truncate">{paciente.email}</p>
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">CPF:</span>
                <span className="font-medium text-gray-900">{paciente.cpf}</span>
              </div>

              <div className="flex items-center gap-2">
                <UserCheck size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Convênio:</span>
                <span className="font-medium text-gray-900">{paciente.convenio || '-'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Nascimento:</span>
                <span className="font-medium text-gray-900">{paciente.dtNascimento}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Telefone:</span>
                <span className="font-medium text-gray-900">{paciente.telefone}</span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => fichaClinicaPaciente(paciente.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Eye size={16} />
                <span className="text-sm font-medium">Ver ficha</span>
              </button>
              {mostrandoInativos ? (
                <button
                  onClick={() => abrirModalReativacao(paciente)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span className="text-sm font-medium">Reativar</span>
                </button>
              ) : (
                <button
                  onClick={() => abrirModalExclusao(paciente)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Excluir</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmacaoModal
        isOpen={modalExclusaoAberto}
        onClose={() => setModalExclusaoAberto(false)}
        onConfirm={confirmarExclusao}
        titulo="Inativar Paciente"
        mensagem={`Tem certeza que deseja inativar o paciente ${pacienteParaExcluir?.nome}?`}
        textoBotaoConfirmar="Inativar"
        textoBotaoCancelar="Cancelar"
      />

      {/* Modal de Confirmação de Reativação */}
      <ConfirmacaoModal
        isOpen={modalReativacaoAberto}
        onClose={() => setModalReativacaoAberto(false)}
        onConfirm={confirmarReativacao}
        titulo="Reativar Paciente"
        mensagem={`Deseja reativar o paciente ${pacienteParaReativar?.nome}?`}
        textoBotaoConfirmar="Reativar"
        textoBotaoCancelar="Cancelar"
      />
    </div>
  )
}
