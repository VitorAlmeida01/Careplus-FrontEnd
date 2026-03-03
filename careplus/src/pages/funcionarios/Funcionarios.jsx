import { useState, useEffect } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/Funcionarios/CadastroFuncionarioModal"
import TabelaFuncionario from "../../components/tabelaFuncionario/TabelaFuncionario"
import { listarFuncionarios } from "../../service/funcionarios/funcionarios.service"

export default function Funcionarios() {
  const [modalAberto, setModalAberto] = useState(false)

  const [funcionarios, setFuncionarios] = useState([])

  useEffect(() =>{

    listarFuncionarios().then((response) =>{
      setFuncionarios(response)
    }).catch((error) =>{
      console.error('Erro ao buscar funcionarios', error)
    })

  }, [])


  return (
    <>
      <Layout>
        <div className="flex justify-end items-center h-[7%] mx-[1%]">
          <BarraPesquisa />
        </div>
        <div className="w-[90%] flex my-[1%] mx-[4%] justify-end">
          <BotaoCadastro onClick={() => setModalAberto(true)} />
        </div>

        <TabelaFuncionario funcionarioss={funcionarios}/>
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
