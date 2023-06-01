import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Dashboard } from './Dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />}>
                    <Route path="index-validator" element={<div>Index validator</div>} />
                    <Route path="refactor-code" element={<div>Refactor code</div>} />
                    <Route path="find-errors" element={<div>Find errors</div>} />
                    <Route path="verify-woi" element={<div>Verify WOI</div>} />
                    <Route path="wiki-ppc" element={<div>Wiki PPC</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

