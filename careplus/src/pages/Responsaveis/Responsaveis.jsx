import { useEffect, useState, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import TabelaResponsavel from "../../components/tabelaResponsaveis/TabelaResponsaveis"
import { listarTodosResponsaveis, buscarResponsaveis } from "../../service/resposaveis/responsaveis.service"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"

export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

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
    listarTodosResponsaveis(page).then((response) => {
      setResponsaveis(response.content)
    }).catch((error) => {
      console.error(error)
      toast.error('Não foi possível listar os responsáveis')
    }).finally(() => {
      setLoading(false)
    })
  }, [page])

  useEffect(() => {
    if (!query) recarregarResponsaveis()
  }, [page, query, recarregarResponsaveis])

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

        {loading ? (
          <Loading message="Carregando responsáveis..." />
        ) : (
          <TabelaResponsavel responsaveis={responsaveis}/>
        )}

        {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={listarTodosResponsaveis} />}
      </Layout>
    </>
  )
}
