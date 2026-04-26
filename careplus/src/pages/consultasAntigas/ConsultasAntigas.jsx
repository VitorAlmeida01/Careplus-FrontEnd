import { ChevronLeft } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import Layout from "../../components/layout/Layout"
import ConsultaAntiga from "../../components/ConsultaAntigaComponent/ConsultaAntiga"
import DetalhesConsultaModal from "../../components/modalConsulta/DetalhesConsultaModal"
import {
  detalhesConsultaPorId,
  ultimasConsultasPorPacienteFuncionario,
} from "../../service/fichaClinica/fichaClinica.service"
import { getFuncionarioId } from "../../service/login/jwtDecoder"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
  const [totalPaginas, setTotalPaginas] = useState(0)

  const [modalAberto, setModalAberto] = useState(false)
  const [consultaSelecionada, setConsultaSelecionada] = useState(null)

  useEffect(() => {
    if (!Number.isFinite(idPaciente) || !Number.isFinite(idFuncionario)) {
      setConsultas([])
      setTotalPaginas(0)
      return
    }

    ultimasConsultasPorPacienteFuncionario({
      idPaciente,
      pagina: page,
      idFuncionario,
    })
      .then((response) => {
        setConsultas(response?.content || [])
        setTotalPaginas(response?.totalPages || 0)
      })
      .catch((error) => {
        console.error("Erro ao carregar últimas consultas:", error)
        setConsultas([])
        setTotalPaginas(0)
      })
  }, [idPaciente, idFuncionario, page])

  const paginasAtuais = useMemo(() => {
    return [page - 1, page, page + 1].filter(
      (pagina) => pagina >= 0 && pagina < totalPaginas,
    )
  }, [page, totalPaginas])

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

    if (especialidades.length > 0) {
      return especialidades.join(" · ")
    }

    return consulta?.especialidade || consulta?.tipo || "Consulta"
  }

  const mudarPagina = (novaPagina) => {
    setPage(novaPagina)

    const novosParams = new URLSearchParams(searchParams)
    novosParams.set("pagina", String(novaPagina))

    if (Number.isFinite(idPaciente)) {
      novosParams.set("idPaciente", String(idPaciente))
    }

    setSearchParams(novosParams)
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
      const response = await detalhesConsultaPorId(idConsulta)
      setConsultaSelecionada(response || consulta)
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
      <div className="w-full h-full p-4 md:p-6 ">

        {/* Título com botão voltar */}
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

        {/* Lista de consultas */}
        <div className="space-y-3 md:space-y-4 mx-auto">
          {consultas.map((consulta) => (
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
          ))}
        </div>

        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?idPaciente=${idPaciente}&pagina=${page - 1}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (page > 0) {
                      mudarPagina(page - 1)
                    }
                  }}
                />
              </PaginationItem>

              {paginasAtuais.map((pagina, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`?idPaciente=${idPaciente}&pagina=${pagina}`}
                    onClick={(e) => {
                      e.preventDefault()
                      mudarPagina(pagina)
                    }}
                    isActive={page === pagina}
                  >
                    {pagina + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href={`?idPaciente=${idPaciente}&pagina=${page + 1}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (page < totalPaginas - 1) {
                      mudarPagina(page + 1)
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Modal de Detalhes */}
        {consultaSelecionada && (
          <DetalhesConsultaModal
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
