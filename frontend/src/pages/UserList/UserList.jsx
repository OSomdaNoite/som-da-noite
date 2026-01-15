import React, { useState } from 'react';
import '../Admin/Admin.css';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Silva', email: 'alice@example.com', profilePic: 'https://freesvg.org/img/abstract-user-flat-3.png' },
    { id: 2, name: 'Bruno Costa', email: 'bruno@example.com', profilePic: 'https://freesvg.org/img/abstract-user-flat-3.png' },
    { id: 3, name: 'Carla Mendes', email: 'carla@example.com', profilePic: 'https://freesvg.org/img/abstract-user-flat-3.png' },
    { id: 4, name: 'Daniel Souza', email: 'daniel@example.com', profilePic: 'https://freesvg.org/img/abstract-user-flat-3.png' },
    { id: 5, name: 'Eduardo Lima', email: 'eduardo@example.com', profilePic: 'https://freesvg.org/img/abstract-user-flat-3.png' },
    { id: 6, name: 'Fernanda Rocha', email: 'fernanda@example.com', profilePic: 'https://freesvg.org/img/abstract-user-flat-3.png' },
  ]);

  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='admin-bg'>
      <div className="admin-card">

        <h2 style={{ color: '#00FFF6', marginBottom: '15px' }}>Lista de Usuários</h2>

        <div className="field" style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail"
            value={search}
            onChange={e => setSearch(e.target.value)}
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

        {/* Container rolável */}
        <div
          className="track-list-container"
          style={{
            overflowY: 'auto',
            width: '100%',
            maxHeight: '60vh',
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            scrollbarColor: 'var(--textAdmin) transparent',
            scrollbarWidth: 'thin'
          }}
        >
          {filteredUsers.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            filteredUsers.map(user => (
              <div
                key={user.id}
                className="track-info"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: '10px',
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.03)'
                }}
              >
                <img
                  src={user.profilePic}
                  alt={user.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1, width: '100%' }}>
                  <h3 style={{ margin: 0 }}>{user.name}</h3>
                  <p style={{ margin: 0 }}>{user.email}</p>
                </div>
                <button
                  className="save-btn"
                  style={{ backgroundColor: '#FF6B6B', padding: '6px 12px', fontSize: '0.85rem' }}
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
