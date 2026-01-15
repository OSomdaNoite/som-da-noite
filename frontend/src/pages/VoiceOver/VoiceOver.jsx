import React, { useState } from 'react';
import '../Admin/Admin.css';
import './VoiceOver.css';

const VoiceOver = () => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const handleClick = () => {
    setIsBroadcasting(prev => !prev);
  };

  return (
    <div className="admin-bg">
      <div className="admin-card locucionar-card">

        <h2 className="locucionar-status" style={{ textAlign: 'center', marginBottom: '30px' }}>
          {isBroadcasting ? (
            <span className="blinking">Transmitindo sua voz</span>
          ) : (
            <span>Aperte para transmitir sua voz</span>
          )}
        </h2>

        <div className="locucionar-button-wrapper">
          <div
            className={`locucionar-button ${isBroadcasting ? 'active' : ''}`}
            onClick={handleClick}
          >
            <div className="locucionar-light" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default VoiceOver;
