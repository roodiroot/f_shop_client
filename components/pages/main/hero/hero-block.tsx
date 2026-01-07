import Image from "next/image";
import Link from "next/link";

interface HeroBLockProps {
  variant?: "default" | "line";
}

const HeroBLock: React.FC<HeroBLockProps> = ({ variant = "default" }) => {
  switch (variant) {
    case "line":
      return (
        <div className="relative">
          <div className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"></div>
          <div className="relative bg-gray-100 lg:bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
              <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                <div className="lg:pr-16">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Время быть заметным
                  </h1>
                  <p className="mt-4 text-xl text-gray-600">
                    Коллекция создана для тех, кто привлекает внимание случайно.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/catalog"
                      className="inline-block rounded-md border border-transparent bg-brand px-8 py-3 text-center font-medium text-white hover:bg-brand/80"
                    >
                      Показать коллекцию
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
            <Image
              width={1200}
              height={778}
              priority
              alt={"_image"}
              src="/images/hero.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="relative overflow-hidden bg-white">
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Время быть заметным
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  Коллекция создана для тех, кто привлекает внимание случайно.
                </p>
              </div>
              <div>
                <div className="mt-10">
                  {/* Decorative image grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                    <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              alt=""
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                              className="size-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/catalog"
                    className="inline-block rounded-md border border-transparent bg-brand px-8 py-3 text-center font-medium text-white hover:bg-brand/80"
                  >
                    Показать коллекцию
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default HeroBLock;
