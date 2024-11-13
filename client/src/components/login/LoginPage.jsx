import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                localStorage.setItem('isLoggedIn', true);
                navigate('/');
                window.location.reload();
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-header'>Logowanie</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className='form-input'
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło</label>
                    <input
                        className='form-input'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='btn-form' type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;  
