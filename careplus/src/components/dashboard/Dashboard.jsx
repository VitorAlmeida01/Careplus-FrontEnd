import React, { useEffect, useState } from 'react';
import  BarraAlinhada from './BarChart';
import  BarraVertical from './BarVertical';
import './Dashboard.css';
import KpiCards  from '../kpiCard/KpiCard';
import { buscarPacienteSemConsulta} from '@/src/service/dashboard/dash.service';

export default function Dashboard() {
    const [pacientesSemConsulta, setPacientesSemConsulta] = useState(0);

    useEffect( () =>{
        buscarPacienteSemConsulta().then((data) => {
            if (data) {
                setPacientesSemConsulta(data);
            }
        });
    }, [])

    // const [dadosFilaEspera] = useState([
    //     { titulo: "Pacientes na Fila de Espera", texto: "Número de pacientes aguardando atendimento", valor: 28 },
    //     { titulo: "Clientes Ativos", texto: "Com consulta no último mês ou marcada para o futuro.", valor: 120 }
    // ]);



    return (
        <div className="w-full flex flex-col pt-4 md:pt-4 gap-4">
            {/* KPI Cards */}
            <div className="flex justify-center shrink-0 gap-4">
                {/* <div className="w-full max-w-md">
                    <KpiCards {...dadosFilaEspera[0]} />
                </div> */}
                <div className="w-full max-w-md">
                    <KpiCards titulo="Pacientes Sem Consulta" texto="Número de pacientes sem consulta agendada" valor={pacientesSemConsulta} />
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-4">
                {/* Gráfico de Funcionários e Pacientes - 2 colunas no desktop */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[550px] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-linear-to-r from-[#F0FDFA] via-[#E0F2FE] to-[#EFF6FF] px-4 py-5 md:px-6 border-b-4 border-[#4fc3f7]">
                        <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">
                            Funcionários e Pacientes Distribuídos por Setor
                        </h1>
                    </div>
                    <div className="flex-1 p-4 md:p-6 bg-linear-to-br from-white to-gray-50 min-h-0">
                        <BarraAlinhada />
                    </div>
                </div>

                {/* Gráfico de Seguradoras - 1 coluna no desktop */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[550px] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-linear-to-r from-[#F0FDFA] via-[#E0F2FE] to-[#EFF6FF] px-4 py-5 md:px-6 border-b-4 border-[#5fcb9f]">
                        <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">
                            Clientes por Seguradoras
                        </h1>
                    </div>
                    <div className="flex-1 p-4 md:p-6 bg-linear-to-br from-white to-gray-50 min-h-0">
                        <BarraVertical />
                    </div>
                </div>
            </div>
        </div>
    );
}

