import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroPacienteModal from "../../components/modalCadastro/Pacientes/CadastroPacienteModal"
import TabelaPaciente from "../../components/tabelaPaciente/TabelaPaciente"
import { listarPacitentes, listarPacientesInativos, buscarPacientes } from "../../service/pacientes/pacientes.service"
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
  const [apenasAtivos, setApenasAtivos] = useState(true)

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

  const fetchPacientes = apenasAtivos ? listarPacitentes : listarPacientesInativos

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
  }, [page, query, apenasAtivos, recarregarPacientes])

  const handleToggle = (ativo) => {
    setApenasAtivos(ativo)
    setPage(0)
    setQuery('')
    setSugestoes([])
  }

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
              onClick={() => handleToggle(true)}
              className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                apenasAtivos
                  ? 'text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={apenasAtivos ? { background: 'linear-gradient(135deg, #4fc3f7 0%, #5fcb9f 100%)' } : {}}
            >
              Ativos
            </button>
            <button
              onClick={() => handleToggle(false)}
              className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                !apenasAtivos
                  ? 'text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={!apenasAtivos ? { background: 'linear-gradient(135deg, #4fc3f7 0%, #5fcb9f 100%)' } : {}}
            >
              Inativos
            </button>
          </div>
          <BotaoCadastro onClick={() => navigate("/pacientes/cadastrar")} name={"Cadastrar"}/>
        </div>

        {loading ? (
          <Loading message="Carregando pacientes..." />
        ) : (
          <TabelaPaciente pacientes={pacientes} mostrandoInativos={!apenasAtivos} />
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
