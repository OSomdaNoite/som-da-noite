import React, { useRef } from 'react';
import './ProfileArea.css';
import mock from '../../assets/mock.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProfileArea = () => {
  const favoriteSongs = [
    { id: 1, title: 'Faixa 1', cover: mock },
    { id: 2, title: 'Faixa 2', cover: mock },
    { id: 3, title: 'Faixa 3', cover: mock },
    { id: 4, title: 'Faixa 4', cover: mock },
    { id: 5, title: 'Faixa 5', cover: mock },
    { id: 6, title: 'Faixa 6', cover: mock },
    { id: 7, title: 'Faixa 7', cover: mock },
    { id: 8, title: 'Faixa 8', cover: mock },
    { id: 9, title: 'Faixa 9', cover: mock },
    { id: 10, title: 'Faixa 10', cover: mock },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="user-info">
          <img src={mock} alt="user picture" />
          <div className="user-text-data">
            <span style={{ color: "var(--textColor)", fontSize: "30pt" }}>
              Nome do Usuário
            </span>
            <span style={{ color: "var(--textColor)", fontSize: "20pt" }}>
              email@email.com
            </span>
          </div>
        </div>

        <div className="favorite-songs">
          <span style={{ color: "var(--textColor)", fontSize: "30pt" }}>
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
            {favoriteSongs.map(song => (
              <SwiperSlide key={song.id}>
                <div className="song-card">
                  <img src={song.cover} alt={song.title} />
                  <span>{song.title}</span>
                </div>
              </SwiperSlide>
            ))}

            {/* Botões personalizados */}
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
    </div>
  );
};

export default ProfileArea;
