import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navigation from './components/Navigation'
import Posts from './pages/Posts/Posts'

function App() {
  return (
    <>
      <Navigation showLogout={false}/>
      <Routes>
        <Route path="/" element={<Posts _id={''} title={''} body={''}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
