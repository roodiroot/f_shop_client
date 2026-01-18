import { Icons } from "@/components/ui/icons";

const YourCompany = () => {
  return (
    <div className="border-t border-gray-300 py-10 text-center">
      <div className="text-sm text-gray-500">
        <div className="flex gap-3 items-center justify-center">
          <div className="">
            © {new Date().getFullYear()} Your Company, Inc.{" "}
          </div>
          <a
            target="_blank"
            href="https://matryoshka-studio.ru/about"
            className="p-1"
          >
            <Icons.matryoshka className="inline-block size-5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default YourCompany;
