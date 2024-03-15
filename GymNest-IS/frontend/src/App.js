import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './themeContext';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <ThemeProvider> {/* Komponenta poskytující motiv pro aplikaci */}
            <CssBaseline /> {/* Normalizuje CSS a zajišťuje konzistentní základní styl */}
            <Header />
            {/* TODO Další komponenty a obsah */}
            <Footer />
        </ThemeProvider>
    );
}

export default App;
