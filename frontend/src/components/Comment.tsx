/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import {http} from '../config/axios'

export interface CommentProps {
  _id: string;
  author: string;
  text: string;
}

interface CommentComponentProps {
    comments: CommentProps[],
    postId: string | undefined
    commentRefresh: () => void ;
}

const Comment: React.FC<CommentComponentProps> = ({comments, postId, commentRefresh}) => {
  const { state } = React.useContext(UserContext);
  const [count, setCount] = React.useState(0);
  const [isToggle, setIsToggle] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const handleCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const handleToggleComment = (id: string | undefined) => {
    if(id){
        setIsToggle(!isToggle);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCommentText(value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await http.post(`/posts/${postId}/comment`, {text: commentText}, {
        withCredentials: true
    })

    setCommentText("")
    commentRefresh()
  };

  return (
    <>
      <span
        className="btn btn-sm btn-transparent border-0 text-sm mx-4"
        onClick={() => handleToggleComment(postId)}
      >
        {comments.length <= 1
          ? `${comments.length === 0 ? "" : comments.length} Comment`
          : `${comments.length} Comments`}
      </span>
      {state.isAuthenticated && (
        <span
          className="btn btn-sm btn-transparent border-0 text-sm"
          onClick={handleCount}
          style={{ color: count ? "#dc3545" : "black" }}
        >
          {count <= 1 ? "Like" : `${count} Likes`}
        </span>
      )}
      {isToggle && (
        <>
          {state.isAuthenticated && (
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="my-3">
                <Form.Control
                  name="comment"
                  as="textarea"
                  rows={2}
                  type="text"
                  placeholder="What can you say..."
                  className="border-0"
                  onChange={handleCommentChange}
                  value={commentText}
                  style={{ resize: "none", fontSize: "12px" }}
                  maxLength={100}
                />
              </Form.Group>
              <Button variant="danger" type="submit" size="sm">
                Submit
              </Button>
            </Form>
          )}
          {comments && comments.map((comment) => (
            <div className="m-3 px-4 py-2 border border-danger rounded shadow-sm" key={comment._id}>
              <small style={{ fontWeight: "bold" }}>{comment.author}</small>
              <p>{comment.text}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
