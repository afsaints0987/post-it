import React from "react";
import Forms from "../../components/Forms";
import {useLogin} from '../../hooks/useLogin'
import {useNavigate} from "react-router-dom"

const Login: React.FC = () => {
  const {login, error} = useLogin();
  const navigate = useNavigate()
    const [loginUser, setLoginUser] = React.useState({
        email: "",
        password: ""
    })
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setLoginUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }))
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginUser);

    await login(loginUser)
    navigate('/')
  };

  return (
    <>
      <Forms
        showUsername={false}
        title="Login"
        text="Login"
        handleChange={handleLoginChange}
        handleSubmit={handleLoginSubmit}
        link="/register"
        linkText="Register"
      />
      {error && <p className="text-danger text-center">{error}</p>}
    </>
  );
};

export default Login;
