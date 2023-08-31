import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom'

import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'
import { Loader } from './Loader'
import { IndexValidator } from '../pages/IndexValidator'
import { Logbook } from '../pages/Logbook'

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuthentication = async () => {

            const sessionKey = localStorage.getItem('key')

            if (sessionKey) {
                try {
                    const response = await fetch('http://localhost:5173/login', {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify({ key: sessionKey }),
                    })
                    const data = await response.json()
                    setIsAuthenticated(data.key === sessionKey)
                } catch (err) {
                    setIsAuthenticated(false)
                }
            } else {
                setIsAuthenticated(false)
                redirect('/login')
            }
            setIsLoading(false)
        }

        checkAuthentication()
    }, [])

    const handleLoginSuccess = () => {
        setIsAuthenticated(true)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route
                    path="/dashboard/*"
                    element={
                        isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                    }
                >
                    <Route path="index-validator" element={<IndexValidator />} />
                    <Route path="refactor-code" element={<div>Refactor code</div>} />
                    <Route path="find-errors" element={<div>Find errors</div>} />
                    <Route path="verify-woi" element={<div>Verify WOI</div>} />
                    <Route path="manteinance" element={<div>Manteinance</div>} />
                    <Route path="logbook" element={<Logbook isActive={true} />} />
                    <Route path="wiki-ppc" element={<div>Wiki PPC</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

