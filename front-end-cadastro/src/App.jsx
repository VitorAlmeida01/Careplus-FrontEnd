import React, { useState } from "react";
import CadastroFuncionarioModal from "./components/CadastroFuncionarioModal.jsx";

function App() {
  
      const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        Cadastrar Funcionário
      </button>

      {/* Explicando: Modal tá open? Se sim, mostra o modal. Se não, deixa null mesmo. */}
      {modalOpen ? <CadastroFuncionarioModal onClose={() => setModalOpen(false)}/> : null}

    </>
  );

}

export default App
