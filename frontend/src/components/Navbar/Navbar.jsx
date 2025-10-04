import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaBars, FaTimes } from 'react-icons/fa';

import './Navbar.css';

const Navbar = ({ songTime, albumImage, artistName, songName, albumName }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const iconWrapperRef = useRef(null);

    const showNavbar = () => {
        setIsNavOpen(prev => !prev);

        const iconWrapper = iconWrapperRef.current;
        if (iconWrapper) {
            iconWrapper.classList.remove('clicked');
            void iconWrapper.offsetWidth;
            iconWrapper.classList.add('clicked');

            setTimeout(() => {
                iconWrapper.classList.remove('clicked');
            }, 1000);
        }
    };

    return (
        <header>
            <h3>Logo</h3>
            <div>
                <div className='player-area'>
                    <FaPlay size={'2rem'} style={{marginRight: '.5rem'}} cursor={'pointer'}/>
                    <img className='album-image' src={albumImage} alt={`Capa do álbum ${albumName}`} />
                    <div className='player-info'>
                        <span className='status'>Tocando</span>
                        <span>{artistName} - {songName} ({albumName})</span>
                        <span id='songTime'>{songTime}</span>
                    </div>
                </div>
            </div>
            <button className="nav-btn" onClick={showNavbar}>
                <span className="nav-icon-wrapper" ref={iconWrapperRef}>
                    {isNavOpen ? <FaTimes className="nav-icon" /> : <FaBars className="nav-icon" />}
                </span>
            </button>
            <nav className={isNavOpen ? 'responsive_nav' : ''}>
                <a href="/#">Página Inicial</a>
                <a href="/#">Programação</a>
                <a href="/#">Sobre</a>
                <a href="/#">Contato</a>
            </nav>
        </header>
    );
};

export default Navbar;
