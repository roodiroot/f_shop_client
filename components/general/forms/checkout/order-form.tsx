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
import { zodResolver } from "@hookform/resolvers/zod";

import { useCart } from "@/hooks/use-cart";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrderApi } from "@/data/order/order";

import { orderFormSchema } from "@/schemas/order";

import InputPhone from "@/components/ui/input-phone";

interface OrderFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const OrderForm: React.FC<OrderFormProps> = ({ ...props }) => {
  const { createOrderApi, error, loading } = useCreateOrderApi();
  const { items, clearCart } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => item.price * item.quantity + sum,
    0
  );

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
    try {
      const res = await createOrderApi({
        totalPrice: totalPrice,
        deliveryAddress: values?.address || "",
        email: values?.email,
        comment: values?.comment,
        phone: values?.phone,
        cartItems: items,
      });

      if (res.success) {
        toast({
          title: `Заказ ${res.orderId} успешно оформлен!`,
          description:
            "Мы отправили подтверждение и детали заказа на вашу почту.",
        });
        clearCart();
        form.reset();
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
        <h2 className="text-lg font-medium text-neutral-800">
          Контактная информация
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя ПРИВЕТ</FormLabel>
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
              <FormLabel className="text-neutral-400 text-sm font-normal">
                Я подтверждаю согласие с условиями оформления заказа и
                обработкой персональных данных
              </FormLabel>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div>
          <Button
            disabled={!form.formState.isValid}
            className="w-full"
            type="submit"
          >
            Продолжить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
