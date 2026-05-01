import { ChevronLeft } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import ConsultaAntiga from "../../components/ConsultaAntigaComponent/ConsultaAntiga"
import DetalhesConsultaAntigaModal from "../../components/modalConsulta/DetalhesConsultaAntigaModal"
import { Paginacao } from "@/src/components/Paginacao/Paginacao"
import {
  detalhesConsultaAnteriorPorId,
  ultimasConsultasPorPacienteFuncionario,
} from "../../service/fichaClinica/fichaClinica.service"
import { getFuncionarioId } from "../../service/login/jwtDecoder"

export default function ConsultasAntigas() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const idPaciente = Number(searchParams.get("idPaciente"))
  const paginaInicial = Number(searchParams.get("pagina"))

  const [page, setPage] = useState(
    Number.isFinite(paginaInicial) && paginaInicial >= 0 ? paginaInicial : 0,
  )
  const idFuncionario = getFuncionarioId()

  const [consultas, setConsultas] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [consultaSelecionada, setConsultaSelecionada] = useState(null)

  useEffect(() => {
    if (!Number.isFinite(idPaciente) || idPaciente <= 0 || !Number.isFinite(idFuncionario)) {
      setConsultas([])
      return
    }

    ultimasConsultasPorPacienteFuncionario({ idPaciente, pagina: page, idFuncionario })
      .then((response) => setConsultas(response?.content || []))
      .catch((error) => {
        console.error("Erro ao carregar últimas consultas:", error)
        setConsultas([])
      })

    const novosParams = new URLSearchParams(searchParams)
    novosParams.set("pagina", String(page))
    if (Number.isFinite(idPaciente)) novosParams.set("idPaciente", String(idPaciente))
    setSearchParams(novosParams, { replace: true })
  }, [idPaciente, idFuncionario, page])

  const fetchTotalPaginas = useCallback(
    (pagina) => ultimasConsultasPorPacienteFuncionario({ idPaciente, pagina, idFuncionario }),
    [idPaciente, idFuncionario],
  )

  const formatarData = (valor) => {
    if (!valor) return "-"
    const dataTexto = String(valor)
    const dataBase = dataTexto.includes("T") ? dataTexto.split("T")[0] : dataTexto
    if (/^\d{4}-\d{2}-\d{2}$/.test(dataBase)) {
      const [ano, mes, dia] = dataBase.split("-")
      return `${dia}/${mes}/${ano}`
    }
    const data = new Date(dataTexto)
    if (Number.isNaN(data.getTime())) return "-"
    return data.toLocaleDateString("pt-BR")
  }

  const formatarHorario = (inicio, fim) => {
    const horarioInicio = inicio ? String(inicio).slice(0, 5) : "-"
    const horarioFim = fim ? String(fim).slice(0, 5) : "-"
    return `${horarioInicio} - ${horarioFim}`
  }

  const formatarEspecialidades = (consulta) => {
    const especialidades = Array.from(
      new Set((consulta?.funcionarios || []).map((f) => f?.especialidade).filter(Boolean)),
    )
    if (especialidades.length > 0) return especialidades.join(" · ")
    return consulta?.especialidade || consulta?.tipo || "Consulta"
  }

  const nomePacienteCabecalho =
    consultas?.[0]?.paciente?.nome ||
    consultas?.[0]?.dadosPaciente?.nome ||
    consultas?.[0]?.nomePaciente ||
    (Number.isFinite(idPaciente) ? `Paciente #${idPaciente}` : "Paciente")

  const abrirDetalhes = async (consulta) => {
    setConsultaSelecionada(consulta)
    setModalAberto(true)

    const idConsulta = consulta?.consultaId || consulta?.id
    if (!idConsulta) return

    try {
      const response = await detalhesConsultaAnteriorPorId(idConsulta)
      if (response) {
        setConsultaSelecionada({ ...consulta, ...response, paciente: consulta.paciente })
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes da consulta:", error)
    }
  }

  const fecharModal = () => {
    setModalAberto(false)
    setConsultaSelecionada(null)
  }

  return (
    <Layout>
      <div className="w-full h-full p-4 md:p-6 flex flex-col">

        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-base md:text-xl font-medium text-gray-900">
            Últimas Consultas - {nomePacienteCabecalho}
          </h1>
        </div>

        <div className="flex-1 space-y-3 md:space-y-4 mx-auto w-full">
          {consultas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <p className="text-base">Nenhuma consulta concluída encontrada.</p>
            </div>
          ) : (
            consultas.map((consulta) => (
              <ConsultaAntiga
                key={consulta.consultaId || consulta.id}
                titulo={formatarEspecialidades(consulta)}
                data={formatarData(consulta?.data)}
                horario={formatarHorario(consulta?.horarioInicio, consulta?.horarioFim)}
                profissional={
                  consulta?.funcionarios?.[0]?.nome ||
                  consulta?.nomeProfissional ||
                  consulta?.nomeFuncionarioUltimaConsulta ||
                  "-"
                }
                tratamento={null}
                onVerDetalhes={() => abrirDetalhes(consulta)}
              />
            ))
          )}
        </div>

        <div className="sticky bottom-0 py-3">
          <Paginacao page={page} setPage={setPage} fetchTotalPages={fetchTotalPaginas} />
        </div>

        {consultaSelecionada && (
          <DetalhesConsultaAntigaModal
            isOpen={modalAberto}
            onClose={fecharModal}
            consulta={consultaSelecionada}
            mostrarObservacoesNoLugarProfissional
          />
        )}
      </div>
    </Layout>
  )
}
