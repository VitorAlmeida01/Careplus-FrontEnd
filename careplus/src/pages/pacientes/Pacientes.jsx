import { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroFuncionarioModal from "../../components/modalCadastro/CadastroFuncionarioModal"
import TabelaPaciente from "../../components/tabelaPaciente/TabelaPaciente"
import { listarPacitentes } from "../../service/pacientes/pacientes.service"
import { toast } from 'react-toastify'

export default function Pacientes() {
  const [modalAberto, setModalAberto] = useState(false)
  const [pacientes, setPacientes] = useState([])

  useEffect(() =>{
    listarPacitentes().then((response) =>{
      setPacientes(response)
    }).catch((error=>{
      console.error(error)
      toast.error('Não foi possível listar os pacientes')
    }))
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

        <TabelaPaciente pacientes={pacientes}/>
      </Layout>
      <CadastroFuncionarioModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  )
}
