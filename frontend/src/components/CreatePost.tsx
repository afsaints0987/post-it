import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreatePost: React.FC = () => {
  const [newPost, setNewPost] = React.useState({
    title: "",
    body: "",
  });

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newPost);

    setNewPost({
      title: "",
      body: "",
    });
  };

  return (
    <Form onSubmit={handlePostSubmit}>
      <Form.Group className="mb-2">
        <Form.Control
          name="title"
          type="text"
          placeholder="Title"
          className="border-0"
          onChange={handlePostChange}
          value={newPost.title}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          name="body"
          as="textarea"
          rows={4}
          type="text"
          placeholder="Post something unusual..."
          className="border-0"
          onChange={handlePostChange}
          value={newPost.body}
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        Post
      </Button>
    </Form>
  );
};

export default CreatePost;
