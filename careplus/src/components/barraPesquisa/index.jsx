import './style.css'
import { FiSearch } from 'react-icons/fi'

export default function BarraPesquisa(){
    return(

        <>
            <div className='containerInput'>
                <FiSearch className='iconeLupa' size={20} />

                <input type="text" className='inputPesquisa' placeholder='Pesquisar'
                />
            </div>

        </>


    )
}