import Layout from "../../components/layout/Layout"
import ConsultasHojeModal from "../../components/ConsultasHojeModal/modalConsultasHoje"
import ConfirmacaoAgenda from "../../components/confirmacaoAgenda/ConfirmacaoAgenda"
import KpiProfissional from "../../components/kpiProfissional/KpiProfissional"
import { ClipboardClock, Clock, Check } from "lucide-react"

export default function TelaProfissional() {
  return (
    <Layout>
      <div className="w-full h-full px-4 md:px-6 mt-5">
        <section className="flex flex-col md:flex-row items-center justify-center mb-5 gap-4">
          <KpiProfissional
            titulo="Consultas Hoje"
            valor="08"
            icone={ClipboardClock}
          />
          <KpiProfissional
            titulo="Finalizadas"
            valor="02"
            icone={Check}
            corIcon="bg-[#01A871]"
          />
          <KpiProfissional
            titulo="Horários para Confirmar"
            valor="06"
            icone={Clock}
            corIcon="bg-[#FEA701]"
          />
        </section>
        <section className="flex flex-col lg:flex-row gap-4 lg:gap-3">
          {/* <ConfirmacaoAgenda /> */}
          <ConsultasHojeModal />
        </section>
      </div>
    </Layout>
  )
}
