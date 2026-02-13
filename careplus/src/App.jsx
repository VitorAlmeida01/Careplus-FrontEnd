
import { useState } from 'react'
import RoutesApp from './routes.jsx'
import './App.css'
import MarcacaoConsultaModal from './components/modalConsulta/MarcacaoConsultaModal'

function App() {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <div>
      <button 
        onClick={() => setModalAberto(true)}
        style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          zIndex: 9999,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Abrir Modal Teste
      </button>
      <RoutesApp/>
      <MarcacaoConsultaModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  )
}

export default App
