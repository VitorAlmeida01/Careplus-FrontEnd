import React from "react"
import Modal from "react-modal"

Modal.setAppElement("#root")

export default function ModalBase({
  isOpen,
  onClose,
  titulo,
  icone,
  children,
  largura = "w-[500px]",
}) {
  const overlayClassName =
    "fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center backdrop-blur-sm z-[9999]"

  const modalCardClassName = `${largura} max-h-[90vh] overflow-y-auto bg-white p-8 rounded-3xl relative shadow-2xl`

  const closeBtnClassName =
    "absolute top-4 right-5 text-2xl border-none bg-transparent cursor-pointer text-gray-400 hover:text-gray-700 transition-colors"

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

      <div className="flex items-center gap-3 mb-6">
        {icone && (
          <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center text-white text-xl">
            {icone}
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-700">{titulo}</h2>
      </div>

      {children}
    </Modal>
  )
}
