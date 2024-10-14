import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navigation.css";

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
                    <div className="site-header-section">
                        <Link to="/calendar">Kalendarz</Link>
                    </div>
                ) : (
                    <div className="site-header-section">
                        <Link to="/">Strona główna</Link>
                    </div>
                )}
            </div>

            {isLoggedIn ? (
                <div className="site-header-section">
                    <Link to='/settings'>Ustawienia</Link>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </div>
            ) : (
                <div className="site-header-section">
                    <Link to="/register">Rejestracja</Link>
                    <Link to="/login">Logowanie</Link>
                </div>
            )}
        </header>
    )
}

export default Navigation