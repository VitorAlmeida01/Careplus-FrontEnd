import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/sidebar/SideBar'
import  TelaLogin  from './pages/login/TelaLogin'
import Funcionarios from './pages/funcionarios/Funcionarios'
import TelaDashboard from './pages/telaDashboard/TelaDashboard'

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaLogin/>} />
                <Route path="/funcionarios" element={<Funcionarios/>} />
                <Route path='/dashboard' element={<TelaDashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}