import LoginForm from "@/components/general/forms/auth/login-form";
import WrapperAuth from "@/components/pages/auth-pages/wrapper-auth";

const LoginPage = () => {
  return (
    <WrapperAuth title="Войдите в аккаунт">
      <LoginForm />
    </WrapperAuth>
  );
};

export default LoginPage;
