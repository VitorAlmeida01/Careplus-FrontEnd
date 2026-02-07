import { useState } from "react"
import Tabela from "../../components/tabelaFuncionario/Tabela"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import "./funcionarios.css"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/CadastroFuncionarioModal"

export default function Funcionarios() {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <>
      <Layout>
        {/* <div className="container-main"> */}
        <div className="containerHeader">
          <h3>Funcionarios</h3>
          <BarraPesquisa />
        </div>
        <div className="containerBotaoCadastro">
          <BotaoCadastro onClick={() => setModalAberto(true)} />
        </div>

        <Tabela />
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
