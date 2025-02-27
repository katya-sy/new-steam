"use client";
import { useStatusStore } from "@/store/status-store";
import { Arrow } from "./shared/arrow";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as Select from "@radix-ui/react-select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTagStore } from "@/store/tag-store";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Dispatch, SetStateAction, useState } from "react";
import { AvatarFileInput } from "@/components/avatar-file-input";
import { ImagesFileInput } from "@/components/images-file-input";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { createGame } from "@/api/game-api";
import { useGameStore } from "@/store/game-store";

const formSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
  status: z.string().min(1, "Обязательное поле"),
  tags: z.array(z.string()).min(1, "Выберите хотя бы один тег"),
  resource: z.string().min(1, "Обязательное поле"),
  video_source: z.string().min(1, "Обязательное поле"),
});

export const AddGameForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const statuses = useStatusStore((state) => state.statuses);
  const tags = useTagStore((state) => state.tags);
  const addGame = useGameStore((state) => state.addGame);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      resource: "",
      video_source: "",
      status: "",
    },
  });
  const [pictures, setPictures] = useState<File[] | null>([]);
  const [coverPictures, setCoverPictures] = useState<File[] | null>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    const status_id = statuses.find((st) => st?.name === values.status)?.id;
    const tag_ids = tags
      .filter((tag) => values.tags.includes(tag.name))
      .map((tag) => tag.id);

    Array.from(pictures || []).forEach((file) => {
      formData.append(`pictures`, file);
    });

    Array.from(coverPictures || []).forEach((file) => {
      formData.append(`cover_picture`, file);
    });

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("resource", values.resource);
    formData.append("video_source", values.video_source);

    if (status_id) formData.append("status_id", String(status_id));
    if (tag_ids)
      Array.from(tag_ids || []).forEach((tagId) => {
        formData.append(`tag_ids`, String(tagId));
      });

    const { success, data, error } = await createGame(formData);

    if (success && data) {
      form.reset();
      addGame(data);
      setOpen(false);
      toast(`Игра ${data?.name} создана`);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-5 justify-between">
            <AvatarFileInput
              pictures={coverPictures}
              game
              setPictures={setCoverPictures}
            />
            <ImagesFileInput pictures={pictures} setPictures={setPictures} />
          </div>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      className="bg-transparent px-5 py-2 border border-blue w-full h-20 text-white placeholder:text-white/60 resize-none"
                      placeholder="Описание"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select.Root
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <Select.Trigger className="flex justify-between items-center px-5 py-2 border border-blue w-full font-medium text-base">
                        <Select.Value placeholder="Статус выхода" />
                        <Select.Icon asChild className="pt-1">
                          <Arrow />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-bg border border-blue rounded-sm text-white">
                          <Select.ScrollUpButton />
                          <Select.Viewport>
                            {statuses.map((status) => (
                              <Select.Item
                                key={status.id}
                                className="relative px-5 py-2 w-full cursor-pointer"
                                value={status.name}
                              >
                                <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
                                <Select.ItemText>{status.name}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                          <Select.ScrollDownButton />
                          <Select.Arrow />
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resource"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Ссылка на официальный сайт"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_source"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Ссылка на видеообзор" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Controller
                      name="tags"
                      control={form.control}
                      render={({ field }) => (
                        <ToggleGroup
                          type="multiple"
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                          className="flex flex-wrap justify-start gap-2 my-2"
                        >
                          {tags?.map((tag) => (
                            <ToggleGroupItem
                              key={tag.id}
                              variant="outline"
                              value={tag.name}
                            >
                              {tag.name}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" size="sm">
          Опубликовать
        </Button>
      </form>
    </Form>
  );
};

// export const RegForm = ({
//   setOpen,
// }: {
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//       email: "",
//       birthDate: "",
//     },
//   });
//   const setProfile = useUserStore((state) => state.setProfile);
//   const [pictures, setPictures] = useState<File[]>([]);

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     const formData = new FormData();

//     const user = {
//       username: values.username,
//       email: values.email,
//       password: values.password,
//     };
//     Array.from(pictures || []).forEach((file) => {
//       formData.append(`pictures`, file);
//     });
//     Object.entries(user).forEach(([key, value]) => {
//       formData.append("user." + key, value);
//     });
//     formData.append("birth_date", values.birthDate);

//     const { success, data, error } = await register(formData);

//     if (success) {
//       form.reset();
//       await setCookie("token", String(data?.token));
//       toast(`Вы успешно зарегистрировались как ${data?.profile.user.username}`);
//       if (data) {
//         setProfile(data?.profile);
//       }
//       setOpen(false);
//     } else {
//       toast(<ErrorToast error={error} />);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col gap-3"
//       >
//         <AvatarFileInput pictures={pictures} setPictures={setPictures} />
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input placeholder="Логин" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input placeholder="E-mail" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="birthDate"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input placeholder="Дата рождения" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input type="password" placeholder="Пароль" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" size="sm">
//           Зарегистрироваться
//         </Button>
//       </form>
//     </Form>
//   );
// };
