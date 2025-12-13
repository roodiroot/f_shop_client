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

const OrderSuccessPage = () => {
  return (
    <Container>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icons.Logo className="size-12" />
          </EmptyMedia>
          <EmptyTitle>
            Мы уже собираем ваш заказ и скоро отправим его в путь.
          </EmptyTitle>
          <EmptyDescription>
            Информация о доставке и статусах будет доступна в личном кабинете.
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

export default OrderSuccessPage;
