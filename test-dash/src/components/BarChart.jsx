import React from 'react';
import ReactEcharts from 'echarts-for-react';


const categorias = ['Fonoaudologia', 'Psicologia', 'Nutricionista', 'Fisioterapia']; 
const objeto = [
  { Setor: 'Fonoaudiologia', Fun1cionarios: 13, Pacientes: 76 },
  { Setor: 'Psicologia', Fun1cionarios: 8, Pacientes: 44 },
  { Setor: 'Nutricionista', Fun1cionarios: 6, Pacientes: 25 },
  { Setor: 'Fisioterapia', Fun1cionarios: 6, Pacientes: 24 },
];

const dataFunccionarios = objeto.map(item => item.Fun1cionarios);
const dataPacientes = objeto.map(item => item.Pacientes);


export function BarraAlinhada(props) {
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
      bottom: 80,
      containLabel: true
    },
    
    
    xAxis: [
      {
        type: 'category',
        data: categorias,
        axisTick: {
          alignWithLabel: true 
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
        end: 40,
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
        data: dataFunccionarios,
        itemStyle:{
          color: '#60A5FA',
          borderRadius: [10, 10, 0, 0] 
        } 
    },
     
    ]
    };
return <ReactEcharts option={option} 
            style={{height: "80%", width: "94%"}}
            className={props.className}
        />;
}
   