import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import Navigation from './components/Navigation'
import RequireAuth from './components/RequireAuth'
import StartPage from './pages/StartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ProfilePage from './pages/ProfilePage'
import WorkoutsPage from './pages/WorkoutsPage'
import WorkoutPage from './pages/WorkoutPage'
import MusclesPage from './pages/MusclesPage'
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
                <Route path="/workouts" element={
                    <RequireAuth>
                        <WorkoutsPage />
                    </RequireAuth>
                } />
                <Route path="/workouts/:id" element={
                    <RequireAuth>
                        <WorkoutPage />
                    </RequireAuth>
                } />
                <Route path="/muscles" element={
                    <RequireAuth>
                        <MusclesPage />
                    </RequireAuth>
                } />
                <Route path="/profile" element={
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                } />
            </Routes>

            <ReactQueryDevtools position='bottom-left' />

        </div>
    )
}

export default App