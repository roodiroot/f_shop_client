// app/lib/auth.ts
import { getMe } from "@/data/api/user";
import { UserAuth } from "@/types/user";
import { cookies } from "next/headers";

export interface ServerAuth {
  isAuthenticated: boolean;
  user: UserAuth | null;
  token: string | null;
}

export async function getServerAuth(): Promise<ServerAuth> {
  const cookieStore = await cookies();

  const token = cookieStore.get("authToken")?.value ?? null;
  const userDataRaw = cookieStore.get("userData")?.value ?? null;

  if (!token || !userDataRaw) {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }

  try {
    const res = await getMe(token);

    if (!res?.username)
      return { isAuthenticated: false, user: null, token: null };

    return {
      isAuthenticated: true,
      user: res,
      token,
    };
  } catch (e) {
    console.error("Failed to parse userData cookie", e);
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
}
