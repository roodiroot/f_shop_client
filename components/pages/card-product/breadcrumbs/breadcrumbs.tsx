import BreadcrumbsItem from "./breadcrumbs-item";

interface CrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  crumbs: CrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ crumbs }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {crumbs.map((breadcrumb) => {
          return (
            <BreadcrumbsItem
              key={breadcrumb.label}
              label={breadcrumb.label}
              href={breadcrumb.href}
            />
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
