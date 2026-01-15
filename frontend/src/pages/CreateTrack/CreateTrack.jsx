import React, { useState } from 'react';
import '../Admin/Admin.css';

const CreateTrack = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [cover, setCover] = useState(null);
  const [isAd, setIsAd] = useState(false);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!title || !artist || !album) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const newTrack = { title, artist, album, cover, isAd };

    setTitle('');
    setArtist('');
    setAlbum('');
    setCover(null);
    setIsAd(false);
    alert(`Faixa cadastrada com sucesso: ${newTrack.title}!`);
  };

  return (
    <div className="admin-bg">
      <div className="admin-card">

        <h2 style={{ color: '#00FFF6', marginBottom: '20px' }}>Cadastrar Faixa</h2>

        <div className="field">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Digite o título da faixa"
          />
        </div>

        <div className="field">
          <label>Artista:</label>
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            placeholder="Digite o nome do artista"
          />
        </div>

        <div className="field">
          <label>Álbum:</label>
          <input
            type="text"
            value={album}
            onChange={e => setAlbum(e.target.value)}
            placeholder="Digite o nome do álbum"
          />
        </div>

        <div className="field">
          <label>Imagem da faixa:</label>
          <input type="file" accept="image/*" onChange={handleCoverChange} />
          {cover && (
            <img
              src={cover}
              alt="Pré-visualização"
              style={{ marginTop: '10px', width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
            />
          )}
        </div>

        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>É publicidade?</label>
          <input
            type="checkbox"
            checked={isAd}
            onChange={e => setIsAd(e.target.checked)}
          />
        </div>

        <button
          className="save-btn"
          style={{ marginTop: '20px', padding: '8px 16px', fontSize: '1rem' }}
          onClick={handleSave}
        >
          Salvar
        </button>

      </div>
    </div>
  );
};

export default CreateTrack;
