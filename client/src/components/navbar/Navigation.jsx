import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoSettingsOutline, IoCalendarOutline, IoHomeOutline, IoLogOutOutline, IoCalendarNumber, IoCalendarSharp, IoBagAdd, IoAddOutline } from "react-icons/io5";
import HamburgerMenu from './HamburgerMenu';

import "./Navigation.css";
import { ImBoxAdd, ImFolderUpload } from "react-icons/im";

const Navigation = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setLogged] = useState('');

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

    return (
        <header className="site-header">
            <div className="site-header-section">
                <p className="logo">Maaaaaster<span>Planer</span></p>

                {isLoggedIn ? (
                    <></>
                ) : (
                    <div className="site-header-section">
                        <Link className="sidebar-btn" to="/"><IoHomeOutline /></Link>
                        <Link className="sidebar-btn" to="/calendar"><IoCalendarOutline /> </Link>
                    </div>
                )}
            </div>

            {isLoggedIn ? (
                <div className="site-header-section">
                    <Link className="sidebar-btn" to="/"><IoHomeOutline /></Link>
                    <Link className="sidebar-btn" to="/calendar"><IoCalendarOutline /> </Link>
                    <Link className="sidebar-btn" to="/event"><IoAddOutline /> </Link>
                    <Link className="sidebar-btn" to='/settings'><IoSettingsOutline /></Link>
                    <Link className="sidebar-btn" onClick={handleLogout}><IoLogOutOutline /></Link>
                    <HamburgerMenu />
                </div>
            ) : (
                <div className="site-header-section">
                    <Link className="sidebar-btn user-btn" to="/register">Rejestracja</Link>
                    <Link className="sidebar-btn user-btn" to="/login">Logowanie</Link>
                    <HamburgerMenu />
                </div>
            )}
        </header>
    )
}

export default Navigation