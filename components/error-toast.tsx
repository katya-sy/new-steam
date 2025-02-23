import {ErrorType} from "@/api/api-instance";

export const ErrorToast = ({error}: {error: ErrorType | null}) => {
  return <p className="flex flex-col gap-2">
    <span>{error?.message}</span>
    <span className="text-xs text-red-500">Ошибка {error?.statusCode}</span>
  </p>
};