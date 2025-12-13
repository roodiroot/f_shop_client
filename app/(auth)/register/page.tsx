import RegisterForm from "@/components/general/forms/auth/register-form";
import WrapperAuth from "@/components/pages/auth-pages/wrapper-auth";

const LoginPage = () => {
  return (
    <WrapperAuth title="Регистрация">
      <RegisterForm />
    </WrapperAuth>
  );
};

export default LoginPage;
