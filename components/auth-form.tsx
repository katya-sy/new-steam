"use client";
import { Input } from "./ui/input";

export const AuthForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <Input placeholder="Логин" />
      <Input placeholder="Пароль" />
      <button className="bg-blue px-5 py-2 w-full font-medium text-bg text-center">
        Войти
      </button>
    </form>
  );
};
