import { Routes, Route, Navigate } from 'react-router-dom'
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
import MusclePage from './pages/MusclePage'
import ActivePage from './pages/ActivePage'
import HistoryPage from './pages/HistoryPage'
import { useAuthContext } from './contexts/AuthContext'
import './assets/scss/App.scss'

const App = () => {
    const { currentUser } = useAuthContext()

    return (
        <div id="App">

            <Routes>
                {!currentUser ?  (
                    <Route path="/" element={<StartPage />} />
                    ) : (
                    <Route path="/" element={<Navigate to="/workouts" />} />
                    )
                }  
                {!currentUser ?  (
                    <Route path="/login" element={<LoginPage />} />
                    ) : (
                    <Route path="/login" element={<Navigate to="/workouts" />} />
                    )
                }    
                {!currentUser ?  (
                    <Route path="/signup" element={<SignupPage />} />
                    ) : (
                    <Route path="/signup" element={<Navigate to="/workouts" />} />
                    )
                }         
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/workouts" element={
                    <RequireAuth>
                        <WorkoutsPage />
                        <Navigation />
                    </RequireAuth>
                } />
                <Route path="/workouts/:id" element={
                    <RequireAuth>
                        <WorkoutPage />
                        <Navigation />
                    </RequireAuth>
                } />
                <Route path="/muscles" element={
                    <RequireAuth>
                        <MusclesPage />
                        <Navigation />
                    </RequireAuth>
                } />
                <Route path="/muscles/:id" element={
                    <RequireAuth>
                        <MusclePage />
                        <Navigation />
                    </RequireAuth>
                } />
                <Route path="/history" element={
                    <RequireAuth>
                        <HistoryPage />
                        <Navigation />
                    </RequireAuth>
                } />
                <Route path="/profile" element={
                    <RequireAuth>
                        <ProfilePage />
                        <Navigation />
                    </RequireAuth>
                } />
                <Route path="/active" element={
                    <RequireAuth>
                        <ActivePage />
                        <Navigation />
                    </RequireAuth>
                } />
            </Routes>

            {/* <Navigation /> */}
            {/* <ReactQueryDevtools position='bottom-left' /> */}

        </div>
    )
}

export default App