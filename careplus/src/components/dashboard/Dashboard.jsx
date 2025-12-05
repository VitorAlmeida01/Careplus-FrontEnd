import React, { useState } from 'react';
import  BarraAlinhada from './BarChart';
import  BarraVertical from './BarVertical';
import './Dashboard.css';
import KpiCards  from '../kpiCard/KpiCard';
// import cardapio from '../assets/cardapio.png';

export default function Dashboard() {

    const [dadosFilaEspera] = useState([
        { titulo: "Pacientes na Fila de Espera", texto: "Número de pacientes aguardando atendimento", valor: 28 },
        { titulo: "Clientes Ativos", texto: "Com consulta no último mês ou marcada para o futuro.", valor: 120 }
    ]);



    return (
        // <div className="Dashboard">
            <div className="conteudo">
                <div className="Breadcrumbs">
                    {/* <img src={cardapio} alt="" className="MenuHamburguer"/> */}
                </div>
                <div className="TopDashKpis" >
                    {/* <KpiCards {...dadosFilaEspera[0]} /> */}
                    <KpiCards {...dadosFilaEspera[1]} />
                </div>
                <div className="MainContent">
                    <div className="ChartHorintalBar">
                        <div className="chartTitle">
                            <h1>Funcionários e Pacientes Distribuídos por Setor</h1>
                        </div>
                        <BarraAlinhada className="chartBar" />
                    </div>
                    <div className="chartVerticalBar">
                        <div className="chartTitle">
                            <h1>Clientes por Seguradoras</h1>
                        </div>
                        <BarraVertical className="chartBar" />
                    </div>
                </div>
            </div>
        // </div>
    );
}

