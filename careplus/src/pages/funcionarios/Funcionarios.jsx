import { useState, useEffect, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/Funcionarios/CadastroFuncionarioModal"
import TabelaFuncionario from "../../components/tabelaFuncionario/TabelaFuncionario"
import { listarFuncionarios, listarFuncionariosInativos, buscarFuncionarios } from "../../service/funcionarios/funcionarios.service"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"

export default function Funcionarios() {
  const [modalAberto, setModalAberto] = useState(false)
  const [funcionarios, setFuncionarios] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [apenasAtivos, setApenasAtivos] = useState(true)

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

  const fetchFuncionarios = apenasAtivos ? listarFuncionarios : listarFuncionariosInativos

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSugestoes([])
      return
    }
    buscarFuncionarios(debouncedQuery).then((data) => {
      setSugestoes(Array.isArray(data) ? data : [])
    }).catch(console.error)
  }, [debouncedQuery])

  const handleSelect = (item) => {
    if (!item) {
      recarregarFuncionarios()
      return
    }
    setFuncionarios([item])
    setSugestoes([])
  }

  const recarregarFuncionarios = useCallback(() => {
    setLoading(true)
    fetchFuncionarios(page).then((response) => {
      setFuncionarios(response.content)
    }).catch((error) => {
      console.error('Erro ao buscar funcionarios', error)
      toast.error('Não foi possível listar os funcionarios')
    }).finally(() => {
      setLoading(false)
    })
  }, [fetchFuncionarios, page])

  useEffect(() => {
    if (!query) recarregarFuncionarios()
  }, [page, query, apenasAtivos, recarregarFuncionarios])

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
          <BotaoCadastro onClick={() => setModalAberto(true)} name={"Cadastrar"}/>
        </div>

        {loading ? (
          <Loading message="Carregando funcionários..." />
        ) : (
          <TabelaFuncionario funcionarios={funcionarios} mostrandoInativos={!apenasAtivos} />
        )}

        {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={fetchFuncionarios} />}
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
