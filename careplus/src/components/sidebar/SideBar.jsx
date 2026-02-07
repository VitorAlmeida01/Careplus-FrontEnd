import { Home, Calendar, Users, LogOut, X, Menu, BarChart3 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./sideBar.css"

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("inicio")
  const [isOpen, setIsOpen] = useState(true)

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

        <button
          className={
            activeItem === "pacientes" ? "nav-item active" : "nav-item"
          }
          onClick={() => setActiveItem("pacientes")}
        >
          <Users size={24} />
          {isOpen && <Link to={"/funcionarios"} className="botaoSideBar">Funcionarios</Link>} 
          {/* Modificar o estilo de botaoSideBar */}
        </button>

        <button
          className={
            activeItem === "pacientes" ? "nav-item active" : "nav-item"
          }
          onClick={() => setActiveItem("pacientes")}
        >
          <BarChart3 size={24} />
          {isOpen && <Link to={"/dashboard"} className="botaoSideBar">Dashboard</Link>}
        </button>
      </nav>

      <button className="logout-btn">
        <LogOut size={24} />
        {isOpen && <Link to={"/"} className="botaoSideBarSair">Sair</Link>}
      </button>
    </div>
  )
}
