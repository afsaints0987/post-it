import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <Navigation showLogout={false}/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
