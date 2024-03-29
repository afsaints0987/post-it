import React from "react";
import Forms from "../../components/Forms";
import {useLogin} from '../../hooks/useLogin'

const Login: React.FC = () => {
  const {login, error} = useLogin();
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

    await login(loginUser)
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
