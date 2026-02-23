import React from 'react';

const HintCard = () => {
  return (
    <div className="flex items-center gap-3 bg-[#F0F8FC] rounded-xl p-3 max-w-2/3 border border-blue-50/50 shadow-sm">
      {/* Ícone com gradiente */}
      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-b from-[#38B2FF] to-[#007AFF] shadow-sm">
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coluna da esquerda dos circulos brancos*/}
          <circle cx="3" cy="2" r="1.5" fill="white" />
          <circle cx="3" cy="8" r="1.5" fill="white" />
          <circle cx="3" cy="14" r="1.5" fill="white" />
          
          {/* Coluna da direita dos circulos brancos*/}
          <circle cx="9" cy="2" r="1.5" fill="white" />
          <circle cx="9" cy="8" r="1.5" fill="white" />
          <circle cx="9" cy="14" r="1.5" fill="white" />
        </svg>
      </div>

      <div className="flex flex-col">
        <h4 className="text-[15px] font-medium text-slate-700 leading-tight">
          Dica: Você pode reorganizar consultas
        </h4>
        <p className="text-[13px] text-slate-500 mt-0.5 leading-tight">
          Arraste os cards de consulta para alterar data e horário
        </p>
      </div>
    </div>
  );
};

export default HintCard;