import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import Navigation from './components/Navigation'
import RequireAuth from './components/RequireAuth'
import StartPage from './pages/StartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ProfilePage from './pages/ProfilePage'
import ExercisesPage from './pages/ExercisesPage'
import WorkoutsPage from './pages/WorkoutsPage'
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
                <Route path="/profile" element={
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                } />
                <Route path="/exercises" element={
                    <RequireAuth>
                        <ExercisesPage />
                    </RequireAuth>
                } />
            </Routes>

            <ReactQueryDevtools position='bottom-left' />

        </div>
    )
}

export default App