import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1565c0', // Tmavě modrá
        },
        secondary: {
            main: '#90caf9', // Světle modrá
        },
        background: {
            default: '#ffffff', // Bílá
            paper: '#f5f5f5', // Světle šedá
        },
        text: {
            primary: '#212121', // Tmavě šedá pro primární text
            secondary: '#757575', // Středně šedá pro sekundární text
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

