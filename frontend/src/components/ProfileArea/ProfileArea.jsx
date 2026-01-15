import React, { useRef, useState } from 'react';
import './ProfileArea.css';
import albumCover from '../../assets/marca_ufc.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import TrackModal from '../TrackModal/TrackModal';

const ProfileArea = () => {
  const favoriteSongs = [
    { id: 1, title: 'Minuto UFC 243 - 09/01/2026', artist: 'Universidade Federal do Ceará', duration: '01:38', album: 'Minuto UFC', cover: albumCover },
    { id: 2, title: 'Minuto UFC 242 - 02/01/2025', artist: 'Universidade Federal do Ceará', duration: '02:44', album: 'Minuto UFC', cover: albumCover },
    { id: 3, title: 'Minuto UFC 241 - 26/12/2025', artist: 'Universidade Federal do Ceará', duration: '02:14', album: 'Minuto UFC', cover: albumCover },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (song) => {
    setSelectedTrack(song);
    setIsModalOpen(true);
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="user-info">
          <img src='https://freesvg.org/img/abstract-user-flat-3.png' alt="Ícone do Usuário" />
          <div className="user-text-data">
            <span style={{ color: 'var(--textColor)', fontSize: '30pt' }}>
              Nome do Usuário
            </span>
            <span style={{ color: 'var(--textColor)', fontSize: '20pt' }}>
              email@email.com
            </span>
          </div>
        </div>

        <div className="favorite-songs">
          <span style={{ color: 'var(--textColor)', fontSize: '30pt' }}>
            Faixas Favoritas
          </span>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={5}
            slidesPerGroup={5}
            speed={800}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{ clickable: true }}
            style={{ marginTop: '20px', position: 'relative' }}
          >
            {favoriteSongs.map((song) => (
              <SwiperSlide key={song.id}>
                <div
                  className="song-card"
                  onClick={() => openModal(song)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={song.cover} alt={song.title} />
                  <span>{song.title}</span>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev" ref={prevRef}>
              <svg width="16" height="28" viewBox="0 0 24 24">
                <path d="M16 4l-8 8 8 8" fill="var(--mainColor)" />
              </svg>
            </div>

            <div className="swiper-button-next" ref={nextRef}>
              <svg width="16" height="28" viewBox="0 0 24 24">
                <path d="M8 4l8 8-8 8" fill="var(--mainColor)" />
              </svg>
            </div>
          </Swiper>
        </div>
      </div>

      <TrackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        track={selectedTrack}
      />
    </div>
  );
};

export default ProfileArea;
