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

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const userRoles = getUserRoles()

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