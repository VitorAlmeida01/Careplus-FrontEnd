import {
  Pencil,
  Trash2,
  User,
  FileText,
  UserCheck,
  Calendar,
  Phone,
  SquarePenIcon,
  RotateCcw
} from "lucide-react"

import { useEffect, useState } from "react"
import EditarFuncionarioModal from "../modalCadastro/Funcionarios/EditarFuncionarioModal"
import ConfirmacaoModal from "../modalConfirmacao/ConfirmacaoModal"
import { deletarFuncionario, reativarFuncionario, atualizarFuncionario } from "../../service/funcionarios/funcionarios.service"
import { toast } from "react-toastify"

export default function TabelaFuncionario({ funcionarios, mostrandoInativos = false }) {

  const [funcionariosData, setFuncionariosData] = useState(funcionarios)
  const [modalAberto, setModalAberto] = useState(false)
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false)
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState(null)
  const [modalReativacaoAberto, setModalReativacaoAberto] = useState(false)
  const [funcionarioParaReativar, setFuncionarioParaReativar] = useState(null)

  useEffect(() => {
    setFuncionariosData(funcionarios)
  }, [funcionarios])

  const abrirModalEdicao = (funcionario) => {
    setFuncionarioSelecionado(funcionario)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setFuncionarioSelecionado(null)
  }

  const salvarAlteracoes = async (dadosAtualizados) => {
    try {
      const atualizado = await atualizarFuncionario(funcionarioSelecionado.id, dadosAtualizados)
      setFuncionariosData(prev => prev.map(f => f.id === funcionarioSelecionado.id ? { ...f, ...atualizado } : f))
      toast.success("Funcionário atualizado com sucesso!")
    } catch (error) {
      toast.error("Erro ao atualizar funcionário.")
    }
  }

  const abrirModalExclusao = (funcionario) => {
    setFuncionarioParaExcluir(funcionario)
    setModalExclusaoAberto(true)
  }

  const confirmarExclusao = async () => {
    try {
      await deletarFuncionario(funcionarioParaExcluir.id)
      setFuncionariosData(prev => prev.filter(f => f.id !== funcionarioParaExcluir.id))
      toast.success(`Funcionário ${funcionarioParaExcluir.nome} inativado com sucesso`)
    } catch (error) {
      toast.error('Não foi possível inativar o funcionário')
    } finally {
      setFuncionarioParaExcluir(null)
    }
  }

  const abrirModalReativacao = (funcionario) => {
    setFuncionarioParaReativar(funcionario)
    setModalReativacaoAberto(true)
  }

  const confirmarReativacao = async () => {
    try {
      await reativarFuncionario(funcionarioParaReativar.id)
      setFuncionariosData(prev => prev.filter(f => f.id !== funcionarioParaReativar.id))
      toast.success(`Funcionário ${funcionarioParaReativar.nome} reativado com sucesso`)
    } catch (error) {
      toast.error('Não foi possível reativar o funcionário')
    } finally {
      setFuncionarioParaReativar(null)
    }
  }

  return (
    <div className="bg-white w-[90%] min-h-[700px] max-h-[700px] my-[1%] mx-[4%] shadow-md rounded-lg overflow-auto">
      {/* Visualização Desktop - Tabela */}
      <div className="hidden md:block">
        <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
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
                Supervisor
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <Calendar size={18} className="inline align-middle mr-2" />
                Cargo
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <Phone size={18} className="inline align-middle mr-2" />
                Telefone
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle"></th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle"></th>
            </tr>
          </thead>
          <tbody>
            {funcionariosData.map((funcionario) => {
              return (
                <tr key={funcionario.id}>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    <div>
                      <div className="flex flex-col text-left">
                        <span>{funcionario.nome}</span>
                        <span className="text-gray-600 text-[13px]">
                          {funcionario.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {funcionario.documento || '-'}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {funcionario.supervisor ? funcionario.supervisor.nome : '-'}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {funcionario.cargo || '-'}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {funcionario.telefone || '-'}
                  </td>
                  {!mostrandoInativos && (
                    <td
                      className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer hover:text-blue-500"
                      onClick={() => abrirModalEdicao(funcionario)}
                    >
                      <SquarePenIcon size={18} />
                    </td>
                  )}
                  <td
                    className={`p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer ${mostrandoInativos ? 'hover:text-green-500' : 'hover:text-red-500'}`}
                    onClick={() => mostrandoInativos ? abrirModalReativacao(funcionario) : abrirModalExclusao(funcionario)}
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
        {funcionariosData.map((funcionario) => (
          <div 
            key={funcionario.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            {/* Nome e Email */}
            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
              <User size={18} className="text-gray-600 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{funcionario.nome}</p>
                <p className="text-sm text-gray-600 truncate">{funcionario.email}</p>
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Documento:</span>
                <span className="font-medium text-gray-900">{funcionario.documento || '-'}</span>
              </div>

              <div className="flex items-center gap-2">
                <UserCheck size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Supervisor:</span>
                <span className="font-medium text-gray-900 truncate">
                  {funcionario.supervisor ? funcionario.supervisor.nome : '-'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Cargo:</span>
                <span className="font-medium text-gray-900">{funcionario.cargo || '-'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Telefone:</span>
                <span className="font-medium text-gray-900">{funcionario.telefone || '-'}</span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
              {!mostrandoInativos && (
                <button
                  onClick={() => abrirModalEdicao(funcionario)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Pencil size={16} />
                  <span className="text-sm font-medium">Editar</span>
                </button>
              )}
              {mostrandoInativos ? (
                <button
                  onClick={() => abrirModalReativacao(funcionario)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span className="text-sm font-medium">Reativar</span>
                </button>
              ) : (
                <button
                  onClick={() => abrirModalExclusao(funcionario)}
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

      {/* Modal de Edição */}
      {funcionarioSelecionado && (
        <EditarFuncionarioModal
          isOpen={modalAberto}
          onClose={fecharModal}
          funcionario={funcionarioSelecionado}
          onSave={salvarAlteracoes}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmacaoModal
        isOpen={modalExclusaoAberto}
        onClose={() => setModalExclusaoAberto(false)}
        onConfirm={confirmarExclusao}
        titulo="Inativar Funcionário"
        mensagem={`Tem certeza que deseja inativar o funcionário ${funcionarioParaExcluir?.nome}?`}
        textoBotaoConfirmar="Inativar"
        textoBotaoCancelar="Cancelar"
      />

      {/* Modal de Confirmação de Reativação */}
      <ConfirmacaoModal
        isOpen={modalReativacaoAberto}
        onClose={() => setModalReativacaoAberto(false)}
        onConfirm={confirmarReativacao}
        titulo="Reativar Funcionário"
        mensagem={`Deseja reativar o funcionário ${funcionarioParaReativar?.nome}?`}
        textoBotaoConfirmar="Reativar"
        textoBotaoCancelar="Cancelar"
      />
    </div>
  )
}
