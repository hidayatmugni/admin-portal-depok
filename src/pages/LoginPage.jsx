import LoginForm from "../component/layout/Login";
import AuthForm from "./auth";

const LoginPage = () => {
  return (
    <>
      <AuthForm title="Login">
        <LoginForm />
      </AuthForm>
    </>
  );
};

export default LoginPage;
