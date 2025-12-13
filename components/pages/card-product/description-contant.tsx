import ContentMarkdown from "@/components/general/content-markdown";

const product = {
  highlights: [
    "Аккуратный крой и качественный пошив",
    "Стойкое окрашивание ткани",
    "Предварительная стирка для сохранения формы",
    "Мягкий хлопок высокого качества",
  ],
  details:
    "В комплект входит 6 базовых футболок: две черные, две белые и две серо-меланжевые. Универсальная модель для повседневного гардероба, легко сочетается с разными образами.",
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
        <h3 className="text-sm font-medium text-gray-900">
          Ключевые особенности
        </h3>

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
        <h2 className="text-sm font-medium text-gray-900">Детали изделия</h2>

        <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">{product.details}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionContent;
