import React from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const Comment = () => {
  const { state } = React.useContext(UserContext);
  const [count, setCount] = React.useState(0);
  const [isToggle, setIsToggle] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const handleToggleComment = () => {
    setIsToggle(!isToggle);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <>
      <span
        className="btn btn-sm btn-transparent border-0 text-sm mx-4"
        onClick={handleToggleComment}
      >
        Comment
      </span>
      {state.isAuthenticated && (<span
        className="btn btn-sm btn-transparent border-0 text-sm"
        onClick={handleCount}
        style={{ color: count ? "#dc3545" : "black" }}
      >
        {count <= 1 ? 'Like' : `${count} Likes`}
      </span>)}
      {isToggle && (
        <>
          {state.isAuthenticated && (<Form onSubmit={handleCommentSubmit}>
            <Form.Group className="my-3">
              <Form.Control
                name="comment"
                as="textarea"
                rows={2}
                type="text"
                placeholder="What can you say..."
                className="border-0"
                onChange={handleCommentChange}
                value={comment}
                style={{ resize: "none", fontSize: "12px" }}
                maxLength={100}
              />
            </Form.Group>
            <Button variant="danger" type="submit" size="sm">
              Submit
            </Button>
          </Form>)}
          <div className="my-3 p-2">
            This is a comment section
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
