import React, { useContext } from "react";
import { http } from "../../config/axios";
import { Container, Row, Col } from "react-bootstrap";
import { PostsProps } from "../Posts/Posts";
import { UserContext } from "../../context/UserContext";
import * as FaIcons from "react-icons/fa";
import Comment from "../../components/Comment";
import CreatePost from "../../components/CreatePost";

interface UserProfileProps {
  username: string;
  email: string;
}

const Profile: React.FC<UserProfileProps> = () => {
  const { state } = useContext(UserContext);
  const [user, setUser] = React.useState<UserProfileProps | undefined>(undefined);
  const [posts, setPosts] = React.useState<PostsProps[]>([]);

  const getProfile = async () => {
    const response = await http.get("users/profile", {
      withCredentials: true,
    });
    const userProfile = await response.data;
    setUser(userProfile);
  };

  React.useEffect(() => {
    getProfile();

    return () => {
      setUser(undefined);
    };
  }, []);

  const fetchUserPost = async () => {
    const response = await http.get("posts");
    const postData = await response.data;
    const userPost = postData.filter(
      (post: { author: { username: string | undefined } }) =>
        post.author?.username === user?.username
    );
    setPosts(userPost);
  };

  React.useEffect(() => {
    fetchUserPost();
    return () => {
      setPosts([]);
    };
  }, [user]);

  const refreshProfile = React.useCallback(() => {
    fetchUserPost();
  }, [user]);

  return (
    <Container fluid className="pt-2">
      <Row>
        <Col md="auto" lg="2">
          <h4>User Profile</h4>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </Col>
        <Col md="auto" className="mx-3" lg="8">
          {posts ?
            posts.map((post) => (
              <div key={post._id} className="my-3">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                {state.isAuthenticated && (
                  <>
                    {state.username === post.author?.username && (
                      <>
                        <FaIcons.FaRegTrashAlt className="icons mx-2" />
                        <FaIcons.FaRegEdit className="icons" />
                      </>
                    )}
                    <Comment
                      comments={post.comments}
                      postId={post._id}
                      commentRefresh={refreshProfile}
                    />
                  </>
                )}
              </div>
            )) : <CreatePost handleRefresh={refreshProfile}/>}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
