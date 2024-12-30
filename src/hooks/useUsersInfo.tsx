import { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import { ROLE } from "@/interfaces/userInfo/userRole";

export default function useUsersInfo(userId: string, callback: () => void) {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        let endpoint = "/api/protected/getUserInfo";
        if (userId) {
          endpoint += `/${userId}`;
        }
        const result = await apiClient(endpoint);
        setUserInfo({
          ...result,
          role: ROLE[result.role as keyof typeof ROLE], // Safely type-cast
        });
      } catch (error: any) {
        if (error.response?.status === 404) {
          alert("User doesn't exist");
          callback();
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }

    fetchUserInfo();
  }, [userId]); // Ensures effect runs anytime userId changes.

  return userInfo;
}
