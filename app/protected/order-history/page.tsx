import TitlePage from "@/components/general/title-page";
import HistoryOrderItem from "@/components/pages/order-history/history-order-item";
import { GET_ORDER_BY_ID } from "@/graphql/order";
import client from "@/lib/apollo-client";
import { getServerAuth } from "@/lib/auth";
import { OrderResponse } from "@/types/order";
import { redirect } from "next/navigation";

const OrderHistoryPage = async () => {
  const { isAuthenticated, user } = await getServerAuth();

  if (!isAuthenticated) {
    redirect("/login");
  }

  const { data } = await client.query<OrderResponse>({
    query: GET_ORDER_BY_ID,
    variables: {
      filters: {
        user: {
          documentId: {
            eq: user?.documentId,
          },
        },
      },
      sort: "createdAt:desc",
    },
    fetchPolicy: "no-cache",
  });

  return (
    <div className="relative overflow-hidden bg-gray-50 pb-24 pt-0 sm:pt-0 lg:pt-0">
      <div className="relative mx-auto max-w-4xl px-4 sm:static sm:px-6 lg:px-8">
        <TitlePage description="Проверьте статус недавних заказов, оформляйте возвраты и находите похожие товары.">
          История заказов {user?.username}
        </TitlePage>
        <div className="mx-auto grid pt-6 w-full space-y-8">
          {data?.orders.map((order) => (
            <HistoryOrderItem key={order.documentId} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
