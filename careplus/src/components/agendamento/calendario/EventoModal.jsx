import React, { useState } from 'react';

export const EventModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title);
    setTitle('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          {initialData?.isReadOnly ? 'Detalhes da Consulta' : 'Nova Consulta'}
        </h3>
        
        {initialData?.isReadOnly ? (
          <div className="mb-6 text-gray-700">{initialData.title}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              placeholder="Nome da consulta..."
              className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Salvar
              </button>
            </div>
          </form>
        )}
        
        {initialData?.isReadOnly && (
          <div className="flex justify-end">
             <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
};
