import { useState, useEffect } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/Funcionarios/CadastroFuncionarioModal"
import TabelaFuncionario from "../../components/tabelaFuncionario/TabelaFuncionario"
import { listarFuncionarios } from "../../service/funcionarios/funcionarios.service"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import { toast } from 'react-toastify'
import Loading from "../../components/loading/Loading"

export default function Funcionarios() {
  const [modalAberto, setModalAberto] = useState(false)
  const [funcionarios, setFuncionarios] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    listarFuncionarios(page).then((response) => {
      const resposta = response.content
      setFuncionarios(resposta)
    }).catch((error) => {
      console.error('Erro ao buscar funcionarios', error)
      toast.error('Não foi possível listar os funcionarios')
    }).finally(() => {
      setLoading(false)
    })
  }, [page])




  return (
    <>
      <Layout>
        <div className="flex justify-end items-center h-[7%] mx-[1%]">
          <BarraPesquisa />
          <BotaoCadastro name={"Pesquisar"}/>
        </div>
        <div className="w-[90%] flex my-[1%] mx-[4%] justify-end">
          <BotaoCadastro onClick={() => setModalAberto(true)} name={"Cadastrar"}/>
        </div>

        {loading ? (
          <Loading message="Carregando funcionários..." />
        ) : (
          <TabelaFuncionario funcionarios={funcionarios} />
        )}
        
        <Paginacao page={page} setPage={setPage} fetchTotalPages={listarFuncionarios} />
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
