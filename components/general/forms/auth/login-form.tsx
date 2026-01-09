"use client";

import z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginUser } from "@/data/api/user";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authcontext";
import { loginFormSchema } from "@/schemas/auth";

import InputPassword from "@/components/ui/input-password";
import { useState } from "react";

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();
  const authContext = useAuth();
  const { login } = authContext ?? {};

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof loginFormSchema>) => {
    setDisabled(true);
    try {
      const user = await loginUser({
        identifier: value.identifier,
        password: value.password,
      });

      if (user.user && login) {
        login(user.jwt, user.user);
        router.push("/protected/profile");
        toast({
          title: "Вы успешно вошлив аккаунт!",
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка авторизации!",
        description: message,
      });
    }
    form.reset();
    setDisabled(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email или логин</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Пароль</FormLabel>
                <Link
                  href="/request-password-reset"
                  className="text-sm font-semibold text-brand hover:text-brand/80"
                >
                  Забыли пароль?
                </Link>
              </div>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div>
          <Button disabled={disabled} className="w-full" type="submit">
            Войти
          </Button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Еще нет аккаунта?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand hover:text-brand/80"
        >
          Создать
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
