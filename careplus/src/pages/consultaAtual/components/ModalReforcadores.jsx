import { useState } from 'react'


export default function ModalReforcadores({ aberto, onClose, onSalvar }) {

  // estado para guardar o que o usuário digita no input
  const [nome, setNome] = useState('')

  // se o modal não estiver aberto, não renderiza nada
  if (!aberto) return null

  return (
    // fundo escuro que cobre toda a tela
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* caixa branca do modal */}
      <div className="bg-white w-[450px] rounded-xl p-6 shadow-lg">

        {/* título */}
        <h2 className="text-lg font-semibold mb-4">
          Adicionar Reforçador
        </h2>

        {/* campos do formulário */}
        <div className="flex flex-col gap-4">

          {/* campo Nome */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Nome do reforçador</label>
            <input
              type="text"
              className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00bfa5]"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

        </div>

        {/* botões */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md">
            Cancelar
          </button>

          <button
          onClick={() => {
            onSalvar(nome)
            setNome('') // limpa o input depois de salvar
          }}
            className="px-4 py-2 text-sm bg-[#00bfa5] text-white rounded-md hover:opacity-90">
            Salvar
          </button>

        </div>

      </div>
    </div>
  )
}
