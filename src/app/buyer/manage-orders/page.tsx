import { BuyerOrderState } from "@/interfaces/Order/order";
import apiServer from "@/utils/apiServer";

export default async function ManageOrders() {
  const orders: BuyerOrderState["value"][] = await apiServer(
    "/api/protected/getOwnOrders"
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {order.images && order.images.length > 0 && (
              <img
                src={order.images[0]}
                alt={order.productName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                {order.productName}
              </h2>
              <p className="text-gray-600 mb-4">{order.description}</p>
              <div className="mb-4">
                <p className="text-gray-800 font-medium">
                  Quantity: {order.quantity}
                </p>
                <p className="text-gray-800 font-medium">
                  Value: ${order.estimatedValue.toFixed(2)}
                </p>
                <p className="text-gray-800 font-medium">
                  Order Status:{" "}
                  <span className="uppercase">{order.orderStatus}</span>
                </p>
                {order.placedAt && (
                  <p className="text-gray-600">
                    Placed At: {new Date(order.placedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              {/* Conditional link based on orderStatus */}
              {order.orderStatus === "ORDER_FINALIZED" && (
                <a
                  href={`/buyer/buyer-pay/${order._id}`}
                  className="inline-block w-full text-center mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Proceed to Payment
                </a>
              )}
              {order.orderStatus === "ITEM_PAID" && (
                <a
                  href={`/buyer/buyer-pay/confirmDelivery/${order._id}`}
                  className="inline-block w-full text-center mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirm Delivery
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
