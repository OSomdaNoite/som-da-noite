import { useState, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import './Navbar.css';

const Navbar = () => {
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
