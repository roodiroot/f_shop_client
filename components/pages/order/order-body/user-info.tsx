interface UserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  comment?: string | null;
}
const UserInfo: React.FC<UserInfoProps> = ({
  address,
  phone,
  email,
  comment,
}) => {
  return (
    <div className="mt-6 lg:col-span-5 lg:mt-0">
      <dl className="sm:grid sm:grid-cols-2 gap-x-6 text-sm">
        <div>
          <div className="">
            <dt className="font-medium text-gray-900">Адрес доставки</dt>
            <dd className="mt-3 text-gray-500">
              <span className="block text-balance">{address}</span>
            </dd>
          </div>

          <div className="mt-6">
            <dt className="font-medium text-gray-900">Способы связи</dt>
            <dd className="mt-3 text-gray-500 space-y-3">
              <span className="block">{email}</span>
              <span className="block">{phone}</span>
            </dd>
          </div>
        </div>

        <div className="mt-6 sm:mt-0">
          <dt className="font-medium text-gray-900">Комментарий к заказу</dt>
          <dd className="mt-3 text-gray-500 space-y-3">
            <span className="block text-balance">{comment}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default UserInfo;
