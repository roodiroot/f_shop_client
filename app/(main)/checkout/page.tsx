import OrderForm from "@/components/general/forms/checkout/order-form";
import TitlePage from "@/components/general/title-page";
import SummeryInfo from "@/components/pages/checkout/summery-info";
import SummeryListComponent from "@/components/pages/checkout/summery-list-component";
import Container from "@/components/ui/container";

const CheckoutPage = () => {
  return (
    <Container className="pt-0 sm:pt-0 lg:pt-0">
      <TitlePage>Оформление заказа</TitlePage>
      <div className="border-t border-gray-200 mx-auto grid pt-6 max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <div className="w-full mx-auto max-w-lg">
          <h2 className="sr-only">Итоги заказа</h2>
          <div className="flow-root">
            <SummeryListComponent />
          </div>
          <SummeryInfo />
        </div>
        <div className="w-full mx-auto max-w-lg">
          <OrderForm />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
