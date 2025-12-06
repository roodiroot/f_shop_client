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

const EmailConfirmationRedirectionPage = () => {
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
};

export default EmailConfirmationRedirectionPage;
