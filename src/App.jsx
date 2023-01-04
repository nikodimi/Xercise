import { Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ProfilePage from './pages/ProfilePage'
import Navigation from './components/Navigation'
import RequireAuth from './components/RequireAuth'
import './assets/scss/App.scss'

const App = () => {
    return (
        <div id="App">
            <Navigation />

            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/profile" element={
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                } />
            </Routes>

        </div>
    )
}

export default App