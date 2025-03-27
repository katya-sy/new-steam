"use client";
import { Verification } from "@/types/verification-type";
import { useEffect } from "react";
import { useVerificationStore } from "@/store/verification-store";
import { VerificationItem } from "@/components/admin/verification-item";

export const VerificationList = ({ data }: { data: Verification[] | null }) => {
  const verifications = useVerificationStore((state) => state.verifications);
  const setVerifications = useVerificationStore(
    (state) => state.setVerifications,
  );

  useEffect(() => {
    if (data) setVerifications(data);
  }, [data, setVerifications]);

  return (
    <>
      {verifications.length > 0 ? (
        <div className="flex flex-col gap-10 mt-3">
          {verifications.map((verification) => (
            <VerificationItem
              key={verification.id}
              verification={verification}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Новые заявки на верификацию профиля отсутствуют
        </p>
      )}
    </>
  );
};
