const features = [
  {
    name: "Производство",
    description: "Разработано дизайнерской командой бренда",
  },
  {
    name: "Материал",
    description:
      "Основной материал — натуральные и износостойкие ткани с добавлением функциональных волокон",
  },
  {
    name: "Размеры",
    description: "Параметры изделия указаны в размерной сетке",
  },
  {
    name: "Отделка",
    description: "Качественная обработка швов и деталей",
  },
  {
    name: "Комплектация",
    description: "Изделие поставляется в фирменной упаковке",
  },
  {
    name: "Особенности",
    description:
      "Из-за использования натуральных материалов оттенок и фактура могут незначительно отличаться",
  },
];

const ProductFeatures = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 pb-24 sm:px-6 sm:pb-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Технические характеристики
          </h2>
          <p className="mt-4 text-gray-500">
            Изделие выполнено с высокой точностью и продуманной конструкцией,
            что обеспечивает удобство использования и аккуратную посадку
            элементов. Все материалы подобраны с учетом долговечности и
            повседневной эксплуатации.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-01.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-02.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-03.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-04.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
