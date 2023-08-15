import React from "react";
import { http } from "../../config/axios";
import CreatePost from "../../components/CreatePost";

interface PostsProps {
  _id?: string;
  title: string;
  body: string;
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

  return (
    <div className="container">
      <CreatePost />
      {posts ? (
        posts.map((post) => (
          <div key={post._id} className="my-3">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <span className="btn btn-sm btn-transparent border-0 text-sm">
              Comment
            </span>
            <span className="btn btn-sm btn-transparent border-0 text-sm">
              Like
            </span>
          </div>
        ))
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
};

export default Posts;
