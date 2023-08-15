import Forms from "../../components/Forms";

const Login: React.FC = () => {
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
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
