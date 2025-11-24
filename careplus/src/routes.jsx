import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SideBar from './components/sidebar/SideBar'
import  TelaLogin  from './pages/login/TelaLogin'
import Funcionarios from './pages/funcionarios/Funcionarios'

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<TelaLogin/>} />
                <Route path="/funcionarios" element={<Funcionarios/>} />
            </Routes>
        </BrowserRouter>
    )
}