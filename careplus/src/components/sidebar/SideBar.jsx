import {
  LogOut,
  X,
  Menu,
} from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "./sideBar.css"
import { logoutService } from "../../service/login/login.service"
import { menuConfig } from "../../config/menuConfig"
import { getUserRoles } from "../../service/login/jwtDecoder"
import { getTokenData } from "../../service/login/jwtDecoder"
import { Button } from "@/components/ui/button"
import ConfirmacaoModal from "../modalConfirmacao/ConfirmacaoModal"
import { buscarFotoFuncionario, getCachedFotoFuncionario } from "../../service/funcionarios/funcionarios.service"

export default function SideBar({ isOpen: isOpenProp, onClose }) {
  const [isOpenDesktop, setIsOpenDesktop] = useState(() => {
    const nome = getTokenData()?.nome ?? 'default'
    const key = `careplus_sidebar_${btoa(encodeURIComponent(nome))}`
    const saved = localStorage.getItem(key)
    return saved !== null ? saved === 'true' : true
  })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const userRoles = getUserRoles()
  const [usuario] = useState(getTokenData())
  const [modalLogoutAberto, setModalLogoutAberto] = useState(false)

  const sidebarKey = useMemo(() => {
    const nome = usuario?.nome ?? 'default'
    return `careplus_sidebar_${btoa(encodeURIComponent(nome))}`
  }, [usuario?.nome])
  const [fotoFuncionario, setFotoFuncionario] = useState(() => getCachedFotoFuncionario(usuario?.documento))

  useEffect(() => {
    if (!usuario?.documento) return
    buscarFotoFuncionario(usuario.documento).then(setFotoFuncionario)
  }, [usuario?.documento])

  // Detectar mudanças de tamanho da tela
  useState(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    handleResize() // Executar na montagem
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // isOpen será controlado por props no mobile, e por estado local no desktop
  const isOpen = isMobile ? isOpenProp : isOpenDesktop
  const toggleSidebar = () => {
    if (isMobile && onClose) {
      onClose()
    } else {
      setIsOpenDesktop(prev => {
        const next = !prev
        localStorage.setItem(sidebarKey, String(next))
        return next
      })
    }
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    setModalLogoutAberto(true)
  }

  const confirmarLogout = () => {
    logoutService()
    navigate("/")
  }

  const hasAccess = (itemRoles) =>
    itemRoles.some(role => userRoles.includes(role))

  return (
    <>
      {/* Overlay/Backdrop para mobile com blur */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`sidebar ${isOpen ? '' : 'sidebar-closed'} ${isMobile ? 'sidebar-mobile' : ''}`}>
      <div className="sidebar-header">
        {isOpen && <h2>Solução Clínica</h2>}
        <button className="close-btn" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {isOpen && (
        <div className="flex flex-col items-center p-5 mx-4 my-5  rounded-2xl">
          {fotoFuncionario ? (
            <img
              src={fotoFuncionario}
              alt="Foto do funcionário"
              className="w-15 h-15 rounded-full object-cover mb-3 shadow-lg"
            />
          ) : (
            <div className="w-15 h-15 rounded-full bg-linear-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-white text-[28px] font-semibold mb-3 shadow-lg">
              {usuario.nome?.charAt(0).toUpperCase()}
            </div>
          )}
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
                className={"botaoSideBar" + (location.pathname === item.path ? " active" : "")}
                onClick={() => {
                  // Fechar sidebar no mobile ao clicar em um item
                  if (isMobile && onClose) {
                    onClose()
                  }
                }}
              >
                <button
                  className='nav-item'
                >
                  <Icon size={24} />
                  {isOpen && item.label}
                </button>
              </Link>
            )
          })}

      </nav>

      <Button variant="outline" size="sm" className="mt-2 w-full h-15 cursor-pointer" onClick={handleLogout}>
        <LogOut size={20} />
        {isOpen && "Sair"}
      </Button>

      {/* <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={24} />
        {isOpen && "Sair"}
      </button> */}
      </div>

      {/* Modal de Confirmação de Logout */}
      <ConfirmacaoModal
        isOpen={modalLogoutAberto}
        onClose={() => setModalLogoutAberto(false)}
        onConfirm={confirmarLogout}
        titulo="Sair do Sistema"
        mensagem="Você deseja realmente sair?"
        textoBotaoConfirmar="Sair"
        textoBotaoCancelar="Cancelar"
      />
    </>
  )
}