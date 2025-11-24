import Tabela from "../../components/tabelaFuncionario/Tabela"
import SideBar from "../../components/sidebar/SideBar"
import Layout from "../../components/layout/Layout"
import './funcionarios.css'

export default function Funcionarios(){
    return(

        <div className="conteudo">
        <Layout>
            <div className="container-main">
                
                <Tabela/>

            </div>
        </Layout>
        </div>
        
    )
}