import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import CardConsultaAtual from './components/CardConsultaAtual'
import ColunaDireita from './components/ColunaDireita'
import Layout from '../../components/layout/Layout'
import { detalhesConsultaPorId } from "@/src/service/fichaClinica/fichaClinica.service"

export default function ConsultaAtual() {
  const [searchParams] = useSearchParams()
  const [detalhesConsulta, setDetalhesConsulta] = useState(null)

  useEffect(() => {
    const carregarConsulta = async () => {
      const idConsulta = searchParams.get("idConsulta")

      if (idConsulta) {
        try {
          const detalhes = await detalhesConsultaPorId(idConsulta)
          setDetalhesConsulta(detalhes || null)
          if (detalhes) {
            sessionStorage.setItem("consultaAtualDetalhes", JSON.stringify(detalhes))
          }
          return
        } catch (error) {
          console.error("Erro ao carregar detalhes da consulta por id:", error)
        }
      }

      const consultaSession = sessionStorage.getItem("consultaAtualDetalhes")
      if (consultaSession) {
        try {
          const dados = JSON.parse(consultaSession)
          setDetalhesConsulta(dados)
        } catch (error) {
          console.error("Erro ao ler dados da consulta na session:", error)
          setDetalhesConsulta(null)
        }
      }
    }

    carregarConsulta()
  }, [searchParams])

  const formatarData = (valor) => {
    if (!valor) return "-"
    const dataTexto = String(valor)

    if (/^\d{4}-\d{2}-\d{2}$/.test(dataTexto)) {
      const [ano, mes, dia] = dataTexto.split("-")
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

  return (
    <Layout>
      <div className="flex ml-5 gap-5 w-[95%] p-4 sm:flex-nowrap flex-wrap">
        <CardConsultaAtual
          data={formatarData(detalhesConsulta?.data)}
          horario={formatarHorario(
            detalhesConsulta?.horarioInicio,
            detalhesConsulta?.horarioFim,
          )}
          tipo={detalhesConsulta?.tipo || "-"}
          especialidade={detalhesConsulta?.especialidade || "-"}
          profissional={detalhesConsulta?.nomeProfissional || "-"}
        />

        <ColunaDireita
          dadosPaciente={detalhesConsulta?.dadosPaciente}
          ultimaConsulta={detalhesConsulta?.ultimaConsulta}
        />
      </div>
    </Layout>
  )
}
