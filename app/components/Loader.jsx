import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export function Loader() {
    return (
        <Box sx={{ 
            display: 'flex', 
            placeItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
        }}>
            <CircularProgress />
        </Box>
    )
}