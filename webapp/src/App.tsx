import React from 'react';
import './App.css';
import {Homepage} from "./components/homepage";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Homepage/>
        </ThemeProvider>
    );
}

export default App;
