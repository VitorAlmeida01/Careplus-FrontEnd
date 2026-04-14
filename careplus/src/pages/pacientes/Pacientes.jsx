import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import BarraPesquisa from "../../components/barraPesquisa"
import BotaoCadastro from "../../components/botaoCadastro/BotaoCadastro"
import CadastroPacienteModal from "../../components/modalCadastro/Pacientes/CadastroPacienteModal"
import TabelaPaciente from "../../components/tabelaPaciente/TabelaPaciente"
import { listarPacitentes } from "../../service/pacientes/pacientes.service"
import { toast } from 'react-toastify'
import { PaginacaoPacientes } from "@/src/components/Paginacao/PaginacaoPacientes"
import Loading from "../../components/loading/Loading"



export default function Pacientes() {
  const navigate = useNavigate()
  const [modalAberto, setModalAberto] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const recarregarPacientes = useCallback(() => {
    setLoading(true)
    listarPacitentes(page).then((response) =>{
      const resposta = response.content
      setPacientes(resposta)
    }).catch((error=>{
      console.error(error)
      toast.error('Não foi possível listar os pacientes')
    })).finally(() => {
      setLoading(false)
    })
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
          <BotaoCadastro onClick={() => navigate("/pacientes/cadastrar")} />

        </div>

        {loading ? (
          <Loading message="Carregando pacientes..." />
        ) : (
          <TabelaPaciente pacientes={pacientes}/>
        )}
        
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
