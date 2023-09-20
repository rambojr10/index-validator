import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

export function Menu() {
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        PPC General Tools
                    </Typography>
                    <Button color="inherit" onClick={logOut}>
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}