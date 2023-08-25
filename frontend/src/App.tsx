import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navigation from './components/Navigation'
import Posts from './pages/Posts/Posts'


function App() {
  
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Posts _id={''} title={''} body={''} author={{
          username: ''
        }}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
