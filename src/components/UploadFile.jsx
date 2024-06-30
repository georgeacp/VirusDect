// src/components/UploadFile.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ onScanComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://www.virustotal.com/api/v3/files', formData, {
        headers: {
          'x-apikey': '68881135c96d542f272e1de5aa4287737527ef8a5c26ffadc9771564c26559f4', // Reemplaza con tu API Key
          'Content-Type': 'multipart/form-data'
        }
      });

      const analysisId = response.data.data.id;
      onScanComplete(analysisId);
    } catch (error) {
      console.error('Error al subir el archivo', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>VIRUSTOTAL</h1>
      <p>Analiza archivos sospechosos para detectar malware y otras amenazas.</p>
      <div className="upload-section">
        <input type="file" id="file-input" onChange={handleFileChange} />
        <label htmlFor="file-input" className="file-label">
          {file ? file.name : 'Elige un archivo'}
        </label>
        <button onClick={handleFileUpload} disabled={loading} className="upload-button">
          {loading ? 'Analizando...' : 'Subir y Analizar'}
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
