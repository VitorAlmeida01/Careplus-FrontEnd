import CardFichaClinica from "../../components/cardFichaClinica/CardFichaClinica"
import Layout from "../../components/layout/Layout"
import CardPerfil from "../../components/cardPerfil/CardPerfil"
import BotaoLayout from "../../components/botaoLayout/BotaoLayout"
import DonutChart from "../../components/chartsFichaClinica/DonutChart"

export default function FichaClinica() {
  return (
    <>
      <Layout>
        <section className="h-fit ">
          <section>
            <section className="w-full">
              <CardPerfil></CardPerfil>
            </section>
          </section>

          <section className="flex gap-2 h-[50vh] w-full flex-wrap md:flex-nowrap">
            <CardFichaClinica>
              <CardFichaClinica.Header>
                <section className="flex justify-between mb-[10px]">
                  <h2>Ficha Clinica</h2>
                  <BotaoLayout nome="Editar" />
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

            <CardFichaClinica>
              <CardFichaClinica.Header>
                <section className="flex justify-between mb-[10px]">
                  <h2>Observações Comportamentais</h2>
                  <BotaoLayout nome="Editar" />
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

            <CardFichaClinica estilo="flex flex-col items-center">
              <CardFichaClinica.Header>
                <h2>Progresso</h2>
              </CardFichaClinica.Header>
              <CardFichaClinica.Body>
                <div>
                  <DonutChart />
                </div>
                <div>
                  <label>Tratamento já feito:</label>
                  <p>
                    <b>Linguagem Oral e Escrita</b>
                  </p>
                </div>
                <div>
                  <label>Tratamento atual:</label>
                  <p>
                    <b>Voz</b>
                  </p>
                </div>
              </CardFichaClinica.Body>
              <CardFichaClinica.Footer>
                <BotaoLayout nome="Editar" tamanho="w-full p-3 rounded-xl" />
              </CardFichaClinica.Footer>
            </CardFichaClinica>
          </section>
          <section className="mt-5 flex h-[27vh] gap-10">
            <CardFichaClinica>
              <CardFichaClinica.Header>
                <section className="flex justify-between mb-1.25">
                  <h2>Observações</h2>
                  <BotaoLayout nome="Editar" />
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
            <CardFichaClinica>
              <CardFichaClinica.Header>
                <section className="flex justify-between mb-1.25">
                  <h2>Última consulta</h2>
                  <BotaoLayout nome="Visualizar" />
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
      </Layout>
    </>
  )
}
