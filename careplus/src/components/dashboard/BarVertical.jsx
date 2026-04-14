import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import {buscarSeguradora} from '@/src/service/dashboard/dash.service';

export default function BarraVertical(props) {
    const [seguradoraData, setSeguradoraData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await buscarSeguradora();
                if (data) {
                    setSeguradoraData(data);
                }
            } catch (error) {
                console.error('Erro ao buscar dados das seguradoras:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const seguradora = seguradoraData.map(item => item.seguradora);
    const value = seguradoraData.map(item => item.totalClientes);

    const option = {
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
                name: "Clientes", 
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

    if (loading) {
        return <div className="flex items-center justify-center h-full">Carregando...</div>;
    }

    return <ReactEcharts option={option} 
                style={{height: "100%", width: "94%"}}
                className={props.className}
            />;
}
   