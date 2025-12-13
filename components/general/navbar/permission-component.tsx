"use client";

import Link from "next/link";

import { useAuth } from "@/context/authcontext";
import { usePathname, useRouter } from "next/navigation";

const PermissionComponent = () => {
  const router = useRouter();
  const path = usePathname();
  const authContext = useAuth();

  const { auth, logout } = authContext ?? {};

  const logoutAndRedirect = () => {
    logout && logout();
    if (path.split("/").includes("protected")) {
      router.push("/");
    }
  };

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      {auth && auth.token ? (
        <Link
          href="/protected/profile"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          {auth.user?.username}
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Войти
        </Link>
      )}
      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
      {auth && auth.token ? (
        <button
          onClick={logoutAndRedirect}
          className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Выйти
        </button>
      ) : (
        <Link
          href="/register"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Создать акаунт
        </Link>
      )}
    </div>
  );
};

export default PermissionComponent;
