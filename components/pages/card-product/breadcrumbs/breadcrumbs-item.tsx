import Link from "next/link";

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  href: string;
}

const BreadcrumbsItem: React.FC<BreadcrumbItemProps> = ({ label, href }) => {
  return (
    <li className="group">
      <div className="flex items-center">
        <Link
          href={href}
          className="mr-2 text-sm font-medium text-gray-900 line-clamp-1  group-last:text-gray-500 group-last:hover:text-gray-600"
        >
          {label}
        </Link>
        <svg
          fill="currentColor"
          width={16}
          height={20}
          viewBox="0 0 16 20"
          aria-hidden="true"
          className="h-5 w-4 text-gray-300 group-last:hidden"
        >
          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
        </svg>
      </div>
    </li>
  );
};

export default BreadcrumbsItem;
