import { useState, useEffect, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import TabelaFuncionario from "../../components/tabelaFuncionario/TabelaFuncionario"
import { listarSubordinados, buscarFuncionarios } from "../../service/funcionarios/funcionarios.service"
import { getFuncionarioId } from "../../service/login/jwtDecoder"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import { toast } from "react-toastify"
import Loading from "../../components/loading/Loading"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"

export default function Subordinados() {
  const managerId = getFuncionarioId()

  const [funcionarios, setFuncionarios] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState("")
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

  const fetchSubordinados = useCallback((pagina) => listarSubordinados(managerId, pagina), [managerId])

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSugestoes([])
      return
    }
    buscarFuncionarios(debouncedQuery)
      .then((data) => setSugestoes(Array.isArray(data) ? data : []))
      .catch(console.error)
  }, [debouncedQuery])

  const handleSelect = (item) => {
    if (!item) {
      recarregarSubordinados()
      return
    }
    setFuncionarios([item])
    setSugestoes([])
  }

  const recarregarSubordinados = useCallback(() => {
    setLoading(true)
    fetchSubordinados(page)
      .then((response) => setFuncionarios(response.content))
      .catch((error) => {
        console.error(error)
        toast.error("Não foi possível listar os subordinados")
      })
      .finally(() => setLoading(false))
  }, [fetchSubordinados, page])

  useEffect(() => {
    if (!query) recarregarSubordinados()
  }, [page, query, recarregarSubordinados])

  return (
    <Layout>
      <div className="flex justify-end items-center h-[7%] my-[1%] mx-[4%] w-[90%]">
        <BarraPesquisa
          query={query}
          onQueryChange={setQuery}
          sugestoes={sugestoes}
          onSelect={handleSelect}
        />
      </div>

      <div className="w-[90%] flex my-[1%] mx-[4%] items-center">
        <h2 className="text-lg font-semibold text-slate-700">Meus Subordinados</h2>
      </div>

      {loading ? (
        <Loading message="Carregando subordinados..." />
      ) : (
        <TabelaFuncionario funcionarios={funcionarios} mostrandoInativos={false} />
      )}

      {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={fetchSubordinados} />}
    </Layout>
  )
}
