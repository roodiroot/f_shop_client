"use client";

import z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

import { requestResetPassword } from "@/data/api/user";
import { requestResetPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

interface RequestPassResetFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

const RequestPassResetForm: React.FC<RequestPassResetFormProps> = () => {
  const form = useForm<z.infer<typeof requestResetPasswordSchema>>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    value: z.infer<typeof requestResetPasswordSchema>
  ) => {
    try {
      await requestResetPassword(value.email);

      toast({
        title: "Успешно!",
        description: "Письмо с дальнейшими инструкциями отправлено на почту.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка!",
        description: message,
      });
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="mt-1">
                Введите ваш адрес электронной почты.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div>
          <Button className="w-full" type="submit">
            Отправить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RequestPassResetForm;
