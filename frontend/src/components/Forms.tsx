import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

interface FormProps {
  title: string
  text: string
  link: string
  linkText: string
  showUsername?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Forms: React.FC<FormProps> = ({title, text, handleChange, handleSubmit, showUsername, link, linkText}) => {
  return (
  <div className="container d-flex flex-column align-items-center my-5">
    <h3>{title}</h3>
    <Form onSubmit={handleSubmit}>
        {showUsername && (
          <Form.Group controlId="formBasicUsername" className="my-2">

              <Form.Control name="username" type="text" placeholder="Username" onChange={handleChange}/>
          </Form.Group>
        )}

        <Form.Group controlId="formBasicEmail" className="my-2">
            <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="my-2">
            <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange}/>
        </Form.Group>

        <Button variant="danger" type="submit" >
            {text}
        </Button>
        <Link to={link} className="mx-2">{linkText}</Link>
    </Form>
  </div>
  )
}

export default Forms