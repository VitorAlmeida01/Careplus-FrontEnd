import SideBar from '../sidebar/SideBar'
import './layout.css'

export default function Layout({ children }) {
    return (
        <div className="layout-container">
            <SideBar />
            <div className="content">
                {children}
            </div>
        </div>
    )
}