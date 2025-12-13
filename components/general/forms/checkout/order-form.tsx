"use client";

import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrderApi } from "@/data/order/order";

import { orderFormSchema } from "@/schemas/order";

import InputPhone from "@/components/ui/input-phone";

interface OrderFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const OrderForm: React.FC<OrderFormProps> = ({ ...props }) => {
  const router = useRouter();
  const { createOrderApi } = useCreateOrderApi();
  const { items, clearCart } = useCart();

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
      agree: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
    if (items.map((i) => i.stock <= 0 || !i.stock)[0]) {
      return toast({
        title: "Часть товаров в вашем заказе закончились",
        description: "Удалите их и попробуйте еще раз.",
      });
    }

    const payload = {
      customer: {
        phone: values.phone,
        email: values.email,
        deliveryAddress: values.address,
        comment: "Мое имя - " + values.name + ". " + values.comment,
      },
      paymentMethod: "card",
      items: items.map((i) => {
        return {
          variantId: i.variantId,
          quantity: i.quantity,
        };
      }),
    };

    try {
      const res = await createOrderApi(payload);

      if (res.success) {
        if (res.data?.orderId) {
          router.push(`/order/${res.data.orderId}`);
        }
        if (res.data?.confirmationUrl) {
          window.open(res.data.confirmationUrl, "_blank");
        }

        clearCart();
        form.reset();
      }
      if (res.error) {
        toast({
          title: `Ошибка оформления заказа!`,
          description: (res.error as { message?: string })?.message,
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка создания заказа!",
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <h2 className="text-lg font-medium text-gray-800">
          Контактная информация
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <InputPhone setValue={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormLabel className="text-gray-400 text-sm font-normal">
                Я подтверждаю согласие с условиями оформления заказа и
                обработкой персональных данных
              </FormLabel>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button
            disabled={!form.formState.isValid}
            className="w-full"
            type="submit"
          >
            Продолжить
          </Button>
          <p className="text-sm text-gray-800">
            После нажатия на кнопку "Продолжить", вы будете перенаправлены на
            страницу оплаты.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
