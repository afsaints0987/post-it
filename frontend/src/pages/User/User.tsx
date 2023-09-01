import React from 'react'
import { useParams } from 'react-router-dom'
import {http} from '../../config/axios'
import {Container, Row, Col} from 'react-bootstrap'

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
    <Container fluid>
        <Row>
            <Col md="auto">
                <h4>User Profile</h4>
                <p>Username: {user?.username}</p>
                <p>Email: {user?.email}</p>
            </Col>
            <Col md="auto" className="mx-3">
                <p>This for post</p>
            </Col>
        </Row>
    </Container>
  )
}

export default User