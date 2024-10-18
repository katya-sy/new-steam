import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AuthForm } from "./auth-form";
import { RegForm } from "./reg-form";
import { DialogPortal } from "./ui/dialog-portal";

export const Header = () => {
  return (
    <header className="border-b-2 border-blue">
      <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-4 py-7 container">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image src="/logo.svg" width={42} height={42} alt="Logo" />
          </Link>
          <div className="flex items-center gap-5">
            <Link className="font-medium text-blue" href="/user">
              Личный кабинет
            </Link>
            <Dialog.Root>
              <Dialog.Trigger className="font-medium text-blue">
                Войти
              </Dialog.Trigger>
              <DialogPortal>
                <Tabs.Root className="flex flex-col gap-12" defaultValue="auth">
                  <Tabs.List className="flex items-baseline gap-10">
                    <Tabs.Trigger
                      className="font-medium text-white/60 text-xl dialog-tabs-trigger"
                      value="auth"
                    >
                      <Dialog.Title>Вход</Dialog.Title>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="font-medium text-white/60 text-xl dialog-tabs-trigger"
                      value="reg"
                    >
                      <Dialog.Title>Регистрация</Dialog.Title>
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="auth">
                    <AuthForm />
                  </Tabs.Content>
                  <Tabs.Content value="reg">
                    <RegForm />
                  </Tabs.Content>
                </Tabs.Root>
              </DialogPortal>
            </Dialog.Root>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Input placeholder="Поиск игр..." />
        </div>
      </div>
    </header>
  );
};
