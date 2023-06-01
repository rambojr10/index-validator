import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { FactCheck, CodeOff, ErrorOutline, Key, LibraryBooks } from '@mui/icons-material'
import { Menu } from './Menu'
import { Item } from './Item'
import '../styles/Dashboard.css'
import { useState } from 'react'
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom'

export function Dashboard() {

    const navigate = useNavigate()

    const [activeItem, setActiveItem] = useState(false)

    const handleItemClick = (service) => {
        setActiveItem(service)
        const path = service.toLowerCase().replace(/ /g, '-')
        navigate(`${path}`)
    }

    return (
        <Container maxWidth="lg">
            <Menu />
            <Stack
                direction="row"
                my={4}
                justifyContent='center'
                flexWrap='wrap'
                gap={2}
            >
                <Item
                    service='Index validator'
                    icon={<FactCheck />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Index validator'}
                />
                <Item
                    service='Refactor code'
                    icon={<CodeOff />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Refactor code'}
                />
                <Item
                    service='Find errors'
                    icon={<ErrorOutline />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Find errors'}
                />
                <Item
                    service='Verify WOI'
                    icon={<Key />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Verify WOI'}
                />
                <Item
                    service='Wiki PPC'
                    icon={<LibraryBooks />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Wiki PPC'}
                />
            </Stack>
            <Divider sx={{ mb: 3 }} />

            <Outlet />

        </Container>
    )
}