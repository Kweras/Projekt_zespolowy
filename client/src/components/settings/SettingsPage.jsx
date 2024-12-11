import { useState } from "react";
import './Settings.css'

const SettingsPage = () => {
  const [oldPassowrd, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repatedNewPassword, setRepeatedNewPassword] = useState('');
  const [newNick, setNewNick] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (newPassword !== repatedNewPassword) {
      setError('Error changing password - passwords are not the same!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        console.log('Password changed successfully');
      } else {
        setError('Error changing password');
      }
    } catch (error) {
      console.error('Error changing password', error);
      setError('Error changing password');
    }
  };

  const handleNickSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/changeNick', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        console.log('Nick changed successfully');
      } else {
        setError('Error changing nick');
      }
    } catch {
      console.error('Error changing nick', error);
      setError('Error changing nick');
    }
  }

  return (
    <div className="settings-page">
      <h1>Ustawienia</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handlePasswordSubmit}>
        <h2>Zmiana hasła</h2>
        <div className="input-container">
          <label htmlFor="oldpassowrd">Aktualne hasło</label>
          <input
            type="password"
            id="oldpassowrd"
            value={oldPassowrd}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="newpassword">Nowe hasło</label>
          <input
            type="password"
            id="newpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="repeat-new-password">Powtórz nowe hasło</label>
          <input
            type="password"
            id="repeat-new-password"
            value={repatedNewPassword}
            onChange={(e) => setRepeatedNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Zmień hasło</button>
      </form>

      <hr className="hr-line"></hr>

      <form onSubmit={handleNickSubmit}>
        <h2>Zmiana nazwy użytkownika</h2>
        <div className="input-container">
          <label htmlFor="newnick">Nowy nick</label>
          <input
            type="text"
            id="newnick"
            value={newNick}
            onChange={(e) => setNewNick(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Potwierdź zmianę hasłem</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Zmień nazwę użytkownika</button>
      </form>


    </div>

  )
}

export default SettingsPage;