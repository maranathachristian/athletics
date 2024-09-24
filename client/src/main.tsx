import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import { GetStatus } from './services/StatusService';
import GameDetails from './pages/GameDetails';
import Games from './pages/Games';

// TODO: make it display a page saying that the site is down or something
const [status, error] = GetStatus();
if (!status) {
  console.log(error);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<Games />} /> {/* New Game Details route */}
        <Route path="/games/:gameId" element={<GameDetails />} /> {/* New Game Details route */}
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
