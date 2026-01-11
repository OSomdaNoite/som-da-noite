import React, { useState, useMemo } from 'react';
import './PlayHistory.css';

const PlayHistory = () => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const historyData = [
    { title: 'Song A', artist: 'Artist 1', duration: '3:45', time_played: '10:00' },
    { title: 'Song B', artist: 'Artist 2', duration: '4:20', time_played: '10:05' },
    { title: 'Song C', artist: 'Artist 3', duration: '2:50', time_played: '10:10' },
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
      // Clique em uma coluna diferente
      if (prev.key !== key) {
        return { key, direction: 'asc' };
      }
  
      // Mesmo campo: alterna estados
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
  
      if (prev.direction === 'desc') {
        return { key: null, direction: 'asc' }; // reset
      }
  
      return { key, direction: 'asc' };
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

      <div className='table-scroll'>
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
          {sortedData.map((music, index) => (
            <tr key={index}>
              <td>{music.title}</td>
              <td>{music.artist}</td>
              <td>{music.duration}</td>
              <td>{music.time_played}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default PlayHistory;
