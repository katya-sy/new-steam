import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";

export const Header = () => {
  return (
    <header className="border-b-2 border-blue">
      <div className="flex justify-between items-center py-7 container">
        <div className="flex items-center gap-10">
          <Image src="/logo.svg" width={42} height={42} alt="Logo" />
          <Link className="font-medium text-blue" href="/user">
            Личный кабинет
          </Link>
        </div>
        <Input />
      </div>
    </header>
  );
};
