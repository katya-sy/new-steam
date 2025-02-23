"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/api/user-api";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookie";
import { useUserStore } from "@/store/user-store";
import { ErrorToast } from "@/components/error-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { AvatarFileInput } from "@/components/avatar-file-input";

const formSchema = z.object({
  username: z.string().min(1, "Обязательное поле"),
  password: z
    .string()
    .min(1, "Обязательное поле")
    .min(3, {
      message: "Короткий пароль",
    })
    .max(24, {
      message: "Длинный пароль",
    }),
  email: z.string().email("Неверный формат почты"),
  birthDate: z.string(),
});

export const RegForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      birthDate: "",
    },
  });
  const setProfile = useUserStore((state) => state.setProfile);
  const [pictures, setPictures] = useState<File[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    Array.from(pictures || []).forEach((file) => {
      formData.append(`pictures`, file);
    });
    Object.entries(user).forEach(([key, value]) => {
      formData.append("user." + key, value);
    });
    formData.append("birth_date", values.birthDate);

    const { success, data, error } = await register(formData);

    if (success) {
      form.reset();
      await setCookie("token", String(data?.token));
      toast(`Вы успешно зарегистрировались как ${data?.profile.user.username}`);
      if (data) {
        setProfile(data?.profile);
      }
      setOpen(false);
    } else {
      toast(<ErrorToast error={error} />);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <AvatarFileInput pictures={pictures} setPictures={setPictures} />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Логин" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Дата рождения" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
};
