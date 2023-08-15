import React from "react";
import { http } from "../../config/axios";
import CreatePost from "../../components/CreatePost";
import * as FaIcons from 'react-icons/fa'

interface PostsProps {
  _id?: string;
  title: string;
  body: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
}

const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = React.useState<PostsProps[]>([]);

  const getPosts = async () => {
    const fetchPosts = await http.get("/posts");
    const posts = fetchPosts.data;
    setPosts(posts);
  };

  React.useEffect(() => {
    getPosts();

    return () => {
      setPosts([]);
    };
  }, []);

  const handlePostRefresh = React.useCallback(() => {
    getPosts();
  },[])
  

  return (
    <div className="container">
      <CreatePost handleRefresh={handlePostRefresh}/>
      {posts ? (
        posts.map((post) => (
          <div key={post._id} className="my-4 post-container">
            <h4>{post.title}</h4>
                <p>{post.body}</p>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
                <span className="btn btn-sm btn-transparent border-0 text-sm">
                Comment
                </span>
                <span className="btn btn-sm btn-transparent border-0 text-sm">
                Like
                </span>
                <FaIcons.FaRegTrashAlt className="icons mx-2"/>
                <FaIcons.FaRegEdit className="icons"/>
          </div>
        ))
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
};

export default Posts;
