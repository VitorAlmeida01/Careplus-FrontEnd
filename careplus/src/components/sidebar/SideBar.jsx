import {
  LogOut,
  X,
  Menu,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./sideBar.css"
import { logoutService } from "../../service/login/login.service"
import { menuConfig } from "../../config/menuConfig"
import { getUserRoles } from "../../service/login/jwtDecoder"
import { getTokenData } from "../../service/login/jwtDecoder"

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const userRoles = getUserRoles()
  const [usuario] = useState(getTokenData())

  const navigate = useNavigate()

  const handleLogout = () => {
    logoutService()
    navigate("/")
  }

  const hasAccess = (itemRoles) =>
    itemRoles.some(role => userRoles.includes(role))

  return (
    <div className={isOpen ? "sidebar" : "sidebar sidebar-closed"}>
      <div className="sidebar-header">
        {isOpen && <h2>Solução Clínica</h2>}
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
      
      {isOpen && (
        <div className="flex flex-col items-center p-5 mx-4 my-5  rounded-2xl">
          <div className="w-15 h-15 rounded-full bg-linear-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-white text-[28px] font-semibold mb-3 shadow-lg ">
            {usuario.nome?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center w-full">
            <h2 className="text-lg font-semibold text-slate-700 mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              {usuario.nome}
            </h2>
            <h3 className="text-sm font-medium text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {usuario.especialidade}
            </h3>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {menuConfig
          .filter(item => hasAccess(item.roles))
          .map(item => {
            const Icon = item.icon

            return (
              <Link
                key={item.key}
                to={item.path}
                className="botaoSideBar"
              >
                <button
                  className={
                    activeItem === item.key
                      ? "nav-item active"
                      : "nav-item"
                  }
                  onClick={() => setActiveItem(item.key)}
                >
                  <Icon size={24} />
                  {isOpen && item.label}
                </button>
              </Link>
            )
          })}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={24} />
        {isOpen && "Sair"}
      </button>
    </div>
  )
}