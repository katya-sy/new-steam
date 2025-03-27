"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AuthForm } from "./auth-form";
import { RegForm } from "./reg-form";
import { DialogPortal } from "./ui/dialog-portal";
import { useState } from "react";
import { useUserStore } from "@/store/user-store";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { deleteCookie } from "@/lib/cookie";
import { logout } from "@/api/user-api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useGameStore } from "@/store/game-store";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);
  const search = useGameStore((state) => state.search);
  const setSearch = useGameStore((state) => state.setSearch);

  const logoutHandler = async () => {
    const { success, data, error } = await logout();
    if (success) {
      toast(`${data?.detail}`);
      await deleteCookie("token");
      setProfile(null);

      router.push("/");
    } else {
      toast(<ErrorToast error={error} />);
    }
  };

  return (
    <header className="border-b-2 border-blue">
      <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-4 py-7 container">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image src="/logo.svg" width={42} height={42} alt="Logo" />
          </Link>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5">
            {profile ? (
              <>
                <Link className="font-medium text-blue" href="/profile">
                  Личный кабинет
                </Link>
                {profile.user.is_staff && (
                  <Link className="font-medium text-blue" href="/admin">
                    Админ-панель
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="font-medium text-red-500"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger className="font-medium text-blue">
                  Войти
                </Dialog.Trigger>
                <DialogPortal>
                  <Tabs.Root
                    className="flex flex-col gap-12"
                    defaultValue="auth"
                  >
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
                      <AuthForm setOpen={setOpen} />
                    </Tabs.Content>
                    <Tabs.Content value="reg">
                      <RegForm setOpen={setOpen} />
                    </Tabs.Content>
                  </Tabs.Root>
                </DialogPortal>
              </Dialog.Root>
            )}
          </div>
        </div>
        {pathname === "/" && (
          <div className="w-full min-[900px]:w-1/2">
            <Input
              placeholder="Поиск игр..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>
    </header>
  );
};
