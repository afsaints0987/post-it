import Forms from "../../components/Forms";

const Register: React.FC = () => {
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
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
