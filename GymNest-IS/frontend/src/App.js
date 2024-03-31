import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ActionsPage from './pages/ActivityPage';
import MembershipPage from './pages/MembershipPage';
import SchledulePage from './pages/SchledulePage';

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Reset CSS for consistency */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/akce" element={<ActionsPage />} />
        <Route path="/clenstvi" element={<MembershipPage />} />
        <Route path="/rozvrhy" element={<SchledulePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
