import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Upload, X, UserCheck } from "lucide-react"
import Layout from "../../components/layout/Layout"
import { toast } from "react-toastify"
import { cadastrarPaciente } from "@/src/service/pacientes/pacientes.service"
import { buscarResponsaveis } from "@/src/service/resposaveis/responsaveis.service"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"
import { FiSearch, FiX } from "react-icons/fi"

export default function CadastroPaciente() {
  const navigate = useNavigate()
  const [fotoPaciente, setFotoPaciente] = useState(null)
  const [previewFoto, setPreviewFoto] = useState(null)

  // Busca de responsável existente
  const [queryResponsavel, setQueryResponsavel] = useState('')
  const [sugestoesResponsavel, setSugestoesResponsavel] = useState([])
  const [responsavelSelecionado, setResponsavelSelecionado] = useState(null)
  const [buscaAberta, setBuscaAberta] = useState(false)
  const debouncedQueryResponsavel = useDebouncedValue(queryResponsavel, 300)

  useEffect(() => {
    if (!debouncedQueryResponsavel || debouncedQueryResponsavel.length < 2) {
      setSugestoesResponsavel([])
      return
    }
    buscarResponsaveis(debouncedQueryResponsavel).then((data) => {
      setSugestoesResponsavel(Array.isArray(data) ? data : [])
    }).catch(console.error)
  }, [debouncedQueryResponsavel])

  const handleSelecionarResponsavel = (resp) => {
    setResponsavelSelecionado(resp)
    setQueryResponsavel('')
    setSugestoesResponsavel([])
    setBuscaAberta(false)
    setFormData(prev => ({
      ...prev,
      nomeResponsavel: resp.nome || '',
      emailResponsavel: resp.email || '',
      telefoneResponsavel: resp.telefone || '',
      cpfResponsavel: resp.cpf || '',
      dtNascimentoResponsavel: resp.dtNascimento || '',
    }))
  }

  const handleLimparResponsavel = () => {
    setResponsavelSelecionado(null)
    setQueryResponsavel('')
    setSugestoesResponsavel([])
    setFormData(prev => ({
      ...prev,
      nomeResponsavel: '',
      emailResponsavel: '',
      telefoneResponsavel: '',
      cpfResponsavel: '',
      dtNascimentoResponsavel: '',
    }))
  }

  const [formData, setFormData] = useState({
    // Dados do Paciente
    nomePaciente: "",
    emailPaciente: "",
    cpfPaciente: "",
    telefonePaciente: "",
    dtNascimentoPaciente: "",
    convenioPaciente: "",
    
    // Dados do Responsável
    nomeResponsavel: "",
    emailResponsavel: "",
    telefoneResponsavel: "",
    dtNascimentoResponsavel: "",
    cpfResponsavel: "",
    parentesco: "",
    
    // Endereço
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFotoPaciente(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewFoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removerFoto = () => {
    setFotoPaciente(null)
    setPreviewFoto(null)
  }

  const buscarCep = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
        const data = await response.json()
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || ""
          }))
        } else {
          toast.error("CEP não encontrado")
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
        toast.error("Erro ao buscar CEP")
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Aqui você faria a chamada à API para cadastrar o paciente
    const dados = {
      // Dados do Paciente
      nomePaciente: formData.nomePaciente,
      emailPaciente: formData.emailPaciente,
      cpfPaciente: formData.cpfPaciente,
      telefonePaciente: formData.telefonePaciente,
      dtNascimentoPaciente: formData.dtNascimentoPaciente,
      convenioPaciente: formData.convenioPaciente,
      fotoPaciente: fotoPaciente,
      
      // Dados do Responsável
      nomeResponsavel: formData.nomeResponsavel,
      emailResponsavel: formData.emailResponsavel,
      telefoneResponsavel: formData.telefoneResponsavel,
      dtNascimentoResponsavel: formData.dtNascimentoResponsavel,
      cpfResponsavel: formData.cpfResponsavel,
      parentesco: formData.parentesco,
      
      // Endereço
      cep: formData.cep,
      logradouro: formData.logradouro,
      numero: formData.numero,
      complemento: formData.complemento,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado
    }
    
    console.log("Dados do cadastro:", dados)

    cadastrarPaciente(dados).then(() => {
      toast.success('Paciente cadastrado com sucesso!')
      navigate("/pacientes")
    }).catch((error) => {
      console.error(error)
      toast.error('Não foi possível cadastrar o paciente')
    })
  }

//   {
//   "parentesco": "parentesco_12636b82fc61",
//   "cep": "cep_bf31b5abb352",
//   "logradouro": "logradouro_9f56d007200b",
//   "numero": "numero_8975a3806887",
//   "complemento": "complemento_2f25d9d58a09",
//   "bairro": "bairro_b83231d1e9e9",
//   "cidade": "cidade_84c6e80805ba",
//   "estado": "estado_93d87fd61cb2",
//   "nomeResponsavel": "nomeResponsavel_61c8c7c7a774",
//   "emailResponsavel": "emailResponsavel_cfa5e11dcede",
//   "telefoneResponsavel": "telefoneResponsavel_15cb5d5d6821",
//   "dtNascimentoResponsavel": "2026-03-09",
//   "cpfResponsavel": "cpfResponsavel_fd8988a09551",
//   "nomePaciente": "nomePaciente_4c939ba2e761",
//   "emailPaciente": "emailPaciente_05e1bcaae1b6",
//   "cpfPaciente": "cpfPaciente_7b28cfc9a8bd",
//   "telefonePaciente": "telefonePaciente_b1ff1209aada",
//   "dtNascimentoPaciente": "2026-03-09",
//   "convenioPaciente": "convenioPaciente_0bcde14ec67a",
//   "fotoPaciente": {}
// }

  return (
    <Layout>
      <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate("/pacientes")}
            className="p-1 hover:bg-gray-200 rounded transition-colors shrink-0"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Cadastro de Paciente
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          {/* Card de Foto do Paciente */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Foto do Paciente</h2>
            
            <div className="flex flex-col items-center gap-4">
              {previewFoto ? (
                <div className="relative">
                  <img 
                    src={previewFoto} 
                    alt="Preview" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removerFoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <Upload size={32} className="text-gray-400" />
                </div>
              )}
              
              <label className="cursor-pointer bg-linear-to-r from-[#4fc3f7] to-[#5fcb9f] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
                Selecionar Foto
              </label>
            </div>
          </div>

          {/* Dados do Paciente */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Dados do Paciente
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nomePaciente"
                  value={formData.nomePaciente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="emailPaciente"
                  value={formData.emailPaciente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF *
                </label>
                <input
                  type="text"
                  name="cpfPaciente"
                  value={formData.cpfPaciente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="000.000.000-00"
                  maxLength="14"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="telefonePaciente"
                  value={formData.telefonePaciente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  name="dtNascimentoPaciente"
                  value={formData.dtNascimentoPaciente}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Convênio
                </label>
                <input
                  type="text"
                  name="convenioPaciente"
                  value={formData.convenioPaciente}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do convênio"
                />
              </div>
            </div>
          </div>

          {/* Dados do Responsável */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Dados do Responsável
            </h2>

            {/* Busca de responsável existente */}
            {!responsavelSelecionado ? (
              <div className="mb-5 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buscar responsável já cadastrado
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={queryResponsavel}
                    onChange={e => { setQueryResponsavel(e.target.value); setBuscaAberta(true) }}
                    onFocus={() => sugestoesResponsavel.length > 0 && setBuscaAberta(true)}
                    onBlur={() => setTimeout(() => setBuscaAberta(false), 150)}
                    placeholder="Pesquise por nome, CPF ou e-mail..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {queryResponsavel && (
                    <button type="button" onClick={() => { setQueryResponsavel(''); setSugestoesResponsavel([]) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <FiX size={15} />
                    </button>
                  )}
                </div>
                {buscaAberta && sugestoesResponsavel.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-52 overflow-y-auto">
                    {sugestoesResponsavel.map(resp => (
                      <li key={resp.id} onMouseDown={() => handleSelecionarResponsavel(resp)}
                        className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-0">
                        <p className="font-medium text-sm text-gray-800">{resp.nome}</p>
                        <p className="text-xs text-gray-400">{resp.email} · {resp.cpf}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {buscaAberta && queryResponsavel.length >= 2 && sugestoesResponsavel.length === 0 && (
                  <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 px-4 py-3 text-sm text-gray-400">
                    Nenhum responsável encontrado
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">Ou preencha os campos abaixo para cadastrar um novo responsável</p>
              </div>
            ) : (
              <div className="mb-5 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <UserCheck size={20} className="text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">{responsavelSelecionado.nome}</p>
                    <p className="text-xs text-green-600">{responsavelSelecionado.email} · {responsavelSelecionado.cpf}</p>
                  </div>
                </div>
                <button type="button" onClick={handleLimparResponsavel}
                  className="text-xs text-green-700 hover:text-green-900 underline shrink-0 ml-4">
                  Alterar
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Responsável *
                </label>
                <input
                  type="text"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel}
                  onChange={handleChange}
                  required
                  readOnly={!!responsavelSelecionado}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${responsavelSelecionado ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'}`}
                  placeholder="Digite o nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="emailResponsavel"
                  value={formData.emailResponsavel}
                  onChange={handleChange}
                  required
                  readOnly={!!responsavelSelecionado}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${responsavelSelecionado ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'}`}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={handleChange}
                  required
                  readOnly={!!responsavelSelecionado}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${responsavelSelecionado ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'}`}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF *
                </label>
                <input
                  type="text"
                  name="cpfResponsavel"
                  value={formData.cpfResponsavel}
                  onChange={handleChange}
                  required
                  readOnly={!!responsavelSelecionado}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${responsavelSelecionado ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'}`}
                  placeholder="000.000.000-00"
                  maxLength="14"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  name="dtNascimentoResponsavel"
                  value={formData.dtNascimentoResponsavel}
                  onChange={handleChange}
                  required
                  readOnly={!!responsavelSelecionado}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${responsavelSelecionado ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parentesco *
                </label>
                <select
                  name="parentesco"
                  value={formData.parentesco}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="Pai">Pai</option>
                  <option value="Mãe">Mãe</option>
                  <option value="Avô">Avô</option>
                  <option value="Avó">Avó</option>
                  <option value="Tio">Tio</option>
                  <option value="Tia">Tia</option>
                  <option value="Irmão">Irmão</option>
                  <option value="Irmã">Irmã</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Endereço
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CEP *
                </label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  onBlur={buscarCep}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00000-000"
                  maxLength="9"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logradouro *
                </label>
                <input
                  type="text"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rua, Avenida, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número *
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Apto, Bloco, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bairro *
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do bairro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da cidade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/pacientes")}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-linear-to-r from-[#4fc3f7] to-[#5fcb9f] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Cadastrar Paciente
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
