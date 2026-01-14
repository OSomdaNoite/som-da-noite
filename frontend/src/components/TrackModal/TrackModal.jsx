import React, { useEffect, useRef, useState } from 'react';
import './TrackModal.css';

import mockAudio from '../../assets/Minuto UFC 243 - 09_01_2026.mp3';

const PREVIEW_DURATION = 30;

const TrackModal = ({ isOpen, onClose, track }) => {
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const [remainingTime, setRemainingTime] = useState(PREVIEW_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      stopPreview();
      setTimeout(() => setShouldRender(false), 250);
    }
  }, [isOpen]);

  const startPreview = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();

    setIsPlaying(true);
    setRemainingTime(PREVIEW_DURATION);

    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          stopPreview();
          return PREVIEW_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopPreview = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;

    clearInterval(timerRef.current);
    timerRef.current = null;

    setIsPlaying(false);
    setRemainingTime(PREVIEW_DURATION);
  };

  if (!shouldRender || !track) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isOpen ? 'modal-enter' : 'modal-exit'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-body">
          <img
            src={track.cover}
            alt={`Capa do álbum ${track.album}`}
            className="modal-cover"
          />

          <div className="modal-info">
            <div className="info-row">
              <div>
                <span className="label">Título:</span>
                <span className="value">{track.title}</span>
              </div>

              <div>
                <span className="label">Duração:</span>
                <span className="value">{track.duration}</span>
              </div>
            </div>

            <div className="info-row">
              <div>
                <span className="label">Autor:</span>
                <span className="value">{track.artist}</span>
              </div>

              <div>
                <span className="label">Álbum:</span>
                <span className="value">{track.album}</span>
              </div>
            </div>

            <div className="button-div">
            <button
              className="preview-button"
              onClick={isPlaying ? stopPreview : startPreview}
            >
              {isPlaying
                ? `Tocando... (${remainingTime} s)`
                : 'Tocar palinha (30 s)'}
            </button>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={mockAudio} />
      </div>
    </div>
  );
};

export default TrackModal;
