import { useEffect, useState, useCallback } from "react"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroPacienteModal from "../../components/modalCadastro/Pacientes/CadastroPacienteModal"
import TabelaPaciente from "../../components/tabelaPaciente/TabelaPaciente"
import { listarPacitentes } from "../../service/pacientes/pacientes.service"
import { toast } from 'react-toastify'
import { PaginacaoPacientes } from "@/src/components/Paginacao/PaginacaoPacientes"



export default function Pacientes() {
  const [modalAberto, setModalAberto] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [page, setPage] = useState(0)

  const recarregarPacientes = useCallback(() => {
    listarPacitentes(page).then((response) =>{
      const resposta = response.content
      setPacientes(resposta)
      console.log(response.totalElements)
    }).catch((error=>{
      console.error(error)
      toast.error('Não foi possível listar os pacientes')
    }))
  }, [page])

  useEffect(() =>{
    recarregarPacientes()
  }, [page, recarregarPacientes])



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
        <PaginacaoPacientes page={page} setPage={setPage} />
      </Layout>
      <CadastroPacienteModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSuccess={recarregarPacientes}
      />
    </>
  )
}
