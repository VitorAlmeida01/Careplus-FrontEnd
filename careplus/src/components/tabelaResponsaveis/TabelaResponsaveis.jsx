import {
  Trash2,
  User,
  FileText,
  Calendar,
  Phone,
  Eye,
  Mail,
  MapPin,
  MapPinHouse,
  SquarePenIcon,
  RotateCcw
} from "lucide-react"
import ConfirmacaoModal from "../modalConfirmacao/ConfirmacaoModal"
import ModalBase from "../modalFichaClinica/ModalBase"
import EditarResponsavelModal from "../modalCadastro/Responsaveis/EditarResponsavelModal"
import { atualizarResponsavel, deletarResponsavel, reativarResponsavel } from "../../service/resposaveis/responsaveis.service"
import { toast } from "react-toastify"

import { useEffect, useState } from "react"

export default function TabelaResponsavel({ responsaveis, mostrandoInativos = false }) {
  const [responsaveisData, setResponsaveisData] = useState(responsaveis)
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false)
  const [modalConfirmacaoEnderecoAberto, setModalConfirmacaoEnderecoAberto] = useState(false)
  const [responsavelParaExcluir, setResponsavelParaExcluir] = useState(null)
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false)
  const [responsavelEnderecoSelecionado, setResponsavelEnderecoSelecionado] =
    useState(null)
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false)
  const [responsavelSelecionado, setResponsavelSelecionado] = useState(null)
  const [enderecoFormData, setEnderecoFormData] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  })
  const [modalReativacaoAberto, setModalReativacaoAberto] = useState(false)
  const [responsavelParaReativar, setResponsavelParaReativar] = useState(null)

  useEffect(() => {
    setResponsaveisData(responsaveis)
  }, [responsaveis])

  const abrirModalExclusao = (responsavel) => {
    setResponsavelParaExcluir(responsavel)
    setModalExclusaoAberto(true)
  }

  const abrirModalReativacao = (responsavel) => {
    setResponsavelParaReativar(responsavel)
    setModalReativacaoAberto(true)
  }

  const abrirModalEndereco = (responsavel) => {
    setResponsavelEnderecoSelecionado(responsavel)
    setEnderecoFormData({
      cep: responsavel?.endereco?.cep || "",
      logradouro: responsavel?.endereco?.logradouro || "",
      numero: responsavel?.endereco?.numero || "",
      complemento: responsavel?.endereco?.complemento || "",
      bairro: responsavel?.endereco?.bairro || "",
      cidade: responsavel?.endereco?.cidade || "",
      estado: responsavel?.endereco?.estado || "",
    })
    setModalEnderecoAberto(true)
  }

  const abrirModalEdicao = (responsavel) => {
    setResponsavelSelecionado(responsavel)
    setModalEdicaoAberto(true)
  }

  const fecharModalEdicao = () => {
    setModalEdicaoAberto(false)
    setResponsavelSelecionado(null)
  }

  const salvarAlteracoesResponsavel = (dadosAtualizados) => {
    setResponsaveisData((dadosAnteriores) =>
      dadosAnteriores.map((item) =>
        item.id === responsavelSelecionado.id
          ? { ...item, ...dadosAtualizados }
          : item,
      ),
    )
  }

  const handleChangeEndereco = (e) => {
    const { name, value } = e.target
    setEnderecoFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const salvarEndereco = async () => {
    setModalConfirmacaoEnderecoAberto(false)

    if (!responsavelEnderecoSelecionado) return

    try {
      await atualizarResponsavel(responsavelEnderecoSelecionado.id, {
        nome: responsavelEnderecoSelecionado.nome,
        email: responsavelEnderecoSelecionado.email,
        telefone: responsavelEnderecoSelecionado.telefone,
        dtNascimento: responsavelEnderecoSelecionado.dtNascimento,
        cpf: responsavelEnderecoSelecionado.cpf,
        endereco: enderecoFormData,
      })

      setResponsaveisData((dadosAnteriores) =>
        dadosAnteriores.map((item) =>
          item.id === responsavelEnderecoSelecionado.id
            ? { ...item, endereco: { ...item.endereco, ...enderecoFormData } }
            : item,
        ),
      )

      setResponsavelEnderecoSelecionado((anterior) => ({
        ...anterior,
        endereco: { ...anterior?.endereco, ...enderecoFormData },
      }))

      toast.success('Endereço atualizado com sucesso')
    } catch {
      toast.error('Erro ao atualizar endereço')
    }

    setModalEnderecoAberto(false)
  }

  const solicitarSalvarEndereco = () => {
    setModalConfirmacaoEnderecoAberto(true)
  }

  const confirmarExclusao = async () => {
    try {
      await deletarResponsavel(responsavelParaExcluir.id)
      setResponsaveisData(prev => prev.filter(r => r.id !== responsavelParaExcluir.id))
      toast.success('Responsável inativado com sucesso')
    } catch {
      toast.error('Erro ao inativar responsável')
    }
    setModalExclusaoAberto(false)
    setResponsavelParaExcluir(null)
  }

  const confirmarReativacao = async () => {
    try {
      await reativarResponsavel(responsavelParaReativar.id)
      setResponsaveisData(prev => prev.filter(r => r.id !== responsavelParaReativar.id))
      toast.success('Responsável reativado com sucesso')
    } catch {
      toast.error('Erro ao reativar responsável')
    }
    setModalReativacaoAberto(false)
    setResponsavelParaReativar(null)
  }

  function visualizarResponsavel(id) {
    const responsavel = responsaveisData.find((item) => item.id === id)
    if (!responsavel) return
    abrirModalEdicao(responsavel)
  }

  const formatarData = (valor) => {
    if (!valor) return "-"
    const parts = valor.split("-")
    if (parts.length === 3 && parts[0].length === 4)
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    return valor
  }

  const formatarDocumento = (doc) => {
    if (!doc) return '-'
    const digits = doc.replace(/\D/g, '')
    if (digits.length === 11)
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    if (digits.length === 9)
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
    return doc
  }

  const formatarTelefone = (tel) => {
    if (!tel) return '-'
    const digits = tel.replace(/\D/g, '')
    if (digits.length === 11)
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    if (digits.length === 10)
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    return tel
  }

  const textoEnderecoCompleto = [
    enderecoFormData.logradouro,
    enderecoFormData.numero,
    enderecoFormData.bairro,
    enderecoFormData.cidade,
    enderecoFormData.estado,
  ]
    .filter(Boolean)
    .join(", ")

  const exibirValor = (valor) => {
    if (valor === null || valor === undefined || valor === "") return "-"
    return valor
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
                CPF
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <Calendar size={18} className="inline align-middle mr-2" />
                Data Nascimento
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <Phone size={18} className="inline align-middle mr-2" />
                Telefone
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle">
                <MapPin size={18} className="inline align-middle mr-2" />
                Endereco
              </th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle"></th>
              <th className="py-[22px] px-4 pb-[30px] text-center font-medium text-white text-sm align-middle"></th>
            </tr>
          </thead>
          <tbody>
            {responsaveisData.map((responsavel) => {
              return (
                <tr key={responsavel.id}>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    <div>
                      <div className="flex flex-col text-left">
                        <span>{responsavel.nome}</span>
                        <span className="text-gray-600 text-[13px]">
                          {responsavel.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {formatarDocumento(responsavel.cpf)}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {formatarData(responsavel.dtNascimento)}
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500">
                    {formatarTelefone(responsavel.telefone)}
                  </td>
                  <td
                    className="p-4 font-normal border-b border-gray-500 hover:cursor-pointer hover:text-blue-500"
                    onClick={() => abrirModalEndereco(responsavel)}
                  >
                    <div className="flex justify-center">
                      <MapPinHouse size={18} />
                    </div>
                  </td>
                  <td className="p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer hover:text-blue-500" onClick={() => visualizarResponsavel(responsavel.id)}>
                    <SquarePenIcon size={18} />
                  </td>
                  <td
                    className={`p-4 text-center font-normal border-b border-gray-500 hover:cursor-pointer ${mostrandoInativos ? 'hover:text-green-500' : 'hover:text-red-500'}`}
                    onClick={() => mostrandoInativos ? abrirModalReativacao(responsavel) : abrirModalExclusao(responsavel)}
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
        {responsaveisData.map((responsavel) => (
          <div
            key={responsavel.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            {/* Nome e Email */}
            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
              <User size={18} className="text-gray-600 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{responsavel.nome}</p>
                <p className="text-sm text-gray-600 truncate">{responsavel.email}</p>
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">CPF:</span>
                <span className="font-medium text-gray-900">{formatarDocumento(responsavel.cpf)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Nascimento:</span>
                <span className="font-medium text-gray-900">{formatarData(responsavel.dtNascimento)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Telefone:</span>
                <span className="font-medium text-gray-900">{formatarTelefone(responsavel.telefone)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500 shrink-0" />
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900 truncate">{responsavel.email}</span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => abrirModalEdicao(responsavel)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <Eye size={16} />
                <span className="text-sm font-medium">Ver/Editar</span>
              </button>
              <button
                onClick={() => abrirModalEndereco(responsavel)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <MapPin size={16} />
                <span className="text-sm font-medium">Endereco</span>
              </button>
              {mostrandoInativos ? (
                <button
                  onClick={() => abrirModalReativacao(responsavel)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span className="text-sm font-medium">Reativar</span>
                </button>
              ) : (
                <button
                  onClick={() => abrirModalExclusao(responsavel)}
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

      <ModalBase
        isOpen={modalEnderecoAberto}
        onClose={() => setModalEnderecoAberto(false)}
        titulo="Endereco do responsavel"
        icone="📍"
        largura="w-[550px]"
      >
        <section className="flex flex-col gap-3 text-sm text-gray-700">
          <div>
            <label className="font-semibold">Responsavel:</label>
            <p>{exibirValor(responsavelEnderecoSelecionado?.nome)}</p>
          </div>
          <div>
            <label className="font-semibold">CEP:</label>
            <input
              name="cep"
              value={enderecoFormData.cep}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Logradouro:</label>
            <input
              name="logradouro"
              value={enderecoFormData.logradouro}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Numero:</label>
            <input
              name="numero"
              value={enderecoFormData.numero}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Complemento:</label>
            <input
              name="complemento"
              value={enderecoFormData.complemento}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Bairro:</label>
            <input
              name="bairro"
              value={enderecoFormData.bairro}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Cidade:</label>
            <input
              name="cidade"
              value={enderecoFormData.cidade}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Estado:</label>
            <input
              name="estado"
              value={enderecoFormData.estado}
              onChange={handleChangeEndereco}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="font-semibold">Endereco completo:</label>
            <p>{exibirValor(textoEnderecoCompleto)}</p>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => setModalEnderecoAberto(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={solicitarSalvarEndereco}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white hover:opacity-90 cursor-pointer"
            >
              Salvar endereco
            </button>
          </div>
        </section>
      </ModalBase>

      <ConfirmacaoModal
        isOpen={modalConfirmacaoEnderecoAberto}
        onClose={() => setModalConfirmacaoEnderecoAberto(false)}
        onConfirm={salvarEndereco}
        titulo="Salvar Endereco"
        mensagem={`Deseja salvar as alteracoes do endereco de ${responsavelEnderecoSelecionado?.nome}?`}
        textoBotaoConfirmar="Salvar"
        textoBotaoCancelar="Cancelar"
      />

      {responsavelSelecionado && (
        <EditarResponsavelModal
          isOpen={modalEdicaoAberto}
          onClose={fecharModalEdicao}
          responsavel={responsavelSelecionado}
          onSave={salvarAlteracoesResponsavel}
        />
      )}

      <ConfirmacaoModal
        isOpen={modalExclusaoAberto}
        onClose={() => setModalExclusaoAberto(false)}
        onConfirm={confirmarExclusao}
        titulo="Inativar Responsavel"
        mensagem={`Tem certeza que deseja inativar o responsavel ${responsavelParaExcluir?.nome}?`}
        textoBotaoConfirmar="Inativar"
        textoBotaoCancelar="Cancelar"
      />

      <ConfirmacaoModal
        isOpen={modalReativacaoAberto}
        onClose={() => setModalReativacaoAberto(false)}
        onConfirm={confirmarReativacao}
        titulo="Reativar Responsavel"
        mensagem={`Deseja reativar o responsavel ${responsavelParaReativar?.nome}?`}
        textoBotaoConfirmar="Reativar"
        textoBotaoCancelar="Cancelar"
      />
    </div>
  )
}
