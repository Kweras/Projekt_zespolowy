import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        <div className="navbar">
            <div className="links">
                <Link to="/" className="color">Strona główna</Link>
            </div>

            {isLoggedIn ? (
                <div className="userInfo">
                    <p>Zalogowano! </p>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </div>
            ) : (
                <div className="userInfo">
                    <Link to="/register">Rejestracja</Link>
                    <Link to="/login">Logowanie</Link>
                </div>
            )}
        </div>
    )
}

export default Navigation