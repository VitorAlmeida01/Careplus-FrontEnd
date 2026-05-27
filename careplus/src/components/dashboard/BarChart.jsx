import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import {buscarFuncionariosEPacientesPorArea} from '@/src/service/dashboard/dash.service';


export default function BarraAlinhada(props) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resultado = await buscarFuncionariosEPacientesPorArea();
        setDados(resultado);
      } catch (error) {
        console.error('Erro ao carregar dados do gráfico:', error);
      }
    };

    carregarDados();
  }, []);

  // Filtrar dados para excluir itens sem setor
  const dadosFiltrados = dados.filter(item => item.setor && item.setor.trim() !== '');

  const categorias = dadosFiltrados.map(item => item.setor);
  const dataFuncionarios = dadosFiltrados.map(item => item.totalFuncionarios);
  const dataPacientes = dadosFiltrados.map(item => item.totalPacientes);


     const option = {
    // title: {
    //   text: 'Gráfico de Barras',
    //   subtext: 'Teste de Gráfico',
    //   left: 'center'
    // },
    
    legend: {
      show: true,
      
    }, 
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    
    grid: {
      left: '3%',
      right: '4%',
      bottom: 120,
      containLabel: true
    },
    
    
    xAxis: [
      {
        type: 'category',
        data: categorias,
        axisTick: {
          alignWithLabel: true 
        },
        axisLabel: {
          rotate: 33,
          interval: 0,
          fontSize: 12,
          hideOverlap: false
        }
      }
    ],
    
    yAxis: [
      {
        type: 'value'
      }
    ],

    dataZoom:[{
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 100,
        zoomOnMouseWheel: true, 
        moveOnMouseMove: true  
    }],
    
  
    series: [
      {
        name: "Pacientes", 
        type: 'bar',
        barWidth: '40%',
        data: dataPacientes,
        itemStyle:{
          color: '#0D9488', 
          borderRadius: [10, 10, 0, 0] 
        } 
    },
      {
        name: "Funcionários", 
        type: 'bar',
        barWidth: '40%',
        data: dataFuncionarios,
        itemStyle:{
          color: '#60A5FA',
          borderRadius: [10, 10, 0, 0] 
        } 
    },
     
    ]
    };
return <ReactEcharts option={option} 
            style={{height: "100%", width: "94%"}}
            className={props.className}
        />;
}
   