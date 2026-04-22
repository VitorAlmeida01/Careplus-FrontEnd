import { useEffect, useState, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import TabelaResponsavel from "../../components/tabelaResponsaveis/TabelaResponsaveis"
import { listarTodosResponsaveis } from "../../service/resposaveis/responsaveis.service"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"



export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState([])
  const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)


  const recarregarResponsaveis = useCallback(() => {
    setLoading(true)
    listarTodosResponsaveis(page).then((response) =>{
      const resposta = response.content
      setResponsaveis(resposta)
    }).catch((error=>{
      console.error(error)
      toast.error('Nao foi possivel listar os responsaveis')
    })).finally(() => {
      setLoading(false)
    })
  }, [page])

  useEffect(() =>{
    recarregarResponsaveis()
  }, [page, recarregarResponsaveis])



  return (
    <>
      <Layout>
        <div className="flex justify-end items-center h-[7%] mx-[1%]">
          <BarraPesquisa />
        </div>

        {loading ? (
          <Loading message="Carregando responsaveis..." />
        ) : (
          <TabelaResponsavel responsaveis={responsaveis}/>
        )}
        <Paginacao page={page} setPage={setPage} fetchTotalPages={listarTodosResponsaveis} />
      </Layout>
    </>
  )
}
