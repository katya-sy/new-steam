"use client";
import { Verification } from "@/types/verification-type";
import Link from "next/link";
import { dateFormatter } from "@/lib/date-formatter";
import Image from "next/image";
import { BASE_URL } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import {
  acceptVerificationRequest,
  rejectVerificationRequest,
} from "@/api/verification-api";
import { useVerificationStore } from "@/store/verification-store";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { Check, X } from "lucide-react";

export const VerificationItem = ({
  verification,
}: {
  verification: Verification;
}) => {
  const setVerifications = useVerificationStore(
    (state) => state.setVerifications,
  );
  const verifications = useVerificationStore((state) => state.verifications);

  const acceptHandler = async () => {
    const { success, data, error } = await acceptVerificationRequest(
      verification.id,
    );

    if (success) {
      setVerifications(
        verifications.filter((ver) => verification.id !== ver.id),
      );
      toast(`${data?.detail}`);
    } else {
      toast(<ErrorToast error={error} />);
    }
  };

  const rejectHandler = async () => {
    const { success, data, error } = await rejectVerificationRequest(
      verification.id,
    );

    if (success) {
      setVerifications(
        verifications.filter((ver) => verification.id !== ver.id),
      );
      toast(`${data?.detail}`);
    } else {
      toast(<ErrorToast error={error} />);
    }
  };

  return (
    <div className="flex justify-between flex-wrap gap-3 max-w-[500px]">
      <div className="flex items-center gap-10">
        <h3 className="text-lg flex items-center gap-2">
          <div className="flex flex-shrink-0 justify-center h-10 w-10 items-center bg-slate-700 rounded-full aspect-square overflow-hidden">
            <Image
              src={`${BASE_URL}${
                verification.profile?.pictures[0]?.picture ||
                "/media/placeholder/avatar.jpg"
              }`}
              className="object-cover"
              width={40}
              height={40}
              alt="User"
            />
          </div>
          <Link
            className="font-medium text-blue"
            href={`/other/${verification?.user.id}`}
          >
            {verification?.user.username}
          </Link>
        </h3>
        <p className="text-white/60 text-xs">
          {dateFormatter(verification?.date)}
        </p>
      </div>
      <div className="flex gap-2 items-start">
        <Button onClick={acceptHandler} size="icon">
          <Check size={40} />
        </Button>
        <Button onClick={rejectHandler} size="icon" variant="destructive">
          <X size={40} />
        </Button>
      </div>
    </div>
  );
};
