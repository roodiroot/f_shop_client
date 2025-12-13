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

const NoProduct = () => {
  return (
    <Container className="bg-white">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icons.Logo className="size-12" />
          </EmptyMedia>
          <EmptyTitle>
            Похоже, этот товар недоступен или был перемещён.
          </EmptyTitle>
          <EmptyDescription>
            Попробуйте воспользоваться поиском или перейти в каталог.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href={"/"}>На главную</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </Container>
  );
};

export default NoProduct;
