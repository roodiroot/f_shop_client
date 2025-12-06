"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/authcontext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/data/user";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema } from "@/schemas/auth";

import InputPassword from "@/components/ui/input-password";

interface PassResetFormProps extends React.HTMLAttributes<HTMLFormElement> {
  code: string;
}

const PassResetForm: React.FC<PassResetFormProps> = ({ code }) => {
  const router = useRouter();
  const authContext = useAuth();
  const { login } = authContext ?? {};

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code,
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof resetPasswordSchema>) => {
    try {
      const user = await resetPassword({
        code: value.code,
        password: value.password,
        passwordConfirmation: value.passwordConfirmation,
      });

      if (user.user && login) {
        login(user.jwt, user.user);
        router.push("/protected/profile");
        toast({
          title: "Вы вошли в аккаунт!",
          description: "Пароль успешно восстановлен.",
        });
      }
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div>
          <Button className="w-full" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PassResetForm;
