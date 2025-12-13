import Link from "next/link";

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
import { getOrderByDocumentId } from "@/data/api/order";

import Container from "@/components/ui/container";
import RepayButton from "@/components/pages/order/repay-button";
import Summary from "@/components/pages/order/order-body/summary";
import UserInfo from "@/components/pages/order/order-body/user-info";
import StatusBar from "@/components/pages/order/order-body/status-bar";
import HeadOrder from "@/components/pages/order/order-body/head-order";
import ProductItem from "@/components/pages/order/order-body/product-item";

const OrdersPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const { data, ok } = await getOrderByDocumentId(id);

  if (!ok || !data) {
    return (
      <Container>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icons.Logo className="size-12" />
            </EmptyMedia>
            <EmptyTitle>Кажется, этого заказа не существует.</EmptyTitle>
            <EmptyDescription>
              Попробуйте проверить данные или вернуться на главную страницу.
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
  }

  return (
    <Container className="pt-0 sm:pt-0 lg:pt-0 bg-gray-50">
      <HeadOrder date={data?.createdAt} orderId={id} />
      <div className="bg-white shadow-xs rounded-md border overflow-hidden">
        <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
          <div className="space-y-8 sm:space-y-6 lg:col-span-7">
            {data.order_items.map((i: any) => (
              <ProductItem
                key={i.documentId}
                title={i.title}
                quantity={i.quantity}
                slug={i.product.slug}
                imageUrl={i.product_variant.images[0]}
                price={i.product_variant.price}
                color={i.product_variant.colorHex}
                size={i.product_variant.size}
              />
            ))}
            <Summary
              totalPrice={data.totalPrice}
              count={data.order_items.length}
            />
            <RepayButton orderId={id} status={data.statusOrder} />
          </div>

          <UserInfo
            address={data.deliveryAddress}
            phone={data.phone}
            email={data.email}
            comment={data.comment}
          />
        </div>
        <div className="border-t px-4 py-6 sm:px-6 lg:p-8">
          <StatusBar status={data.statusOrder} date={data.updatedAt} />
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;
