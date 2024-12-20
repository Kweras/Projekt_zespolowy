import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css"

const RegisterPage = () => {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (password !== repeatedPassword) {
            setError('Error registering user - passwords are not the same!');
            return;
        }

        if (!(email && email.match(isValidEmail))) {
            setError('Error registering user - wrong email format!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nick, email, password }),
            });
            if (response.ok) {
                console.log('User registered successfully');
                navigate('/login');
            } else {
                setError('Error registering user');
            }
        } catch (error) {
            console.error('Error registering user', error);
            setError('Error registering user');
        }
    };

    return (
        <div className='register-container'>
            <div className="register-form">
                <h2>Rejestracja</h2 >
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-container">
                        <label htmlFor="nick">Nick</label>
                        <input
                            type="text"
                            id="nick"
                            value={nick}
                            minLength={4}
                            maxLength={20}
                            onChange={(e) => setNick(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="repeat-password">Powtórz hasło</label>
                        <input
                            type="password"
                            id="repeat-password"
                            value={repeatedPassword}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='register-btn'>Zarejestruj</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
