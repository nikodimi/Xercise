import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import StartPage from './pages/StartPage'

const App = () => {
    return (
        <div id="App">

            <Routes>
                <Route path="/" element={<StartPage />} />
            </Routes>

        </div>
    )
}

export default App