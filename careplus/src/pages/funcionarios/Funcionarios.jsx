import Tabela from "../../components/tabelaFuncionario/Tabela"
import SideBar from "../../components/sidebar/SideBar"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import './funcionarios.css'
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"

export default function Funcionarios(){
    return(

        <>
        <Layout>
            {/* <div className="container-main"> */}
                <div className="containerHeader">
                    <h3>Funcionarios</h3>
                    <BarraPesquisa/>
                </div>
                <div className="containerBotaoCadastro">
                    <BotaoCadastro/>
                </div>

                <Tabela/>

            {/* </div> */}
        </Layout>
        </>

        
    )
}