import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const navigate = useNavigate();

    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (password !== repeatedPassword) {
                console.error('Error registering user - passwords are not the same!');
            } else if (!(email && email.match(isValidEmail))) {
                console.error('Error registering user - wrong email format!');
            } else {
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
                    console.error('Error registering user');
                }
            }

        } catch (error) {
            console.error('Error registering user', error);
        }
    };


    return (
        <div className='Home'>
            <h2>Rejestracja</h2 >
            <form onSubmit={handleSubmit}>

                <div>
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
                <div>
                    <label htmlFor="email">Email</label>
                    <input
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
                        type="password"
                        id="password"
                        value={password}
                        minLength={8}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="repeat-password">Powtórz hasło</label>
                    <input
                        type="password"
                        id="repeat-password"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Zarejestruj</button>
            </form>
        </div >
    );
};

export default Register;
