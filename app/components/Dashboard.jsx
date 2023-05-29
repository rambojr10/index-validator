import Box from '@mui/material/Box'
import '../styles/Dashboard.css'
import { Typography } from '@mui/material'

export function Dashboard() {
    return (
        <Box className="dashboard" sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }}>
            <Typography variant='h4'>Dashboard</Typography>
            <Typography variant='body1'>Welcome to the dashboard</Typography>
        </Box>
    )
}