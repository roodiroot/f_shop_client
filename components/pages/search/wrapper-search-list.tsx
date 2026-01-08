interface WrapperSearchListProps extends React.HTMLAttributes<HTMLDivElement> {}
const WrapperSearchList: React.FC<WrapperSearchListProps> = ({ children }) => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="mt-6 grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default WrapperSearchList;
