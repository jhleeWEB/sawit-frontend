import fetchUser from "@/service/fetch-user";
import UserProfileEditForm from "./_components/user-profile-edit-form";

export default async function UserEditPage() {
  const user = await fetchUser({});
  if (!user) return;
  return (
    <div className="w-full">
      <UserProfileEditForm />
    </div>
  );
}
