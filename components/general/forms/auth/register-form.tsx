"use client";

import z from "zod";
import Link from "next/link";

import InputPassword from "@/components/ui/input-password";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerUser } from "@/data/api/user";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { registrationFormSchema } from "@/schemas/auth";
import { useState } from "react";

interface RegisterFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const RegisterForm: React.FC<RegisterFormProps> = ({ ...props }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    setDisabled(true);
    try {
      const data = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (data.user) {
        toast({
          title: `${data.user.username} регистрация успешно завершена!`,
          description: "На вашу почту отправлено письмо для подтверждения.",
        });
        form.reset();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка регестрации!",
        description: message,
      });
    }
    setDisabled(false);
  };

  return (
    <Form {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="mt-1">
                Придумайте уникальное имя пользователя (не менее 2 символов).
              </FormDescription>
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
              <FormDescription className="mt-1">
                Введите действующий адрес электронной почты.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormDescription className="mt-1">
                Придумайте пароль (минимум 8 символов, буквы, цифры, символы).
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormDescription className="mt-1">
                Введите пароль ещё раз.
              </FormDescription>
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
        Уже есть аккаунт?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand hover:text-brand/80"
        >
          Войти
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
