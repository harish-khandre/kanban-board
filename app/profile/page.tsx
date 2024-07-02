import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/user-from-server";

export default async function Profile() {
  const user = await currentUser();
  return (
    <div className="flex justify-center items-center h-full">
      <UserInfo label="Profile" user={user} />
    </div>
  );
}
