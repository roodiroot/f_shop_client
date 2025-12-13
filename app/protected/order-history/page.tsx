import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getServerAuth } from "@/lib/auth";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { getOrderByUserId } from "@/data/api/order";

import Container from "@/components/ui/container";
import TitlePage from "@/components/general/title-page";
import HistoryOrderItem from "@/components/pages/order-history/history-order-item";

const OrderHistoryPage = async () => {
  const { isAuthenticated, user } = await getServerAuth();
  const { data: orders, ok } = await getOrderByUserId(
    user?.documentId,
    "createdAt:desc",
    10
  );

  if (!isAuthenticated) {
    redirect("/login");
  }

  if (!orders?.length || !ok) {
    return (
      <Container>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icons.Logo className="size-12" />
            </EmptyMedia>
            <EmptyTitle>У вас пока нет заказов.</EmptyTitle>
            <EmptyDescription>
              Как только вы оформите покупку, она появится в этом разделе.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href={"/catalog"}>В каталог</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 pb-24 pt-0 sm:pt-0 lg:pt-0">
      <div className="relative mx-auto max-w-4xl px-4 sm:static sm:px-6 lg:px-8">
        <TitlePage description="Проверьте статус недавних заказов, оформляйте возвраты и находите похожие товары.">
          История заказов {user?.username}
        </TitlePage>
        <div className="mx-auto grid pt-6 w-full space-y-8">
          {orders.map((order) => (
            <HistoryOrderItem key={order.documentId} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
