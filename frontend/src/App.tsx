import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navigation from './components/Navigation'
import Posts from './pages/Posts/Posts'
import User from './pages/User/User'
import Profile from './pages/Profile/Profile'
import './App.css'
import Error404 from './pages/Error/Error404'

function App() {
  
  return (
    <div id="app">
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
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </div>
  )
}

export default App
