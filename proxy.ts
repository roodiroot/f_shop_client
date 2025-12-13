import { getMe } from "./data/api/user";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken");

  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      const user = await getMe(token.value);

      if (user?.username) {
        return NextResponse.redirect(new URL("/protected/profile", req.url));
      } else {
        const res = NextResponse.next();
        res.cookies.delete("authToken");
        res.cookies.delete("userData");
        return res;
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/protected")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const user = await getMe(token.value);

    if (!user?.username) {
      const res = NextResponse.redirect(new URL("/", req.url));
      res.cookies.delete("authToken");
      res.cookies.delete("userData");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/login", "/register"],
};
