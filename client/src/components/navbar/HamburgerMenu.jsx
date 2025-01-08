import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setLogged] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const l = localStorage.getItem('isLoggedIn');
        if (l) {
            setLogged(l);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
        window.location.reload();
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <button className="hamburger-btn" onClick={toggleMenu}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            {isOpen && (
                <div className="menu-overlay">
                    <button className="close-btn" onClick={toggleMenu}>
                        &times;
                    </button>
                    <nav className="menu-nav">
                        <p className="logo-hamburger">Maaaaaster<span>Planer</span></p>
                        <Link to="/" className='hamburger-menu-btn' onClick={toggleMenu}>
                            Strona główna
                        </Link>
                        <Link to="/calendar" className='hamburger-menu-btn' onClick={toggleMenu}>
                            Kalendarz
                        </Link>
                        <Link to="/settings" className='hamburger-menu-btn' onClick={toggleMenu}>
                            Ustawienia
                        </Link>

                        <hr className='hamburger-menu-line'></hr>

                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className='hamburger-menu-btn' onClick={toggleMenu}>
                                    Logowanie
                                </Link>
                                <Link to="/register" className='hamburger-menu-btn' onClick={toggleMenu}>
                                    Rejestracja
                                </Link>
                            </>
                        ) : (
                            <Link className="hamburger-menu-btn" onClick={handleLogout}>Wyloguj się</Link>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
