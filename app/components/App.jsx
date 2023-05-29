import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Dashboard } from './Dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

