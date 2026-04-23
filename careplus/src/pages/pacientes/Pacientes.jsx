import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroPacienteModal from "../../components/modalCadastro/Pacientes/CadastroPacienteModal"
import TabelaPaciente from "../../components/tabelaPaciente/TabelaPaciente"
import { listarPacitentes, buscarPacientes } from "../../service/pacientes/pacientes.service"
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

  const [query, setQuery] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const debouncedQuery = useDebouncedValue(query, 300)

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
    listarPacitentes(page).then((response) =>{
      const resposta = response.content
      setPacientes(resposta)
    }).catch((error=>{
      console.error(error)
      toast.error('Não foi possível listar os pacientes')
    })).finally(() => {
      setLoading(false)
    })
  }, [page])

  useEffect(() =>{
    if (!query) recarregarPacientes()
  }, [page, query, recarregarPacientes])



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
          <BotaoCadastro onClick={() => navigate("/pacientes/cadastrar")} name={"Cadastrar"}/>

        </div>

        {loading ? (
          <Loading message="Carregando pacientes..." />
        ) : (
          <TabelaPaciente pacientes={pacientes}/>
        )}
        
        {!query && <Paginacao page={page} setPage={setPage} fetchTotalPages={listarPacitentes} />}
      </Layout>
      <CadastroPacienteModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSuccess={recarregarPacientes}
      />
    </>
  )
}
