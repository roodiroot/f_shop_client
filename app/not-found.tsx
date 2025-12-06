import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

import Container from "@/components/ui/container";

const NotFoundPage = () => {
  return (
    <Container>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icons.Logo className="size-12" />
          </EmptyMedia>
          <EmptyTitle>Страницы не существует</EmptyTitle>
          <EmptyDescription>
            Такой страницы нет. Возможно, она переехала или была удалена.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Каталог</Button>
        </EmptyContent>
      </Empty>
    </Container>
  );
};

export default NotFoundPage;
