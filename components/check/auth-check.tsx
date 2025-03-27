"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { getCookie } from "@/lib/cookie";
import { getProfile } from "@/api/user-api";
import { Loader } from "@/components/ui/loader";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { AUTH_REQUIRED_PATHS, STAFF_ONLY_PATHS } from "@/lib/consts";

interface Props {
  children: ReactNode;
}

export const AuthCheck = ({ children }: Props) => {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie("token");
      const isAuthRequired = AUTH_REQUIRED_PATHS.some((path) =>
        pathname.startsWith(path),
      );
      const isStaffRequired = STAFF_ONLY_PATHS.some((path) =>
        pathname.startsWith(path),
      );

      if (isAuthRequired && !token) {
        router.push(`/`);
        toast(
          <ErrorToast
            error={{
              message: "Авторизуйтесь для доступа к этой странице",
              statusCode: 401,
            }}
          />,
        );
        return;
      }

      if (token && !profile) {
        const { success, data } = await getProfile();
        if (success) {
          setProfile(data);
        } else {
          router.push("/");
          toast(
            <ErrorToast
              error={{
                message: "Авторизуйтесь для доступа к этой странице",
                statusCode: 401,
              }}
            />,
          );
          return;
        }
      }

      if (isStaffRequired && !profile?.user.is_staff) {
        router.push("/");
        toast(
          <ErrorToast
            error={{
              message: "У Вас нет прав администратора",
              statusCode: 403,
            }}
          />,
        );
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [profile, setProfile, router, pathname]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};
