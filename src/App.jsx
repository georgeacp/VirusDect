// src/App.js
import React, { useState } from 'react';
import UploadFile from './components/UploadFile';
import Report from './components/Report';
import './App.css';

const App = () => {
  const [analysisId, setAnalysisId] = useState(null);

  return (
    <div className="App">
      <UploadFile onScanComplete={setAnalysisId} />
      {analysisId && <Report analysisId={analysisId} />}
    </div>
  );
};

export default App;
