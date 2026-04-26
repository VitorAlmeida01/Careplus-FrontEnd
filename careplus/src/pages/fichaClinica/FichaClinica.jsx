import { useCallback, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import CardFichaClinica from "../../components/cardFichaClinica/CardFichaClinica"
import Layout from "../../components/layout/Layout"
import CardPerfil from "../../components/cardPerfil/CardPerfil"
import BotaoLayout from "../../components/botaoLayout/BotaoLayout"
import EditarFichaClinicaModal from "../../components/modalFichaClinica/EditarFichaClinicaModal"
import EditarMedicacoesModal from "../../components/modalFichaClinica/EditarMedicacoesModal"
import ProximaConsultaModal from "../../components/modalFichaClinica/ProximaConsultaModal"
import InformacoesContatoModal from "../../components/modalFichaClinica/InformacoesContatoModal"
import { fichaClinicaPorPaciente } from "@/src/service/fichaClinica/fichaClinica.service"
import { contatoCuidadorPorPaciente } from "@/src/service/fichaClinica/fichaClinica.service"
import { proximaConsultaPorPaciente } from "@/src/service/fichaClinica/fichaClinica.service"
import { detalhesConsultaPorId } from "@/src/service/fichaClinica/fichaClinica.service"

export default function FichaClinica() {
  const navigate = useNavigate()
  const [modalFichaClinica, setModalFichaClinica] = useState(false)
  const [modalMedicacoes, setModalMedicacoes] = useState(false)
  const [modalProximaConsulta, setModalProximaConsulta] = useState(false)
  const [modalContato, setModalContato] = useState(false)

  const [searchParams] = useSearchParams()

  const idPaciente = searchParams.get("idPaciente")

  //   "fichaClinica": {
  //   "id": 1,
  //   "idade": 35,
  //   "anamnese": "Histórico de atraso de fala",
  //   "diagnostico": "TEA leve",
  //   "planoTerapeutico": "Bradesco"
  // },


  const [fichaClinica, setFichaClinica] = useState({})

  const [fichaClinicaEdit, setFichaClinicaEdit] = useState({
    idFicha: undefined,
    idPaciente: undefined,
    convenio: undefined,
    hiperfoco: undefined,
    desfraldado: undefined,
    atendimentoEspecial: undefined,
    resumoClinico: undefined,
    anamnese: undefined,
    diagnostico: undefined,
    nivelAgressividade: undefined,
  })

  const [responsavel, setResponsavel] = useState({})

  const [ultimaConsulta, setUltimaConsulta] = useState({
    consultaId: undefined,
    data: undefined,
    especialidade: undefined,
    nomeFuncionario: undefined,
  })
  const [progresso, setProgresso] = useState({
    percentual: undefined,
    tratamentoFeito: undefined,
    tratamentoAtual: undefined,
  })

  const [proximaConsulta, setProximaConsulta] = useState(undefined)

  // Atualiza os estados derivados quando fichaClinica muda
  useEffect(() => {

    setFichaClinicaEdit({
      idFicha: fichaClinica?.fichaClinica?.id,
      idPaciente: fichaClinica?.pacienteId,
      convenio: fichaClinica?.fichaClinica?.planoTerapeutico,
      hiperfoco: fichaClinica?.fichaClinica?.hiperfoco,
      desfraldado: fichaClinica?.fichaClinica?.desfraldada,
      atendimentoEspecial: fichaClinica?.fichaClinica?.atendimentoEspecial,
      resumoClinico: fichaClinica?.fichaClinica?.observacoesComportamentais,
      anamnese: fichaClinica?.fichaClinica?.anamnese,
      diagnostico: fichaClinica?.fichaClinica?.diagnostico,
      nivelAgressividade: fichaClinica?.fichaClinica?.atendimentoEspecial,
    })

    setUltimaConsulta({
      consultaId: fichaClinica?.ultimaConsulta?.consultaId,
      data: fichaClinica?.ultimaConsulta?.data,
      especialidade: fichaClinica?.ultimaConsulta?.especialidade,
      nomeFuncionario: fichaClinica?.ultimaConsulta?.nomeFuncionario,
    })
    setProgresso({
      percentual: fichaClinica?.progresso?.percentual,
      tratamentoFeito: fichaClinica?.progresso?.tratamentoFeito,
      tratamentoAtual: fichaClinica?.progresso?.tratamentoAtual,
    })
    setProximaConsulta(fichaClinica?.proximaConsulta)
  }, [fichaClinica])
  
  const exibirFichaClinica = useCallback(() => {
    fichaClinicaPorPaciente(idPaciente).then((response) => {
      const resposta = response
      setFichaClinica(resposta)
    })

  }, [idPaciente])

  const abrirModalContato = async () => {
    try {
      const response = await contatoCuidadorPorPaciente(idPaciente)
      const contato = Array.isArray(response) ? response[0] : response
      setResponsavel(contato || {})
    } catch (error) {
      console.error("Erro ao buscar contato do cuidador:", error)
      setResponsavel({})
    } finally {
      setModalContato(true)
    }
  }

  const abrirModalProximaConsulta = async () => {
    try {
      const response = await proximaConsultaPorPaciente(idPaciente)
      setProximaConsulta(response || null)
    } catch (error) {
      console.error("Erro ao buscar proxima consulta:", error)
      setProximaConsulta(null)
    } finally {
      setModalProximaConsulta(true)
    }
  }

  const realizarAnotacoesProximaConsulta = async (consultaId) => {
    try {
      if (consultaId) {
        const detalhes = await detalhesConsultaPorId(consultaId)
        sessionStorage.setItem("consultaAtualDetalhes", JSON.stringify(detalhes))
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da consulta:", error)
    } finally {
      setModalProximaConsulta(false)
      if (consultaId) {
        navigate(`/pacientes/consulta-atual?idConsulta=${consultaId}`)
      } else {
        navigate("/pacientes/consulta-atual")
      }
    }
  }

  useEffect(() => {
    exibirFichaClinica()
  }, [exibirFichaClinica])

  const formatarBoolean = (valor) => {
    if (valor === true) return "Sim"
    if (valor === false) return "Nao"
    return "-"
  }

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

  const exibirValor = (valor) => {
    if (valor === null || valor === undefined || valor === "") return "-"
    return valor
  }

  return (
    <>
      <Layout>
        <section className="h-fit ">
          <section>
            <section className="w-full">
              <CardPerfil
                onContatoClick={abrirModalContato}
                onProximaConsultaClick={abrirModalProximaConsulta}
                fichaClinica={fichaClinica}
                onCidUpdated={exibirFichaClinica}
              />
            </section>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:h-fit">
            <section className="md:col-span-2">
              <CardFichaClinica estilo="h-auto md:h-full w-full">
                <CardFichaClinica.Header>
                  <section className="flex justify-between mb-[10px]">
                    <h2>Ficha Clinica</h2>
                    <BotaoLayout
                      nome="Editar"
                      onClick={() => setModalFichaClinica(true)}
                    />
                  </section>
                </CardFichaClinica.Header>
                <CardFichaClinica.Body>
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    <section>
                      <label>Diagnóstico:</label>
                      <p>
                        <b>
                          {exibirValor(fichaClinica?.fichaClinica?.diagnostico)}
                        </b>
                      </p>
                    </section>
                    <section>
                      <label>Convênio:</label>
                      <p>
                        <b>
                          {exibirValor(
                            fichaClinica?.fichaClinica?.planoTerapeutico,
                          )}
                        </b>
                      </p>
                    </section>
                    <section>
                      <label>Hiperfoco:</label>
                      <p>
                        <b>{exibirValor(fichaClinica?.fichaClinica?.hiperfoco)}</b>
                      </p>
                    </section>
                    <section>
                      <label>Desfraldada:</label>
                      <p>
                        <b>{formatarBoolean(fichaClinica?.fichaClinica?.desfraldada)}</b>
                      </p>
                    </section>
                    <section>
                      <label>Atendimento Especial:</label>
                      <p>
                        <b>
                          {exibirValor(fichaClinica?.fichaClinica?.atendimentoEspecial)}
                        </b>
                      </p>
                    </section>
                  </section>

                  <div className="border-t border-gray-200 my-4" />

                  <section>
                    <label>Anamnese:</label>
                    <p>
                      <b>{exibirValor(fichaClinica?.fichaClinica?.anamnese)}</b>
                    </p>
                  </section>

                  <div className="border-t border-gray-200 my-4" />

                  <section>
                    <label>Observações Comportamentais:</label>
                    <p>
                      <b>
                        {exibirValor(
                          fichaClinica?.fichaClinica?.observacoesComportamentais,
                        )}
                      </b>
                    </p>
                  </section>
                </CardFichaClinica.Body>
              </CardFichaClinica>
            </section>

            <section className="md:col-span-1 flex flex-col gap-4">
              <CardFichaClinica estilo="h-auto md:h-full w-full">
                <CardFichaClinica.Header>
                  <section className="flex justify-between mb-[10px]">
                    <h2>Medicações</h2>
                    <BotaoLayout
                      nome="Editar"
                      onClick={() => setModalMedicacoes(true)}
                    />
                  </section>
                </CardFichaClinica.Header>
                <CardFichaClinica.Body>
                  {Array.isArray(fichaClinica?.medicacoes) &&
                  fichaClinica.medicacoes.length > 0 ? (
                    <section className="flex flex-col gap-2">
                      {fichaClinica.medicacoes.map((medicacao) => (
                        <div key={medicacao.idMedicacao}>
                          <label>{exibirValor(medicacao.nomeMedicacao)}:</label>
                          <p>
                            <b>
                              Inicio: {formatarData(medicacao.dataInicio)} | Fim: {formatarData(medicacao.dataFim)} | Ativo: {medicacao?.ativo ? "Sim" : "Não"}
                            </b>
                          </p>
                        </div>
                      ))}
                    </section>
                  ) : (
                    <p>-</p>
                  )}
                </CardFichaClinica.Body>
              </CardFichaClinica>

              <CardFichaClinica estilo="h-auto md:h-full w-full">
                <CardFichaClinica.Header>
                  <section className="flex justify-between mb-1.25">
                    <h2>Última consulta</h2>
                    <BotaoLayout
                      nome="Visualizar"
                      onClick={() =>
                        navigate(`/pacientes/consultas-antigas?idPaciente=${idPaciente}&pagina=0`)
                      }
                    />
                  </section>
                </CardFichaClinica.Header>
                <CardFichaClinica.Body>
                  <section className="flex md:flex-nowrap justify-between">
                    <section className="flex flex-col gap-2">
                      <div>
                        <label>Data:</label>
                        <p>
                          <b>
                            {formatarData(fichaClinica?.ultimaConsulta?.data)}
                          </b>
                        </p>
                      </div>

                      <div>
                        <label>Especialidade:</label>
                        <p>
                          <b>{exibirValor(fichaClinica?.ultimaConsulta?.especialidade)}</b>
                        </p>
                      </div>

                      <div>
                        <label>Funcionário:</label>
                        <p>
                          <b>{exibirValor(fichaClinica?.ultimaConsulta?.nomeFuncionario)}</b>
                        </p>
                      </div>
                    </section>
                  </section>
                </CardFichaClinica.Body>
              </CardFichaClinica>
            </section>
          </section>
        </section>
      </Layout>

      {/* Modais */}
      <EditarFichaClinicaModal
        isOpen={modalFichaClinica}
        dados={fichaClinicaEdit}
        onSaved={exibirFichaClinica}
        onClose={() => setModalFichaClinica(false)}
      />
      <EditarMedicacoesModal
        isOpen={modalMedicacoes}
        onClose={() => setModalMedicacoes(false)}
        medicacoes={fichaClinica?.medicacoes}
        idProntuario={fichaClinica?.fichaClinica?.id}
        onMedicacoesUpdated={exibirFichaClinica}
      />
      <ProximaConsultaModal
        isOpen={modalProximaConsulta}
        dados={proximaConsulta}
        onRealizarAnotacoes={realizarAnotacoesProximaConsulta}
        onClose={() => setModalProximaConsulta(false)}
      />
      <InformacoesContatoModal
        isOpen={modalContato}
        dados={responsavel}
        onClose={() => setModalContato(false)}
      />
    </>
  )
}
