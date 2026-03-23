import Breadcrumbs from "../BreadCrumbs/Breadcrumbs"
import SideBar from "../sidebar/SideBar"
import { Menu } from "lucide-react"
import { useState } from "react"
import "./layout.css"

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="layout-container bg-[#EEFAFF]">
      {/* Botão Menu Mobile */}
      <button 
        className="mobile-menu-btn md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content ">
        <Breadcrumbs/>
        {children}
        
      </div>
    </div>
  )
}
