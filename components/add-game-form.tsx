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

const formSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
  // status: z.string().min(1, "Обязательное поле"),
  tags: z.array(z.string()).min(1, "Выберите хотя бы один тег"),
  // resource: z.string().min(1, "Обязательное поле"),
  // video_source: z.string().min(1, "Обязательное поле"),
});

export const AddGameForm = () => {
  const statuses = useStatusStore((state) => state.statuses);
  const tags = useTagStore((state) => state.tags);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      // resource: "",
      // video_source: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {/* <AvatarFileInput pictures={pictures} setPictures={setPictures} /> */}
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
        {/* <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select.Root>
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
        /> */}
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
        <Button type="submit" size="sm">
          Опубликовать
        </Button>
      </form>
    </Form>
    // <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
    //   <Input placeholder="Название" />
    //   <textarea
    //     className="bg-transparent px-5 py-2 border border-blue w-full h-20 text-white placeholder:text-white/60 resize-none"
    //     placeholder="Описание"
    //   />
    //   <div className="flex justify-between items-center px-5 py-2 border border-blue border-dashed w-full">
    //     <span className="text-white/60">Изображения</span>
    //     <input
    //       className="before:absolute relative before:inset-0 before:flex before:justify-center before:items-center before:bg-blue w-28 xs:w-[174px] font-medium text-bg text-sm before:text-center max-xs:text-wrap before:content-['Загрузить_изображение']"
    //       type="file"
    //       name=""
    //       id=""
    //     />
    //   </div>

    //   <ToggleGroup
    //     className="flex flex-wrap justify-start gap-2 my-2"
    //     type="multiple"
    //   >
    //     {tags?.map((tag) => (
    //       <ToggleGroupItem key={tag?.id} variant="outline" value={tag?.name}>
    //         {tag?.name}
    //       </ToggleGroupItem>
    //     ))}
    //   </ToggleGroup>
    //   <Input placeholder="Ссылка на официальный сайт" />
    //   <Input placeholder="Ссылка на видеообзор" />
    //   <Button>Опубликовать</Button>
    // </form>
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
