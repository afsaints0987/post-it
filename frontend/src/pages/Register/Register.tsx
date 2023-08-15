import React from "react";
import Forms from "../../components/Forms";

const Register: React.FC = () => {
    const [registerUser, setRegisterUser] = React.useState({
        username: "",
        email: "",
        password: ""
    })

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setRegisterUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }))
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerUser)

  };

  return (
    <>
      <Forms
        showUsername={true}
        title="Register"
        text="Register"
        handleChange={handleRegisterChange}
        handleSubmit={handleRegisterSubmit}
        link="/"
        linkText="Login"
      />
    </>
  );
};

export default Register;
