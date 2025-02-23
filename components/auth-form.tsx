"use client";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getProfile, login } from '@/api/user-api'
import { toast } from "sonner"
import { setCookie } from '@/lib/cookie'
import { useUserStore } from '@/store/user-store'
import {ErrorToast} from "@/components/error-toast";
import {Dispatch, SetStateAction} from "react";

const formSchema = z.object({
  username: z.string().min(1, 'Обязательное поле'),
  password: z
    .string()
    .min(1, 'Обязательное поле')
    .min(3, {
      message: 'Короткий пароль',
    })
    .max(24, {
      message: 'Длинный пароль',
    }),
})

export const AuthForm = ({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const setProfile = useUserStore((state) => state.setProfile)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, data, error } = await login(values)
    if (success) {
      form.reset()
      await setCookie('token', String(data?.key))

      const profileRes = await getProfile()
      toast(`Добро пожаловать, ${profileRes.data?.user.username}!`)
      setProfile(profileRes.data)

      setOpen(false)
    } else {
      toast(
        <ErrorToast error={error}/>
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Логин" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">Войти</Button>
      </form>
    </Form>
  )
}