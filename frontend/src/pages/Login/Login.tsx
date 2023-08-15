import React from "react";
import Forms from "../../components/Forms";

const Login: React.FC = () => {
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

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginUser);
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
    </>
  );
};

export default Login;
