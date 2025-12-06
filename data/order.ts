export const createOrder = async ({
  phone,
  name,
  email,
}: {
  phone: string;
  name: string;
  email: string;
}) => {
  console.log({ phone, name, email });
  return { success: true };
};
