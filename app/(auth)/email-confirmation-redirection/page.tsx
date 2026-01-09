import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ confirmation?: string }>;
};

const EmailConfirmationRedirectionPage = async ({ searchParams }: Props) => {
  const { confirmation } = await searchParams;

  if (!confirmation) {
    return (
      <Container>
        <main className="mx-auto max-w-md p-6 text-center">
          <h1>Некорректная ссылка</h1>
        </main>
      </Container>
    );
  }

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
  const endpoint = `${API_URL}/api/auth/email-confirmation?confirmation=${encodeURIComponent(
    confirmation
  )}`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Confirm failed");
    }

    return (
      <Container className="pb-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icons.Logo className="size-12" />
            </EmptyMedia>
            <EmptyTitle>Почта подтвержденa</EmptyTitle>
            <EmptyDescription>Теперь войдите в ваш аккаунт.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href={"/login"}>Войти</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    );
  } catch {
    return (
      <Container>
        <main className="mx-auto max-w-md p-6 text-center">
          <h1>Ошибка подтверждения</h1>
          <p>Ссылка устарела или уже была использована.</p>
        </main>
      </Container>
    );
  }
};

export default EmailConfirmationRedirectionPage;
