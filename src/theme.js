import { createTheme } from '@mui/material/styles';
import { blue, green, grey, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#a389d4',
        },
        secondary: {
            main: '#915fc1',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: grey[900],
            secondary: grey[600],
        },
        error: {
            main: red[400],
        },
        success: {
            main: green[500],
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 600 },
        body1: { fontSize: '1rem', lineHeight: 1.6 },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 6,
                },
            },
        },
    },
});

export default theme;