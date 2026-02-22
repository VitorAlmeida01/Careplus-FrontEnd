import { BrowserRouter, Routes, Route } from "react-router-dom"

import TelaLogin from "../pages/login/TelaLogin"
import Funcionarios from "../pages/funcionarios/Funcionarios"
import TelaDashboard from "../pages/telaDashboard/TelaDashboard"
import FichaClinica from "../pages/fichaClinica/FichaClinica"
import ConsultaAtual from "../pages/consultaAtual/ConsultaAtual"
import TelaProfissional from "../pages/telaProfissional/TelaProfissional"
import Pacientes from "../pages/pacientes/Pacientes"
import ConsultasAntigas from "../pages/consultasAntigas/ConsultasAntigas"
import PrivateRoute from "./PrivateRoute.jsx";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route
          path="/funcionarios"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Funcionarios />
            </PrivateRoute>
          }
        />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/dashboard" element={<TelaDashboard />} />
        <Route path="/pacientes/ficha-clinica" element={<FichaClinica />} />
        <Route path="/pacientes/consulta-atual" element={<ConsultaAtual />} />
        <Route path="/tela-profissional" element={<TelaProfissional />} />
        <Route path="/consultas-antigas" element={<ConsultasAntigas />} />
      </Routes>
    </BrowserRouter>
  )
}
