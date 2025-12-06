import ContentMarkdown from "@/components/general/content-markdown";

const product = {
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

interface DescriptionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string;
}

const DescriptionContent: React.FC<DescriptionContentProps> = ({
  description,
}) => {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
      {/* Description and details */}
      <div>
        <h3 className="sr-only">Description</h3>

        <div className="space-y-6">
          <ContentMarkdown
            content={description}
            className="text-sm text-gray-600"
          />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="text-gray-400">
                <span className="text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">Details</h2>

        <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">{product.details}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionContent;
