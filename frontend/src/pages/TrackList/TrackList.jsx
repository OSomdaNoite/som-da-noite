import React, { useState, useEffect } from 'react';
import '../Admin/Admin.css';
import albumCover from '../../assets/marca_ufc_tv.jpg';

const tracksMock = [
  { id: 1, title: 'Minuto UFC 243 - 09/01/2026', artist: 'Universidade Federal do Ceará', duration: '01:38', album: 'Minuto UFC', cover: albumCover },
  { id: 2, title: 'Minuto UFC 242 - 02/01/2025', artist: 'Universidade Federal do Ceará', duration: '02:44', album: 'Minuto UFC', cover: albumCover },
  { id: 3, title: 'Minuto UFC 241 - 26/12/2025', artist: 'Universidade Federal do Ceará', duration: '02:14', album: 'Minuto UFC', cover: albumCover }, ]

const TrackList = () => {
  const [time, setTime] = useState(new Date());
  const [tracks, setTracks] = useState(tracksMock);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', artist: '', album: '', duration: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const today = dayNames[time.getDay()];

  const hours = time.getHours();
  let greeting = "Olá!";
  if (hours >= 5 && hours < 12) greeting = "Bom dia!";
  else if (hours >= 12 && hours < 18) greeting = "Boa tarde!";
  else greeting = "Boa noite!";

  const handleEditClick = (track) => {
    setEditingId(track.id);
    setEditValues({ title: track.title, artist: track.artist, album: track.album, duration: track.duration });
  };

  const handleSaveClick = (id) => {
    setTracks(prev => prev.map(track => track.id === id ? { ...track, ...editValues } : track));
    setEditingId(null);
  };

  const handleCancelClick = () => setEditingId(null);

  const handleRemove = (id) => {
    if (window.confirm('Tem certeza que deseja remover esta faixa?')) {
      setTracks(prev => prev.filter(track => track.id !== id));
    }
  };

  const filteredTracks = tracks
    .filter(track =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase()) ||
      track.album.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  const totalPages = Math.ceil(filteredTracks.length / itemsPerPage);
  const displayedTracks = filteredTracks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className='admin-bg'>
      <div className="admin-card">

        <div className="admin-header">
          <div className="clock">{time.toLocaleTimeString()}</div>
          <div className="greeting">{greeting}</div>
          <div className="day">{today}</div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#00FFF6', textAlign: 'left' }}>Lista de Faixas</h3>

        <div className="field" style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Buscar por título, artista ou álbum"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #00FFF6',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#fff'
            }}
          />
        </div>

        {/* Container rolável da lista */}
        <div
          className="track-list-container"
          style={{
            overflowY: 'auto',
            flex: 1,
            maxHeight: '60vh',
            width: '100%',
            paddingRight: '10px',
            scrollbarColor: 'var(--textAdmin) transparent',
            scrollbarWidth: 'thin'
          }}
        >
          {displayedTracks.length === 0 && <p>Nenhuma faixa encontrada.</p>}
          {displayedTracks.map(track => (
            <div key={track.id} className="track-info" style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
              <img src={track.cover} alt="Capa da faixa" className="track-image" style={{ width: '60px', height: '60px', borderRadius: '6px' }}/>
              <div className="track-details" style={{ flex: 1, width: '100%' }}>
                {editingId === track.id ? (
                  <>
                    <input type="text" value={editValues.title} onChange={e => setEditValues(prev => ({ ...prev, title: e.target.value }))} style={{ width: '100%', marginBottom: '5px', padding: '4px', borderRadius: '4px', border: '1px solid #00FFF6', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}/>
                    <input type="text" value={editValues.artist} onChange={e => setEditValues(prev => ({ ...prev, artist: e.target.value }))} style={{ width: '100%', marginBottom: '5px', padding: '4px', borderRadius: '4px', border: '1px solid #00FFF6', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}/>
                    <input type="text" value={editValues.album} onChange={e => setEditValues(prev => ({ ...prev, album: e.target.value }))} style={{ width: '100%', marginBottom: '5px', padding: '4px', borderRadius: '4px', border: '1px solid #00FFF6', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}/>
                    <input type="text" value={editValues.duration} onChange={e => setEditValues(prev => ({ ...prev, duration: e.target.value }))} style={{ width: '100%', marginBottom: '5px', padding: '4px', borderRadius: '4px', border: '1px solid #00FFF6', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}/>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      <button className="save-btn" style={{ padding: '5px 10px', fontSize: '0.9rem' }} onClick={() => handleSaveClick(track.id)}>Salvar</button>
                      <button className="save-btn" style={{ padding: '5px 10px', fontSize: '0.9rem', backgroundColor: '#FF6B6B', color: '#fff' }} onClick={handleCancelClick}>Cancelar</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 style={{ margin: 0 }}>{track.title}</h4>
                    <p style={{ margin: 0 }}>{track.artist} — {track.album}</p>
                    <span>{track.duration}</span>
                    <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
                      <button className="save-btn" style={{ padding: '5px 10px', fontSize: '0.85rem' }} onClick={() => handleEditClick(track)}>Editar</button>
                      <button className="save-btn" style={{ padding: '5px 10px', fontSize: '0.85rem', backgroundColor: '#FF6B6B', color: '#fff' }} onClick={() => handleRemove(track.id)}>Remover</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
            <button className="save-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
            <span style={{ alignSelf: 'center' }}>{currentPage} / {totalPages}</span>
            <button className="save-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>Próxima</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackList;
