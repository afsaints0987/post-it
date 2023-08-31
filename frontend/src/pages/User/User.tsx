import React from 'react'
import { useParams } from 'react-router-dom'
import {http} from '../../config/axios'

interface UserProfileProps {
    username: string,
    email: string
}

const User: React.FC<UserProfileProps> = () => {
    const {id} = useParams()
    const [user, setUser] = React.useState<UserProfileProps>()

    React.useEffect(() => {
        const getUser = async () => {
            const response = await http.get(`/users/${id}`)
            const userProfile = await response.data
            setUser(userProfile)
        }
        getUser()

        return () => {
            setUser(undefined)
        }
    },[id])

  return (
    <div className="text-center">
        <h4>User Profile</h4>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
    </div>
  )
}

export default User