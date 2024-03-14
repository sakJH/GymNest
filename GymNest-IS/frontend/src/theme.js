import { createTheme } from '@mui/material/styles';

// Vytvoření vlastního tématu
const theme = createTheme({
    palette: {
        // Základní barvy
        primary: {
            main: '#556cd6', // Modrá
        },
        secondary: {
            main: '#19857b', // Zelená
        },
        error: {
            main: '#ff1744',
        },
        background: {
            default: '#f5f5f5', // Světlé pozadí
        },

    },
    typography: {
        // Přizpůsobení typografie
        fontFamily: 'Arial, sans-serif',
        h5: {
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: 0.5,
        },

    },
    // Můžete také přizpůsobit komponenty na úrovni tématu
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Zde můžete přizpůsobit vzhled tlačítek
                    fontSize: '1rem',
                },
            },
        },

    },
});

export default theme;
