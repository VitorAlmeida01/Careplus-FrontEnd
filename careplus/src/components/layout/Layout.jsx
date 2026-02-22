import Breadcrumbs from "../BreadCrumbs/Breadcrumbs"
import SideBar from "../sidebar/SideBar"
import "./layout.css"

export default function Layout({ children }) {
  return (
    <div className="layout-container bg-[#EEFAFF]">
      <SideBar />
      <div className="content ">
        <Breadcrumbs/>
        {children}
        
      </div>
    </div>
  )
}
