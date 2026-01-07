import { Icons } from "@/components/ui/icons";
import { footerNavigation } from "@/config/navigation";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 py-20 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {/* <!-- Image section --> */}
          <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
            <Icons.Logo className="size-12" />
          </div>

          <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
            <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
              {footerNavigation.slice(0, 2).map((i) => (
                <div key={i.title}>
                  <h3 className="font-medium text-gray-900">{i.title}</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {i.links.map((e) => (
                      <li key={e.name}>
                        <Link href={e.href} className="text-gray-500">
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              {footerNavigation.slice(2, 3).map((i) => (
                <div key={i.title}>
                  <h3 className="font-medium text-gray-900">{i.title}</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {i.links.map((e) => (
                      <li key={e.name}>
                        <Link href={e.href} className="text-gray-500">
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <h3 className="font-medium text-gray-900">
              Подпишись на нашу рассылку
            </h3>
            <p className="mt-4 text-gray-500">
              Будь первым, кто узнает о новых коллекциях и поступлениях.
            </p>

            <form action="" className="mt-3 sm:flex lg:block">
              <input
                id="email-address"
                type="text"
                aria-label="Email address"
                className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline"
              ></input>
              <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0 lg:mt-4 lg:ml-0">
                <button className="flex w-full items-center justify-center rounded-md border border-white bg-brand px-4 py-2 text-base font-medium text-white shadow-xs">
                  Подписаться
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-300 py-10 text-center">
          <p className="text-sm text-gray-500">© 2025 Your Company, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
