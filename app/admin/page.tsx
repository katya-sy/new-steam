import { getAllVerifications } from "@/api/verification-api";
import { VerificationList } from "@/components/admin/verification-list";
import { Header } from "@/components/header";

export default async function Admin() {
  const { data, error } = await getAllVerifications();

  if (!data) {
    return (
      <p>
        {error?.message}: {error?.statusCode}
      </p>
    );
  }

  return (
    <div>
      <Header />
      <div className="container my-12 flex flex-col gap-5">
        <h1 className="font-medium text-3xl">Панель администратора</h1>
        <h2 className="font-medium text-2xl">Заявки на верификацию профиля</h2>
        <VerificationList data={data} />
      </div>
    </div>
  );
}
