import apiServer from "@/utils/apiServer";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import { BuyerOrderState } from "@/interfaces/Order/order";
import { ROLE } from "@/interfaces/userInfo/userRole";
import Link from "next/link";
import { ORDER_STATUS } from "@/interfaces/Order/ORDER_STATUS";

export default async function ManageOrders() {
  const userInfo: UserInfo = await apiServer("/api/protected/getUserInfo");
  if (
    userInfo.role !== ROLE.TRAVELER &&
    userInfo.role !== ROLE.TRAVELER_AND_BUYER
  ) {
    throw new Error("Access Denied: You are not authorized to view this page.");
  }

  const response = await apiServer(
    `/api/protected/getOrdersByTravelerId/${userInfo._id}`
  );

  const orders: BuyerOrderState["value"][] = response.filter(
    (order: BuyerOrderState["value"]) =>
      order.orderStatus === ORDER_STATUS.DELIVERED
  );

  if (orders.length === 0) {
    return (
      <div className="text-center p-5">
        <h3 className="text-lg text-gray-600">
          You don't have any pending orders.
        </h3>
        <Link
          className="mt-3 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          href={"/traveler/select-trip"}
        >
          Select a Trip
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <h2 className="text-center text-2xl font-semibold mb-5">
        Manage Your Orders
      </h2>
      <div className="max-w-4xl mx-auto px-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-5">
            <div className="flex items-center space-x-4">
              <img
                className="w-20 h-20 object-cover rounded"
                src={order.images[0]}
                alt="Product"
              />
              <div>
                <p className="text-xl font-semibold">{order.productName}</p>
                <p className="text-gray-500">{order.actualDeliveryFee} euros</p>
                <p
                  className={`text-sm ${
                    order.orderStatus === ORDER_STATUS.DELIVERED
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.orderStatus}
                </p>
              </div>
            </div>
            {order.orderStatus === ORDER_STATUS.DELIVERED ? (
              <div className="mt-4 text-right">
                <h3 className="text-lg">
                  Product delivered! Click below to receive your payment.
                </h3>
                <Link
                  href={`/traveler/receive-payment/${order._id}`}
                  className="mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  Receive Payment
                </Link>
              </div>
            ) : (
              <div className="mt-4 text-right">
                <Link
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  href={`/negotiate?recipientId=${order.buyerId}&orderId=${order._id}`}
                >
                  Negotiate
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
