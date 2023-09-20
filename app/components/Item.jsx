import PropTypes from 'prop-types'
import { Avatar, Paper, Stack, Typography } from '@mui/material'

export function Item({ service, icon, onClick, isActive }) {

    const handleClick = () => {
        onClick(service)
    }

    const backgroundForItem = isActive ? 'special.main' : ''
    const hoverForItem = isActive ? '' : [0.9, 0.8, 0.7]
    const backgroundForAvatar = isActive ? 'white' : ''
    
    return (
        <Paper
            elevation={12}
            sx={{
                p: 1,
                minWidth: 160,
                cursor: 'pointer',
                backgroundColor: backgroundForItem,
                '&:hover': {
                    opacity: hoverForItem,
                },
                transition: 'all 0.3s ease-in'
            }}
            onClick={handleClick}
        >
            <Stack
                spacing={2}
                direction="row"
                alignItems="center"
            >
                <Avatar 
                    sx={{
                        backgroundColor: backgroundForAvatar,
                        width: 25,
                        height: 25,
                        padding: 2,
                    }}
                >
                    {icon}
                </Avatar>
                <Typography noWrap variant='body2'>{service}</Typography>
            </Stack>
        </ Paper>
    )
}

Item.propTypes = {
    service: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
}