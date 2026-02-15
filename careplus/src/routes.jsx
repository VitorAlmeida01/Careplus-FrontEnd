import { BrowserRouter, Routes, Route } from "react-router-dom"

import SideBar from "./components/sidebar/SideBar"
import TelaLogin from "./pages/login/TelaLogin"
import Funcionarios from "./pages/funcionarios/Funcionarios"
import TelaDashboard from "./pages/telaDashboard/TelaDashboard"
import FichaClinica from "./pages/fichaClinica/FichaClinica"
import ConsultaAtual from "./pages/consultaAtual/ConsultaAtual"
import TelaProfissional from "./pages/telaProfissional/TelaProfissional"
import Pacientes from "./pages/pacientes/Pacientes"

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/dashboard" element={<TelaDashboard />} />
        <Route path="/ficha-clinica" element={<FichaClinica />} />
        <Route path="/consulta-atual" element={<ConsultaAtual />} />
        <Route path="/tela-profissional" element={<TelaProfissional />} />
      </Routes>
    </BrowserRouter>
  )
}
