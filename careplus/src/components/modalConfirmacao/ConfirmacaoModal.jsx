import React from "react"
import Modal from "react-modal"

Modal.setAppElement("#root")

export default function ConfirmacaoModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  titulo = "Confirmação",
  mensagem = "Tem certeza que deseja continuar?",
  textoBotaoConfirmar = "Confirmar",
  textoBotaoCancelar = "Cancelar"
}) {
  const handleConfirmar = () => {
    onConfirm()
    onClose()
  }

  const overlayClassName =
    "fixed top-0 left-0 w-full h-full bg-black/45 flex justify-center items-center backdrop-blur-sm z-[10000]"

  const modalCardClassName =
    "w-[400px] bg-white px-8 py-8 rounded-[20px] relative text-center shadow-2xl"

  const closeBtnClassName =
    "absolute top-[15px] right-[15px] text-[28px] border-none bg-transparent cursor-pointer text-gray-500 hover:text-gray-700"

  const h2ClassName = "font-semibold text-xl mb-4 text-gray-800"

  const mensagemClassName = "text-gray-600 text-base mb-6"

  const botoesContainerClassName = "flex gap-3 justify-center"

  const btnCancelarClassName =
    "flex-1 py-3 px-6 rounded-lg cursor-pointer bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"

  const btnConfirmarClassName =
    "flex-1 py-3 px-6 rounded-lg cursor-pointer bg-gradient-to-r from-[#00a0ff] to-[#00d48c] text-white font-medium hover:opacity-90 transition-opacity"

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalCardClassName}
      overlayClassName={overlayClassName}
      contentLabel={titulo}
    >
      <button className={closeBtnClassName} onClick={onClose}>
        ×
      </button>

      <h2 className={h2ClassName}>{titulo}</h2>
      <p className={mensagemClassName}>{mensagem}</p>

      <div className={botoesContainerClassName}>
        <button 
          className={btnCancelarClassName} 
          onClick={onClose}
        >
          {textoBotaoCancelar}
        </button>
        <button 
          className={btnConfirmarClassName} 
          onClick={handleConfirmar}
        >
          {textoBotaoConfirmar}
        </button>
      </div>
    </Modal>
  )
}
