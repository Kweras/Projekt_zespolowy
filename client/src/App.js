import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import HomePage from './components/home/HomePage';
import Navigation from './components/navbar/Navigation';
import CalendarPage from './components/calendar/CalendarPage';
import PrivateRoute from './components/route/PrivateRoute';
import SettingsPage from './components/settings/SettingsPage';

const App = () => {
  return (
    <Router>
      <Navigation></Navigation>
      <main className='site-content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        </Routes>
      </main>
      <footer>
        <p>&copy; Marek Jaśkowiak, Kacper Nowak, Amadeusz Podlejski, Marcin Ptok</p>
      </footer>
    </Router>
  )
}

export default App;