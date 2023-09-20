import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { CssBaseline } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontSize: 13, // Redefine el tamaño de fuente base
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#02596B',
        },
        secondary: {
            main: '#F5E000',
        },
        background: {
            default: '#171717',
        },
        special: {
            // main: '#e8591c',
            // main: '#e8373e'
            main: '#ff931c'
        }
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
