import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { 
    FactCheck, 
    // CodeOff, 
    // ErrorOutline, 
    // Key, 
    LibraryBooks, 
    Book, 
    Brightness7, 
    BugReport,
    Image,
    Assessment,
} from '@mui/icons-material'
import { Menu } from '../components/Menu'
import { Item } from '../components/Item'
import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

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
                my={2}
                justifyContent='center'
                flexWrap='wrap'
                gap={1}
            >
                <Item
                    service='Index validator'
                    icon={<FactCheck />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Index validator'}
                />
                <Item
                    service='Run spiders'
                    icon={<BugReport />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Run spiders'}
                />
                <Item
                    service='Linkedin logo'
                    icon={<Image />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Linkedin logo'}
                />
                <Item
                    service='Make report'
                    icon={<Assessment />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Make report'}
                />
                {/* <Item
                    service='Refactor code'
                    icon={<CodeOff />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Refactor code'}
                /> */}
                {/* <Item
                    service='Find errors'
                    icon={<ErrorOutline />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Find errors'}
                /> */}
                {/* <Item
                    service='Verify WOI'
                    icon={<Key />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Verify WOI'}
                /> */}
                <Item
                    service='Manteinance'
                    icon={<Brightness7 />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Manteinance'}
                />
                <Item
                    service='Logbook'
                    icon={<Book />}
                    onClick={handleItemClick}
                    isActive={activeItem === 'Logbook'}
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