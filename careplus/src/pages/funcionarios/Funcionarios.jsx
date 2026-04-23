import { useState, useEffect } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/Funcionarios/CadastroFuncionarioModal"
import TabelaFuncionario from "../../components/tabelaFuncionario/TabelaFuncionario"
import { listarFuncionarios, buscarFuncionarios } from "../../service/funcionarios/funcionarios.service"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"
import useDebouncedValue from "@/src/service/searchEngine/useDebounceValue"

export default function Funcionarios() {
  const [modalAberto, setModalAberto] = useState(false)
  const [funcionarios, setFuncionarios] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

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

  function recarregarFuncionarios() {
    setLoading(true)
    listarFuncionarios(page).then((response) => {
      setFuncionarios(response.content)
    }).catch((error) => {
      console.error('Erro ao buscar funcionarios', error)
      toast.error('Não foi possível listar os funcionarios')
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (!query) recarregarFuncionarios()
  }, [page, query])




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
        <div className="w-[90%] flex my-[1%] mx-[4%] justify-end">
          <BotaoCadastro onClick={() => setModalAberto(true)} name={"Cadastrar"}/>
        </div>

        {loading ? (
          <Loading message="Carregando funcionários..." />
        ) : (
          <TabelaFuncionario funcionarios={funcionarios} />
        )}
        
        {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={listarFuncionarios} />}
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
