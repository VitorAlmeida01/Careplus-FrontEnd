import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CardFichaClinica from "../../components/cardFichaClinica/CardFichaClinica"
import Layout from "../../components/layout/Layout"
import CardPerfil from "../../components/cardPerfil/CardPerfil"
import BotaoLayout from "../../components/botaoLayout/BotaoLayout"
import DonutChart from "../../components/chartsFichaClinica/DonutChart"
import EditarFichaClinicaModal from "../../components/modalFichaClinica/EditarFichaClinicaModal"
import EditarObservacoesModal from "../../components/modalFichaClinica/EditarObservacoesModal"
import EditarObservacoesComportamentaisModal from "../../components/modalFichaClinica/EditarObservacoesComportamentaisModal"
import ProximaConsultaModal from "../../components/modalFichaClinica/ProximaConsultaModal"
import InformacoesContatoModal from "../../components/modalFichaClinica/InformacoesContatoModal"

export default function FichaClinica() {
  const navigate = useNavigate()
  const [modalFichaClinica, setModalFichaClinica] = useState(false)
  const [modalObservacoes, setModalObservacoes] = useState(false)
  const [modalObservacoesComportamentais, setModalObservacoesComportamentais] =
    useState(false)
  const [modalProximaConsulta, setModalProximaConsulta] = useState(false)
  const [modalContato, setModalContato] = useState(false)

  return (
    <>
      <Layout>
        <section className="h-fit ">
          <section>
            <section className="w-full">
              <CardPerfil
                onContatoClick={() => setModalContato(true)}
                onProximaConsultaClick={() => setModalProximaConsulta(true)}
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
                      <b>Gabriel de Oliveira Santos</b>
                    </p>
                  </section>
                  <section>
                    <label>Idade:</label>
                    <p>
                      <b>12 Anos</b>
                    </p>
                  </section>
                  <section>
                    <label>Anamnese:</label>
                    <p>
                      <b>Queixa Principal</b>
                    </p>
                  </section>
                  <section>
                    <label>Diagnóstico</label>
                    <p>
                      <b>Imperatividade</b>
                    </p>
                  </section>
                  <section>
                    <label>Plano teratêutico</label>
                    <p>
                      <b>Não</b>
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
                  <p>
                    Mostrou-se colaborativo com as atividades propostas. Buscou
                    contato visual. Solicitou o fone abafador quando um barulho
                    alto ocorreu no corredor. Comunicou suas vontades através de
                    frases curtas.
                  </p>
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
                          <b>313E13</b>
                        </p>
                      </div>

                      <div>
                        <label>Medicação:</label>
                        <p>
                          <b>Não</b>
                        </p>
                      </div>

                      <section>
                        <label>Atendimento Especial:</label>
                        <p>
                          <b>Lesivo</b>
                        </p>
                      </section>
                    </section>
                    <section className="flex flex-col gap-2">
                      <div>
                        <label>Hiperfoco:</label>
                        <p>
                          <b>Dinossauro</b>
                        </p>
                      </div>

                      <div>
                        <label>Desfraldada:</label>
                        <p>
                          <b>Não</b>
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
                          <b>02/09/2025</b>
                        </p>
                      </div>

                      <div>
                        <label>Materiais:</label>
                        <p>
                          <b>Bringuedos de encaixe, Livro de histórias</b>
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
        onClose={() => setModalFichaClinica(false)}
      />
      <EditarObservacoesModal
        isOpen={modalObservacoes}
        onClose={() => setModalObservacoes(false)}
      />
      <EditarObservacoesComportamentaisModal
        isOpen={modalObservacoesComportamentais}
        onClose={() => setModalObservacoesComportamentais(false)}
      />
      <ProximaConsultaModal
        isOpen={modalProximaConsulta}
        onClose={() => setModalProximaConsulta(false)}
      />
      <InformacoesContatoModal
        isOpen={modalContato}
        onClose={() => setModalContato(false)}
      />
    </>
  )
}
