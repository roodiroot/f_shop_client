interface WrapperCatalogListProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const WrapperCatalogList: React.FC<WrapperCatalogListProps> = ({
  children,
}) => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default WrapperCatalogList;
