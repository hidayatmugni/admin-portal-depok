import RegisterForm from "../component/layout/Register";
import AuthForm from "./auth";

const RegisterPage = () => {
  return (
    <>
      <AuthForm title="Register">
        <RegisterForm />
      </AuthForm>
    </>
  );
};

export default RegisterPage;
