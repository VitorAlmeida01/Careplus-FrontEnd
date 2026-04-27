import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroPacienteModal from "../../components/modalCadastro/Pacientes/CadastroPacienteModal"
import TabelaPaciente from "../../components/tabelaPaciente/TabelaPaciente"
import {
  listarPacitentes,
  listarPacientesInativos,
  listarMeusPacientes,
  buscarPacientes,
} from "../../service/pacientes/pacientes.service"
import { getFuncionarioId } from "../../service/login/jwtDecoder"
import { toast } from 'react-toastify'
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import Loading from "../../components/loading/Loading"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"

export default function Pacientes() {
  const navigate = useNavigate()
  const [modalAberto, setModalAberto] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('ativos') // 'ativos' | 'inativos' | 'meus'

  const idFuncionario = getFuncionarioId()

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

  const fetchPacientes = useCallback((pagina) => {
    if (filtro === 'inativos') return listarPacientesInativos(pagina)
    if (filtro === 'meus') return listarMeusPacientes(pagina, idFuncionario)
    return listarPacitentes(pagina)
  }, [filtro, idFuncionario])

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSugestoes([])
      return
    }
    buscarPacientes(debouncedQuery).then((data) => {
      setSugestoes(Array.isArray(data) ? data : [])
    }).catch(console.error)
  }, [debouncedQuery])

  const handleSelect = (item) => {
    if (!item) {
      recarregarPacientes()
      return
    }
    setPacientes([item])
    setSugestoes([])
  }

  const recarregarPacientes = useCallback(() => {
    setLoading(true)
    fetchPacientes(page).then((response) => {
      setPacientes(response.content)
    }).catch((error) => {
      console.error(error)
      toast.error('Não foi possível listar os pacientes')
    }).finally(() => {
      setLoading(false)
    })
  }, [fetchPacientes, page])

  useEffect(() => {
    if (!query) recarregarPacientes()
  }, [page, query, filtro, recarregarPacientes])

  const handleToggle = (novoFiltro) => {
    setFiltro(novoFiltro)
    setPage(0)
    setQuery('')
    setSugestoes([])
  }

  const btnClass = (ativo) =>
    `px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      ativo ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
    }`
  const btnStyle = (ativo) =>
    ativo ? { background: 'linear-gradient(135deg, #4fc3f7 0%, #5fcb9f 100%)' } : {}

  return (
    <>
      <Layout>
        <div className="flex justify-end items-center h-[7%] my-[1%] mx-[4%] w-[90%]">
          <BarraPesquisa
            query={query}
            onQueryChange={setQuery}
            sugestoes={sugestoes}
            onSelect={handleSelect}
          />
        </div>
        <div className="w-[90%] flex my-[1%] mx-[4%] justify-between items-center">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => handleToggle('ativos')}
              className={btnClass(filtro === 'ativos')}
              style={btnStyle(filtro === 'ativos')}
            >
              Ativos
            </button>
            <button
              onClick={() => handleToggle('inativos')}
              className={btnClass(filtro === 'inativos')}
              style={btnStyle(filtro === 'inativos')}
            >
              Inativos
            </button>
            <button
              onClick={() => handleToggle('meus')}
              className={btnClass(filtro === 'meus')}
              style={btnStyle(filtro === 'meus')}
            >
              Meus Pacientes
            </button>
          </div>
          <BotaoCadastro onClick={() => navigate("/pacientes/cadastrar")} name={"Cadastrar"} />
        </div>

        {loading ? (
          <Loading message="Carregando pacientes..." />
        ) : (
          <TabelaPaciente pacientes={pacientes} mostrandoInativos={filtro === 'inativos'} />
        )}

        {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={fetchPacientes} />}
      </Layout>
      <CadastroPacienteModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSuccess={recarregarPacientes}
      />
    </>
  )
}
