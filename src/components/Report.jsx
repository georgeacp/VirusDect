// src/components/Report.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetectionScore from './DetectionScore';
import { PuffLoader } from 'react-spinners';
import './Report.css';

const Report = ({ analysisId }) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('queued'); // Nuevo estado para manejar el estado del análisis
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            console.log(`Fetching report for analysisId: ${analysisId}`); // Log para verificar si está buscando el reporte
            setLoading(true); // Reiniciar el estado de carga cada vez que cambie analysisId
            setError(null); // Reiniciar el estado de error
            setReport(null); // Reiniciar el estado del reporte
            setStatus('queued'); // Reiniciar el estado del análisis

            try {
                const response = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
                    headers: {
                        'x-apikey': '68881135c96d542f272e1de5aa4287737527ef8a5c26ffadc9771564c26559f4' // Reemplaza con tu API Key
                    }
                });

                const reportStatus = response.data.data.attributes.status;
                console.log(`Report status: ${reportStatus}`); // Log para verificar el estado del reporte
                setStatus(reportStatus);

                if (reportStatus === 'queued' || reportStatus === 'in-progress') {
                    // Si el análisis aún está en cola o en progreso, esperar y volver a verificar
                    setTimeout(fetchReport, 5000); // Esperar 5 segundos antes de volver a verificar
                } else {
                    setReport(response.data);
                    console.log('Report data:', response.data); // Log para verificar los datos del reporte
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener el reporte:', error); // Log para errores
                setError('Error al obtener el reporte');
                setLoading(false);
            }
        };

        fetchReport();
    }, [analysisId]);

    if (loading) {
        return (
            <div className="report-container">
                <h2>Reporte de Análisis</h2>
                <div className="loader-container">
                    <PuffLoader color="#36d7b7" />
                </div>
                <p>Estado del análisis: {status}</p> {/* Mostrar el estado del análisis */}
            </div>
        );
    }

    if (error) return <div>{error}</div>;
    if (!report) return <div>No se encontró el reporte.</div>;

    const { data: { attributes } } = report;
    const { stats = {} } = attributes;
    const total = (stats.harmless || 0) + (stats.malicious || 0) + (stats.suspicious || 0) + (stats.timeout || 0) + (stats.undetected || 0);

    return (
        <div className="report-container">
            <h2>Reporte de Análisis</h2>
            <DetectionScore
                score={stats.malicious || 0}
                total={total}
            />
        </div>
    );
};

export default Report;
