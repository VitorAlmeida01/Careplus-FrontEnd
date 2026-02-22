import {
  Home,
  Calendar,
  Users,
  LogOut,
  X,
  Menu,
  BarChart3,
  ClipboardMinus,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./sideBar.css"

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("inicio")
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = () =>{
      sessionStorage.removeItem('authToken')
      navigate('/')
  }

  return (
    <div className={isOpen ? "sidebar" : "sidebar sidebar-closed"}>
      <div className="sidebar-header">
        {isOpen && <h2>Solução Clínica</h2>}
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {/* <button
          className={activeItem === "inicio" ? "nav-item active" : "nav-item"}
          onClick={() => setActiveItem("inicio")}
        >
          <Home size={24} />
          {isOpen && <span>Início</span>}
        </button> */}

        {/* <button
          className={activeItem === "agenda" ? "nav-item active" : "nav-item"}
          onClick={() => setActiveItem("agenda")}
        >
          <Calendar size={24} />
          {isOpen && <span>Agenda</span>}
        </button> */}

        <Link to={"/funcionarios"} className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <Users size={24} />
            {isOpen && "Funcionarios"}
          </button>
        </Link>

        <Link to="/pacientes" className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <Users size={24} />
            {isOpen && "Pacientes"}
          </button>
        </Link>

        <Link to="/dashboard" className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <BarChart3 size={24} />
            {isOpen && "Dashboard"}
          </button>
        </Link>

        <Link to="/ficha-clinica" className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <ClipboardMinus size={24} />
            {isOpen && "Ficha Clinica"}
          </button>
        </Link>
        <Link to="/consulta-atual" className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <ClipboardMinus size={24} />
            {isOpen && "Consulta atual"}
          </button>
        </Link>
        <Link to="/tela-profissional" className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <ClipboardMinus size={24} />
            {isOpen && "Tela Profissional"}
          </button>
        </Link>

        <Link to="/consultas-antigas" className="botaoSideBar">
          <button
            className={
              activeItem === "pacientes" ? "nav-item active" : "nav-item"
            }
            onClick={() => setActiveItem("pacientes")}
          >
            <ClipboardMinus size={24} />
            {isOpen && "Consultas Antigas"}
          </button>
        </Link>
      </nav>
      {/* <Link to={"/"} className="botaoSideBarSair"> */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={24} />
          Sair
        </button>
      {/* </Link> */}
    </div>
  )
}
