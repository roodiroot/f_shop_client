import PassResetForm from "@/components/general/forms/auth/pass-reset-form";
import WrapperAuth from "@/components/pages/auth-pages/wrapper-auth";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) => {
  const { code } = await searchParams;

  return (
    <WrapperAuth title="Введите новый пароль">
      <PassResetForm code={code} />
    </WrapperAuth>
  );
};

export default ResetPasswordPage;
