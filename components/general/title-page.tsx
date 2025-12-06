interface TitlePageProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ description, children }) => {
  return (
    <div className="pt-16 pb-6">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {children}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-neutral-400">{description}</p>
      )}
    </div>
  );
};

export default TitlePage;
