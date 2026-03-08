import React from 'react';
import './KpiCard.css';
import { TrendingUp } from 'lucide-react';

export default function KpiCards({titulo, texto, valor}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-linear-to-r from-[#4fc3f7] to-[#5fcb9f] px-6 py-5 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <TrendingUp size={80} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 relative z-10">{titulo}</h3>
                <p className="text-sm md:text-base text-white/90 relative z-10">{texto}</p>
            </div>
            <div className="px-6 py-10 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#4fc3f7] to-[#5fcb9f] bg-clip-text text-transparent">{valor}</p>
                <p className="text-sm text-gray-500 mt-3">pacientes ativos</p>
            </div>
        </div>
    );
}