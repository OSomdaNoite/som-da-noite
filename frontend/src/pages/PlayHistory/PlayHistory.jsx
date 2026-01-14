import React, { useState, useMemo } from 'react';
import './PlayHistory.css';

import albumCover from '../../assets/marca_ufc_tv.jpg';
import TrackModal from '../../components/TrackModal/TrackModal';

const PlayHistory = () => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const historyData = [
    { id: 1, title: 'Minuto UFC 243 - 09/01/2026', artist: 'Universidade Federal do Ceará', duration: '01:38', album: 'Minuto UFC', time_played: '10:00', cover: albumCover },
    { id: 2, title: 'Minuto UFC 242 - 02/01/2025', artist: 'Universidade Federal do Ceará', duration: '02:44', album: 'Minuto UFC', time_played: '10:05', cover: albumCover },
    { id: 3, title: 'Minuto UFC 241 - 26/12/2025', artist: 'Universidade Federal do Ceará', duration: '02:14', album: 'Minuto UFC', time_played: '10:10', cover: albumCover },
  ];

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return historyData;

    return [...historyData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [historyData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return { key: null, direction: 'asc' };
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg className="sort-icon neutral" viewBox="0 0 24 24">
          <path d="M7 14l5 5 5-5H7zm0-4h10l-5-5-5 5z" />
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg className="sort-icon asc" viewBox="0 0 24 24">
        <path d="M7 14l5-5 5 5H7z" />
      </svg>
    ) : (
      <svg className="sort-icon desc" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    );
  };

  return (
    <div className="table-container">
      <h1 className="table-title">Histórico de Reprodução</h1>

      <div className="table-scroll">
        <table className="music-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>
                <div className="th-content">
                  Título
                  {getSortIcon('title')}
                </div>
              </th>
              <th onClick={() => handleSort('artist')}>
                <div className="th-content">
                  Criador
                  {getSortIcon('artist')}
                </div>
              </th>
              <th onClick={() => handleSort('duration')}>
                <div className="th-content">
                  Duração
                  {getSortIcon('duration')}
                </div>
              </th>
              <th onClick={() => handleSort('time_played')}>
                <div className="th-content">
                  Horário da Reprodução
                  {getSortIcon('time_played')}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((music) => (
              <tr
                key={music.id}
                onClick={() => {
                  setSelectedTrack(music);
                  setIsModalOpen(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>{music.title}</td>
                <td>{music.artist}</td>
                <td>{music.duration}</td>
                <td>{music.time_played}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TrackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        track={selectedTrack}
      />
    </div>
  );
};

export default PlayHistory;
