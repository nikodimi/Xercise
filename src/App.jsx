import { Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import './assets/scss/App.scss'

const App = () => {
    return (
        <div id="App">

            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>

        </div>
    )
}

export default App