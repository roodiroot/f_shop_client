import WrapperAuth from "@/components/pages/auth-pages/wrapper-auth";
import RequestPassResetForm from "@/components/general/forms/auth/request-pass-reset-form";

const RequestPasswordResetPage = () => {
  return (
    <WrapperAuth title="Введите ваш email">
      <RequestPassResetForm />
    </WrapperAuth>
  );
};

export default RequestPasswordResetPage;
