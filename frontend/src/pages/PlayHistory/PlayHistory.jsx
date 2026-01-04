import React, { useState, useMemo } from 'react';
import './PlayHistory.css';

const PlayHistory = () => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const historyData = [
    { title: 'Song A', artist: 'Artist 1', duration: '3:45', time_played: '10:00 AM' },
    { title: 'Song B', artist: 'Artist 2', duration: '4:20', time_played: '10:05 AM' },
    { title: 'Song C', artist: 'Artist 3', duration: '2:50', time_played: '10:10 AM' },
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
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="table-container">
      <h1 className="table-title">Histórico de Reprodução</h1>

      <table className="music-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>
              Música <span>{getSortIndicator('title')}</span>
            </th>
            <th onClick={() => handleSort('artist')}>
              Artista <span>{getSortIndicator('artist')}</span>
            </th>
            <th onClick={() => handleSort('duration')}>
              Duração <span>{getSortIndicator('duration')}</span>
            </th>
            <th onClick={() => handleSort('time_played')}>
              Hora <span>{getSortIndicator('time_played')}</span>
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
  );
};

export default PlayHistory;
