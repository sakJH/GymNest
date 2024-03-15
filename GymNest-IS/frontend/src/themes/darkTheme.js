import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Fialová
        },
        secondary: {
            main: '#03dac6', // Tyrkysová
        },
        background: {
            default: '#121212', // Velmi tmavě šedá
            paper: '#242424', // Tmavě šedá
        },
        text: {
            primary: '#ffffff', // Bílá pro primární text
            secondary: '#e0e0e0', // Světlá šedá pro sekundární text
        },
        error: {
            main: '#cf6679', // Tmavě růžová
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h5: {
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: 0.5,
        },
    },
});
