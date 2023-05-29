import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import '../styles/Login.css'

export function Login() {

    const [key, setKey] = useState('')
    const [error, setError] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!key) {
            setError(true)
            return
        }
        setError(false)
        try {
            const response = await fetch('http://localhost:5173/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('key', data.key)
                window.location.href = '/dashboard'
                console.log(data)
            } else {
                console.log({
                    error: response.status,
                    message: response.statusText
                })
                setError(true)
            }
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }

    return (
        <Box id="form-login" component="form">
            <Stack direction="column" spacing={2}>
                <TextField
                    label="Key"
                    onChange={(e) => setKey(e.target.value)}
                    variant='standard'
                    error={error}
                />
                <Button
                    variant='contained'
                    onClick={handleLogin}
                >
                    Sign in
                </Button>
            </Stack>
        </Box>
    )
}