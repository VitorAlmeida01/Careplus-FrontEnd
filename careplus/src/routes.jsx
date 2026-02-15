import { BrowserRouter, Routes, Route } from "react-router-dom"

import SideBar from "./components/sidebar/SideBar"
import TelaLogin from "./pages/login/TelaLogin"
import Funcionarios from "./pages/funcionarios/Funcionarios"
import TelaDashboard from "./pages/telaDashboard/TelaDashboard"
import FichaClinica from "./pages/fichaClinica/FichaClinica"
import ConsultaAtual from "./pages/consultaAtual/ConsultaAtual"

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/dashboard" element={<TelaDashboard />} />
        <Route path="/ficha-clinica" element={<FichaClinica />} />
        <Route path="/consulta-atual" element={<ConsultaAtual />} />
      </Routes>
    </BrowserRouter>
  )
}
