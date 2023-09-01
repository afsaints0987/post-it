import React, { useContext } from 'react'
import {http} from '../../config/axios'
import {Container, Row, Col} from 'react-bootstrap'
import { PostsProps } from '../Posts/Posts'
import { UserContext } from '../../context/UserContext'
import * as FaIcons from 'react-icons/fa'

interface UserProfileProps {
    username: string,
    email: string
}

const Profile: React.FC<UserProfileProps> = () => {
    const {state} = useContext(UserContext)
    const [user, setUser] = React.useState<UserProfileProps>()
    const [posts, setPosts] = React.useState<PostsProps[]>([])

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

    React.useEffect(() => {
        const fetchUserPost = async () => {
            const response = await http.get('posts')
            const postData = await response.data
            const userPost = postData.filter((post: { author: { username: string | undefined } }) => post.author?.username === user?.username)
            setPosts(userPost)
        }
        fetchUserPost();

        return () => {
            setPosts([])
        }
    },[user])

  return (
    <Container fluid className="pt-2">
        <Row>
            <Col md="auto">
                <h4>User Profile</h4>
                <p>Username: {user?.username}</p>
                <p>Email: {user?.email}</p>
            </Col>
            <Col md="auto" className="mx-3">
                {posts && posts.map(post => (
                    <div key={post._id} className="mb-3">
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                        {state.isAuthenticated && (
                            <>
                            <span className="btn btn-sm btn-transparent border-0 text-sm">
                              Comment
                            </span>
                            <span className="btn btn-sm btn-transparent border-0 text-sm">
                              Like
                            </span>
                            {state.username === post.author?.username && (
                              <>
                                <FaIcons.FaRegTrashAlt
                                  className="icons mx-2"
                                />
                                <FaIcons.FaRegEdit
                                  className="icons"
                                />
                              </>
                            )}
                          </>
                        )}
                    </div>
                ))}
            </Col>
        </Row>
    </Container>
  )
}

export default Profile