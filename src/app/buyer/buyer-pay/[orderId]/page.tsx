import apiServer from "@/utils/apiServer";
import PayButton from "./PayButton";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import { ROLE } from "@/interfaces/userInfo/userRole";
import { CompletedOrder } from "@/interfaces/Order/order";
import Tetromino from "../../../../components/Loading/Tetromino/Tetromino";

export default async function BuyerPay({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const orderInfo: CompletedOrder = await apiServer(
    `/api/getOrderById/${orderId}`
  );

  const userInfo: UserInfo = await apiServer("/api/protected/getUserInfo");

  if (!userInfo) {
    return (
      <div>
        <Tetromino />
      </div>
    );
  }

  if (
    userInfo?.role !== ROLE.BUYER &&
    userInfo?.role !== ROLE.TRAVELER_AND_BUYER
  ) {
    throw new Error("You aren't a buyer, you can't access this page");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{orderInfo.productName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <img
              src={orderInfo.images[0]}
              alt={orderInfo.productName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <p className="text-gray-700 mb-4">{orderInfo.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold">Quantity:</h3>
              <p>{orderInfo.quantity}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Value:</h3>
              <p>€{orderInfo.actualValue.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Delivery Fee:</h3>
              <p>€{orderInfo.actualDeliveryFee.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Order Status:</h3>
              <p>{orderInfo.orderStatus}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold">Delivery Instructions:</h3>
          <p>{orderInfo.deliveryInstructions}</p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold">Preferred Pickup Place:</h3>
          <p>{orderInfo.preferredPickupPlace.formatted_address}</p>
        </div>
        <PayButton orderId={orderId} />
      </div>
    </div>
  );
}
