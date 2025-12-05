import React from 'react';
import ReactEcharts from 'echarts-for-react';


const seguradora = ['Sul América', 'Bradesco', 'Porto Seguro', 'Amil', 'Saúde Caixa']; 
;

const value = [20, 34, 25, 40, 15];




export default function BarraVertical(props) {
     const option = {
    // title: {
    //   text: 'Gráfico de Barras',
    //   subtext: 'Teste de Gráfico',
    //   left: 'center'
    // },
    
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
        type: 'value'
      }
    ],
    
    yAxis: [
       {
        type: 'category',
        data: seguradora,
        axisTick: {
          alignWithLabel: true
        }
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
        name: "Funcionários", 
        type: 'bar',
        barWidth: '40%',
        data: value,
        itemStyle:{
          color: '#3B82F6',
          borderRadius: [0, 10, 10, 0] 
        }
    },
    ]
    };
return <ReactEcharts option={option} 
            style={{height: "80%", width: "94%"}}
            className={props.className}
        />;
}
   