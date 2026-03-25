import { useEffect, useState, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import TabelaResponsavel from "../../components/tabelaResponsaveis/TabelaResponsaveis"
import { listarTodosResponsaveis } from "../../service/resposaveis/responsaveis.service"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"



export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState([])
  const [loading, setLoading] = useState(true)

  const recarregarResponsaveis = useCallback(() => {
    setLoading(true)
    listarTodosResponsaveis().then((response) =>{
      const resposta = Array.isArray(response) ? response : []
      setResponsaveis(resposta)
    }).catch((error=>{
      console.error(error)
      toast.error('Nao foi possivel listar os responsaveis')
    })).finally(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() =>{
    recarregarResponsaveis()
  }, [recarregarResponsaveis])



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
      </Layout>
    </>
  )
}
