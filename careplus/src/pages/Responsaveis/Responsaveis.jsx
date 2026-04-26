import { useEffect, useState, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import TabelaResponsavel from "../../components/tabelaResponsaveis/TabelaResponsaveis"
import { listarTodosResponsaveis, listarResponsaveisInativos, buscarResponsaveis } from "../../service/resposaveis/responsaveis.service"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"

export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [apenasAtivos, setApenasAtivos] = useState(true)

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

  const fetchResponsaveis = apenasAtivos ? listarTodosResponsaveis : listarResponsaveisInativos

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSugestoes([])
      return
    }
    buscarResponsaveis(debouncedQuery).then((data) => {
      setSugestoes(Array.isArray(data) ? data : [])
    }).catch(console.error)
  }, [debouncedQuery])

  const handleSelect = (item) => {
    if (!item) {
      recarregarResponsaveis()
      return
    }
    setResponsaveis([item])
    setSugestoes([])
  }

  const recarregarResponsaveis = useCallback(() => {
    setLoading(true)
    fetchResponsaveis(page).then((response) => {
      setResponsaveis(response.content)
    }).catch((error) => {
      console.error(error)
      toast.error('Não foi possível listar os responsáveis')
    }).finally(() => {
      setLoading(false)
    })
  }, [page, fetchResponsaveis])

  useEffect(() => {
    if (!query) recarregarResponsaveis()
  }, [page, query, recarregarResponsaveis])

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
        </div>

        {loading ? (
          <Loading message="Carregando responsáveis..." />
        ) : (
          <TabelaResponsavel
            responsaveis={responsaveis}
            mostrandoInativos={!apenasAtivos}
          />
        )}

        {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={fetchResponsaveis} />}
      </Layout>
    </>
  )
}
