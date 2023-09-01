import React from 'react'
import {http} from '../../config/axios'

interface UserProfileProps {
    username: string,
    email: string
}

const Profile: React.FC<UserProfileProps> = () => {
    const [user, setUser] = React.useState<UserProfileProps>()

    React.useEffect(() => {
        const getProfile = async () => {
            const response = await http.get('users/profile', {
                withCredentials: true
            })
            const userProfile = await response.data
            setUser(userProfile)
        }
        getProfile()

        return () => {
            setUser(undefined)
        }
    },[])

  return (
    <div className="text-center">
        <h4>User Profile</h4>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
    </div>
  )
}

export default Profile