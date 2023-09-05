/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { http } from "../../config/axios";
import CreatePost from "../../components/CreatePost";
import { UserContext } from "../../context/UserContext";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import Comment from "../../components/Comment";

export interface PostsProps {
  _id?: string;
  title: string;
  body: string;
  author?: {
    id: string;
    username: string;
  };
  createdAt?: any;
}

const Posts: React.FC<PostsProps> = () => {
  const { state } = React.useContext(UserContext);
  const [posts, setPosts] = React.useState<PostsProps[]>([]);
  const getPosts = async () => {
    const fetchPosts = await http.get("/posts");
    const posts = fetchPosts.data;
    console.log(posts)
    setPosts(posts);
  };

  React.useEffect(() => {
    getPosts();

    return () => {
      setPosts([]);
    };
  }, []);

  const handlePostUpdate = (id: any) => {
    console.log(id);
  };

  const handlePostDelete = async (id: any) => {
    const response = await http.delete(`posts/${id}`, {
      withCredentials: true,
    });
    console.log(response.data.message);
    handlePostRefresh();
  };

  const handlePostRefresh = React.useCallback(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      {state.isAuthenticated && (
        <CreatePost handleRefresh={handlePostRefresh} />
      )}
      {posts ? (
        posts.map((post) => (
          <div key={post._id} className="my-4 post-container">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <small style={{ fontStyle: "italic" }}>
              author:{" "}
              {state.isAuthenticated && state.username !== post.author?.username ? (
                <Link to={`/user/${post.author?.id}`}>
                  <strong>{post.author?.username}</strong>
                </Link>
              ) : (
                <strong>{state.username === post.author?.username ? "me" : post.author?.username}</strong>
              )}
            </small>
            <br />
            <small>{new Date(post.createdAt).toLocaleString()}</small>
            {state.isAuthenticated && (
              <>
                {state.username === post.author?.username && (
                  <>
                    <FaIcons.FaRegTrashAlt
                      className="icons mx-3"
                      onClick={() => handlePostDelete(post._id)}
                    />
                    <FaIcons.FaRegEdit
                      className="icons"
                      onClick={() => handlePostUpdate(post._id)}
                    />
                  </>
                )}
              </>
            )}
            <Comment/>
          </div>
        ))
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
};

export default Posts;
