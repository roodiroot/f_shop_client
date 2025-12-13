import { Button } from "@/components/ui/button";

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
import Container from "@/components/ui/container";

const OrderFailPage = () => {
  return (
    <Container>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icons.Logo className="size-12" />
          </EmptyMedia>
          <EmptyTitle>Кажется, что-то пошло не так.</EmptyTitle>
          <EmptyDescription>
            Попробуйте оплатить заказ ещё раз или выберите другой способ оплаты.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href={"/checkout"}>Повторить</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </Container>
  );
};

export default OrderFailPage;
