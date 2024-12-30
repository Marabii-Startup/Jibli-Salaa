// app/confirm-delivery/[orderId]/page.tsx

import { BuyerOrderState } from "@/interfaces/Order/order";
import apiServer from "@/utils/apiServer";
import { redirect } from "next/navigation";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import ConfirmDeliveryClient from "./ConfirmDeliveryClient";
import { ROLE } from "@/interfaces/userInfo/userRole";

export default async function ConfirmDelivery({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  try {
    // Fetch user information
    const userInfo: UserInfo = await apiServer(`/api/protected/getUserInfo`);

    // Check user role
    if (
      userInfo.role !== ROLE.BUYER &&
      userInfo.role !== ROLE.TRAVELER_AND_BUYER
    ) {
      // Redirect to homepage if user is not authorized
      redirect("/");
      return null;
    }

    // Fetch order information
    const orderInfo: BuyerOrderState["value"] = await apiServer(
      `/api/getOrderById/${orderId}`
    );

    // Render the client component with order information
    return <ConfirmDeliveryClient orderInfo={orderInfo} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Redirect to homepage on error
    redirect("/");
    return null;
  }
}
