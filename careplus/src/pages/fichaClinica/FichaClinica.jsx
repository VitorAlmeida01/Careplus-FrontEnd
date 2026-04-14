import { useCallback, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import CardFichaClinica from "../../components/cardFichaClinica/CardFichaClinica"
import Layout from "../../components/layout/Layout"
import CardPerfil from "../../components/cardPerfil/CardPerfil"
import BotaoLayout from "../../components/botaoLayout/BotaoLayout"
import EditarFichaClinicaModal from "../../components/modalFichaClinica/EditarFichaClinicaModal"
import EditarObservacoesModal from "../../components/modalFichaClinica/EditarObservacoesModal"
import EditarObservacoesComportamentaisModal from "../../components/modalFichaClinica/EditarObservacoesComportamentaisModal"
import ProximaConsultaModal from "../../components/modalFichaClinica/ProximaConsultaModal"
import InformacoesContatoModal from "../../components/modalFichaClinica/InformacoesContatoModal"
import { fichaClinicaPorPaciente } from "@/src/service/fichaClinica/fichaClinica.service"
import {responsavelPorId} from "@/src/service/fichaClinica/fichaClinica.service"

export default function FichaClinica() {
  const navigate = useNavigate()
  const [modalFichaClinica, setModalFichaClinica] = useState(false)
  const [modalObservacoes, setModalObservacoes] = useState(false)
  const [modalObservacoesComportamentais, setModalObservacoesComportamentais] =
    useState(false)
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
    id: undefined,
    idade: undefined,
    anamnese: undefined,
    diagnostico: undefined,
    planoTerapeutico: undefined
  })

  const [responsavel, setResponsavel] = useState({})
  const [observacoes, setObservacoes] = useState({
    cid: undefined,
    medicacao: undefined,
    atendimentoEspecial: undefined,
    desfraldada: undefined,
    hiperfoco: undefined,
  })
  const [observacoesComportamentais, setObservacoesComportamentais] = useState(undefined)

  const [ultimaConsulta, setUltimaConsulta] = useState({
    data: undefined,
    materiais: undefined,
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
      id: fichaClinica?.fichaClinica?.id,
      nome: fichaClinica?.nome,
      idade: fichaClinica?.fichaClinica?.idade,
      anamnese: fichaClinica?.fichaClinica?.anamnese,
      diagnostico: fichaClinica?.fichaClinica?.diagnostico,
      planoTerapeutico: fichaClinica?.fichaClinica?.planoTerapeutico,
    })

    setObservacoes({
      cid: fichaClinica?.observacoes?.cid,
      medicacao: fichaClinica?.observacoes?.medicacao,
      atendimentoEspecial: fichaClinica?.observacoes?.atendimentoEspecial,
      desfraldada: fichaClinica?.observacoes?.desfraldada,
      hiperfoco: fichaClinica?.observacoes?.hiperfoco,
    })
    setObservacoesComportamentais(fichaClinica?.observacoesComportamentais)
    setUltimaConsulta({
      data: fichaClinica?.ultimaConsulta?.data,
      materiais: fichaClinica?.ultimaConsulta?.materiais,
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

    responsavelPorId(idPaciente).then((response) =>{
      const resposta = response
      setResponsavel(resposta)
    })

  }, [idPaciente])

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

    const data = new Date(valor)
    if (Number.isNaN(data.getTime())) return "-"

    return data.toLocaleDateString("pt-BR")
  }

  const exibirValor = (valor) => {
    if (valor === null || valor === undefined || valor === "") return "-"
    return valor
  }

  const materiaisUltimaConsulta = fichaClinica?.ultimaConsulta?.materiais
    ? fichaClinica.ultimaConsulta.materiais
    : "-"


  return (
    <>
      <Layout>
        <section className="h-fit ">
          <section>
            <section className="w-full">
              <CardPerfil
                onContatoClick={() => setModalContato(true)}
                onProximaConsultaClick={() => setModalProximaConsulta(true)}
                fichaClinica={fichaClinica}
              />
            </section>
          </section>
          <section className="flex flex-wrap sm:h-fit">
            <section className="flex gap-2 w-full flex-wrap md:flex-nowrap ">
              <CardFichaClinica estilo="h-auto md:h-full">
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
                  <section>
                    <label>Nome:</label>
                    <p>
                      <b>{exibirValor(fichaClinica?.nome)}</b>
                    </p>
                  </section>
                  <section>
                    <label>Idade:</label>
                    <p>
                      <b>
                        {exibirValor(fichaClinica?.fichaClinica?.idade)} Anos
                      </b>
                    </p>
                  </section>
                  <section>
                    <label>Anamnese:</label>
                    <p>
                      <b>{exibirValor(fichaClinica?.fichaClinica?.anamnese)}</b>
                    </p>
                  </section>
                  <section>
                    <label>Diagnóstico</label>
                    <p>
                      <b>
                        {exibirValor(fichaClinica?.fichaClinica?.diagnostico)}
                      </b>
                    </p>
                  </section>
                  <section>
                    <label>Plano terapêutico</label>
                    <p>
                      <b>
                        {exibirValor(
                          fichaClinica?.fichaClinica?.planoTerapeutico,
                        )}
                      </b>
                    </p>
                  </section>
                </CardFichaClinica.Body>
              </CardFichaClinica>

              <CardFichaClinica estilo="h-auto md:h-full">
                <CardFichaClinica.Header>
                  <section className="flex justify-between mb-[10px]">
                    <h2>Observações Comportamentais</h2>
                    <BotaoLayout
                      nome="Editar"
                      onClick={() => setModalObservacoesComportamentais(true)}
                    />
                  </section>
                </CardFichaClinica.Header>
                <CardFichaClinica.Body>
                  <p>{exibirValor(fichaClinica?.observacoesComportamentais)}</p>
                </CardFichaClinica.Body>
              </CardFichaClinica>
            </section>
            <section className="mt-5 flex gap-10 w-full flex-wrap md:flex-nowrap">
              <CardFichaClinica estilo="h-auto md:h-full">
                <CardFichaClinica.Header>
                  <section className="flex justify-between mb-1.25">
                    <h2>Observações</h2>
                    <BotaoLayout
                      nome="Editar"
                      onClick={() => setModalObservacoes(true)}
                    />
                  </section>
                </CardFichaClinica.Header>
                <CardFichaClinica.Body>
                  <section className="flex md:flex-nowrap justify-between">
                    <section className="flex flex-col gap-2">
                      <div>
                        <label>CID:</label>
                        <p>
                          <b>{exibirValor(fichaClinica?.observacoes?.cid)}</b>
                        </p>
                      </div>

                      <div>
                        <label>Medicação:</label>
                        <p>
                          <b>
                            {exibirValor(fichaClinica?.observacoes?.medicacao)}
                          </b>
                        </p>
                      </div>

                      <section>
                        <label>Atendimento Especial:</label>
                        <p>
                          <b>
                            {exibirValor(
                              fichaClinica?.observacoes?.atendimentoEspecial,
                            )}
                          </b>
                        </p>
                      </section>
                    </section>
                    <section className="flex flex-col gap-2">
                      <div>
                        <label>Hiperfoco:</label>
                        <p>
                          <b>
                            {exibirValor(fichaClinica?.observacoes?.hiperfoco)}
                          </b>
                        </p>
                      </div>

                      <div>
                        <label>Desfraldada:</label>
                        <p>
                          <b>
                            {formatarBoolean(
                              fichaClinica?.observacoes?.desfraldada,
                            )}
                          </b>
                        </p>
                      </div>
                    </section>
                  </section>
                </CardFichaClinica.Body>
              </CardFichaClinica>
              <CardFichaClinica estilo="h-auto md:h-full">
                <CardFichaClinica.Header>
                  <section className="flex justify-between mb-1.25">
                    <h2>Última consulta</h2>
                    <BotaoLayout
                      nome="Visualizar"
                      onClick={() => navigate("/pacientes/consultas-antigas")}
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
                        <label>Materiais:</label>
                        <p>
                          <b>{materiaisUltimaConsulta}</b>
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
        onClose={() => setModalFichaClinica(false)}
      />
      <EditarObservacoesModal
        isOpen={modalObservacoes}
        dados={observacoes}
        onClose={() => setModalObservacoes(false)}
      />
      <EditarObservacoesComportamentaisModal
        isOpen={modalObservacoesComportamentais}
        dados={observacoesComportamentais}
        onClose={() => setModalObservacoesComportamentais(false)}
      />
      <ProximaConsultaModal
        isOpen={modalProximaConsulta}
        dados={proximaConsulta}
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
