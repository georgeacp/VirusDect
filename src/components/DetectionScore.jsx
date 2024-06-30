// src/components/DetectionScore.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DetectionScore = ({ score, total }) => {
    if (total === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    const isMalicious = score > 0;

    return (
        <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
                value={score}
                maxValue={total}
                text={`${score} / ${total}`}
                styles={buildStyles({
                    textColor: isMalicious ? '#f00' : '#0f0',
                    pathColor: isMalicious ? '#f00' : '#0f0',
                    trailColor: '#333'
                })}
            />
        </div>
    );
};

export default DetectionScore;
