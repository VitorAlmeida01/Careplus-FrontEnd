import { useState, useEffect } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/Funcionarios/CadastroFuncionarioModal"
import TabelaFuncionario from "../../components/tabelaFuncionario/TabelaFuncionario"
import { listarFuncionarios } from "../../service/funcionarios/funcionarios.service"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"

export default function Funcionarios() {
  const [modalAberto, setModalAberto] = useState(false)
  const [funcionarios, setFuncionarios] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    listarFuncionarios(page).then((response) => {
      const resposta = response.content
      setFuncionarios(resposta)
      console.log(response.totalElements)
    }).catch((error) => {
      console.error('Erro ao buscar funcionarios', error)
    })
  }, [page])




  return (
    <>
      <Layout>
        <div className="flex justify-end items-center h-[7%] mx-[1%]">
          <BarraPesquisa />
        </div>
        <div className="w-[90%] flex my-[1%] mx-[4%] justify-end">
          <BotaoCadastro onClick={() => setModalAberto(true)} />
        </div>

        <TabelaFuncionario funcionarioss={funcionarios} />
        <Paginacao page={page} setPage={setPage} />
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
