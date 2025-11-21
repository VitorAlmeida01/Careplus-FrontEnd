import React from 'react';
import './KpiCard.css';

export function KpiCards({titulo, texto, valor}) {
    return (
        <div className="KpiCard">
            <div className="HeadCard">
                <h3 style={{padding: 0, marginTop:"4px", margin:0, color:"Black"}}>{titulo}</h3>
                <p style={{padding: 0, margin:0, color:"Black"}}>{texto}</p>
            </div>
            <div className="TailCard">
                <p style={{padding: 0, margin:0, color:"Black"}}>{valor}</p>
            </div>
        </div>
    );
}