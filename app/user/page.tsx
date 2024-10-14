import { Header } from "@/components/header";
import { ProfileSidebar } from "@/components/profile-sidebar";

export default function User() {
  return (
    <div>
      <Header />
      <div className="gap-5 grid grid-cols-6 container">
        <ProfileSidebar />
        <div className="col-span-5 my-12">sfjygj</div>
      </div>
    </div>
  );
}
