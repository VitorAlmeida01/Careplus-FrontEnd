import { useEffect, useRef, useState } from "react"
import Layout from "../../components/layout/Layout"
import { buscarMeuPerfil, atualizarMeuPerfil, buscarFotoFuncionario, getCachedFotoFuncionario } from "../../service/funcionarios/funcionarios.service"
import { getTokenData } from "../../service/login/jwtDecoder"
import { toast } from "react-toastify"
import logo from "/src/assets/logo.png"


export default function MeuPerfil() {
  const tokenData = getTokenData()

  const [perfil, setPerfil] = useState(null)
  const [foto, setFoto] = useState(() => getCachedFotoFuncionario(tokenData?.documento))
  const [modalAberto, setModalAberto] = useState(false)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const fotoInputRef = useRef(null)

  useEffect(() => {
    buscarMeuPerfil().then((dados) => {
      setPerfil(dados)
      setForm({
        nome: dados.nome ?? "",
        email: dados.email ?? "",
        telefone: dados.telefone ?? "",
        tipoAtendimento: dados.tipoAtendimento ?? "",
        senha: "",
        confirmarSenha: "",
      })
    })
    if (!foto && tokenData?.documento) {
      buscarFotoFuncionario(tokenData.documento).then(setFoto)
    }
  }, [])

  const abrirModal = () => setModalAberto(true)
  const fecharModal = () => setModalAberto(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "foto") {
      setForm((prev) => ({ ...prev, foto: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSalvar = async () => {
    if (form.senha && form.senha !== form.confirmarSenha) {
      toast.warn("As senhas não coincidem.")
      return
    }
    setLoading(true)
    try {
      const atualizado = await atualizarMeuPerfil(form)
      setPerfil(atualizado)
      if (form.foto && tokenData?.documento) {
        const novaFoto = await buscarFotoFuncionario(tokenData.documento)
        setFoto(novaFoto)
      }
      toast.success("Perfil atualizado!")
      fecharModal()
    } catch {
      toast.error("Erro ao atualizar perfil.")
    } finally {
      setLoading(false)
    }
  }

  const exibir = (val) => val || "-"

  return (
    <Layout>
      <div className="flex flex-col gap-5 w-[95%] ml-5 p-4">

        {/* Card de perfil */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <img
              src={foto || logo}
              alt="foto"
              className="w-24 h-24 rounded-full object-cover shadow"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">{perfil?.nome ?? "-"}</h1>
            <p className="text-sm text-gray-500">{exibir(perfil?.cargo)}{perfil?.especialidade ? ` · ${perfil.especialidade}` : ""}</p>
            {perfil?.supervisor?.nome && (
              <p className="text-sm text-gray-400">Supervisor: {perfil.supervisor.nome}</p>
            )}
          </div>
          <button
            onClick={abrirModal}
            className="border border-[#00bfa5] text-[#00bfa5] py-2 px-5 rounded-lg text-sm font-medium hover:bg-[#e0f7f4] cursor-pointer"
          >
            Editar Perfil
          </button>
        </div>

        {/* Cards de informação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-gray-700 border-b pb-2">Dados Pessoais</h2>
            <InfoLinha label="Email" valor={exibir(perfil?.email)} />
            <InfoLinha label="Telefone" valor={exibir(perfil?.telefone)} />
            <InfoLinha label="Documento" valor={exibir(perfil?.documento)} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-gray-700 border-b pb-2">Dados Profissionais</h2>
            <InfoLinha label="Cargo" valor={exibir(perfil?.cargo)} />
            <InfoLinha label="Especialidade" valor={exibir(perfil?.especialidade)} />
            <InfoLinha label="Tipo de Atendimento" valor={exibir(perfil?.tipoAtendimento)} />
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-9999 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-120 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={fecharModal}
            >×</button>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Editar Perfil</h2>

            <div className="flex flex-col gap-4">
              <Campo label="Nome *" name="nome" value={form.nome} onChange={handleChange} />
              <Campo label="Email *" name="email" type="email" value={form.email} onChange={handleChange} />
              <Campo label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />

              <Campo label="Tipo de Atendimento" name="tipoAtendimento" value={form.tipoAtendimento} onChange={handleChange} placeholder="Ex: ABA, Fono, TO" />

              <div className="border-t pt-4 mt-1 flex flex-col gap-4">
                <p className="text-xs text-gray-400">Deixe em branco para não alterar a senha</p>
                <Campo label="Nova Senha" name="senha" type="password" value={form.senha} onChange={handleChange} />
                <Campo label="Confirmar Senha" name="confirmarSenha" type="password" value={form.confirmarSenha} onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Foto</label>
                <input
                  ref={fotoInputRef}
                  name="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={fecharModal}
                className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-linear-to-r from-[#00a0ff] to-[#00d48c] text-white font-medium hover:opacity-90 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

function InfoLinha({ label, valor }) {
  return (
    <div>
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
      <p className="text-sm font-medium text-gray-700 mt-0.5">{valor}</p>
    </div>
  )
}

function Campo({ label, name, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-400 bg-gray-100 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}
