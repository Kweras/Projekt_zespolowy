import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/register/Register';
import Login from './components/login/Login';
import HomePage from './components/home/HomePage';
import Navigation from './components/navbar/Navigation';
const App = () => {

  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App