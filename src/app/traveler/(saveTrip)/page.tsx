import { UserInfo } from "@/interfaces/userInfo/userInfo";
import apiServer from "@/utils/apiServer";

export default async function TravelerPage() {
  const userInfo: UserInfo = await apiServer("/api/protected/getUserInfo");

  return (
    <>
      <img
        className="mt-4 w-24 h-24 rounded-full object-cover"
        src={userInfo.profilePicture}
        alt="profile picture"
      />
      <h2 className="text-2xl font-semibold text-gray-800">
        Hey {userInfo.name}! Welcome back.
      </h2>
    </>
  );
}
