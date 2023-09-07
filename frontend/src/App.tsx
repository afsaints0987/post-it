import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navigation from './components/Navigation'
import Posts from './pages/Posts/Posts'
import User from './pages/User/User'
import Profile from './pages/Profile/Profile'


function App() {
  
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Posts _id={''} title={''} body={''} author={{
          username: '',
          id: ''
        }} comments={[]} postId={undefined}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user/:id" element={<User username={''} email={''}/>}/>
        <Route path="/profile" element={<Profile username={''} email={''}/>}/>
      </Routes>
    </>
  )
}

export default App
