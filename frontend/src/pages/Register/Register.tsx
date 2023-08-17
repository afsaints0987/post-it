import React from "react";
import Forms from "../../components/Forms";
import {useRegister} from "../../hooks/useRegister"

const Register: React.FC = () => {
  const {register, error} = useRegister()
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

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerUser)
    await register(registerUser)
  };

  return (
    <>
    {error && <p className="text-danger text-center">{error}</p>}
      <Forms
        showUsername={true}
        title="Register"
        text="Register"
        handleChange={handleRegisterChange}
        handleSubmit={handleRegisterSubmit}
        link="/login"
        linkText="Login"
      />
    </>
  );
};

export default Register;
