import { BrowserRouter, Routes, Route } from "react-router-dom"

import TelaLogin from "../pages/login/TelaLogin"
import Funcionarios from "../pages/funcionarios/Funcionarios"
import TelaDashboard from "../pages/telaDashboard/TelaDashboard"
import FichaClinica from "../pages/fichaClinica/FichaClinica"
import ConsultaAtual from "../pages/consultaAtual/ConsultaAtual"
import Consultas from "../pages/Consultas/Consultas"
import Pacientes from "../pages/pacientes/Pacientes"
import CadastroPaciente from "../pages/cadastroPaciente/CadastroPaciente"
import ConsultasAntigas from "../pages/consultasAntigas/ConsultasAntigas"
import AgendamentoConsulta from "../pages/agendamento/AgendamentoConsulta"
import Unauthorized from "../pages/unauthorized/Unauthorized"
import PrivateRoute from "./PrivateRoute"

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/funcionarios"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Funcionarios />
            </PrivateRoute>
          }
        />
        <Route path="/pacientes" element={
          <PrivateRoute allowedRoles={["ADMIN", "USER", "SCHEDULER"]}>
            <Pacientes />
          </PrivateRoute>
        } />
        <Route path="/pacientes/cadastrar" element={
          <PrivateRoute allowedRoles={["ADMIN", "SCHEDULER"]}>
            <CadastroPaciente />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={<TelaDashboard />} />
        <Route path="/pacientes/ficha-clinica" element={<PrivateRoute allowedRoles={["ADMIN", "USER"]}>
          <FichaClinica />
        </PrivateRoute>} />
        <Route path="/consultas/ficha-clinica" element={<FichaClinica />} />

        <Route path="/pacientes/consulta-atual" element={<ConsultaAtual />} />
        <Route path="/consultas/consulta-atual" element={<ConsultaAtual />} />
        <Route path="/consultas" element={
          <PrivateRoute allowedRoles={["USER"]}>
            <Consultas />
          </PrivateRoute>
        } />
        <Route path="/pacientes/consultas-antigas" element={<ConsultasAntigas />} />
        <Route path="/agendamento-consulta" element={
          <PrivateRoute allowedRoles={["ADMIN", "USER", "SCHEDULER"]}>
            <AgendamentoConsulta />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}


