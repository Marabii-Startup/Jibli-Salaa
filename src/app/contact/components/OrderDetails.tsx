import { BuyerOrderState } from "@/interfaces/Order/order";

export function OrderDetails({
  orderInfo,
}: {
  orderInfo: BuyerOrderState["value"];
}) {
  return (
    <div className="bg-white shadow-lg my-5 rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <div className="space-y-3">
        {orderInfo.productName && (
          <p className="text-gray-800">
            <strong>Product:</strong> {orderInfo.productName}
          </p>
        )}
        {orderInfo.description && (
          <p className="text-gray-800">
            <strong>Description:</strong> {orderInfo.description}
          </p>
        )}
        {orderInfo.quantity && (
          <p className="text-gray-800">
            <strong>Quantity:</strong> {orderInfo.quantity}
          </p>
        )}
        {orderInfo.estimatedValue && (
          <p className="text-gray-800">
            <strong>Estimated Value:</strong> $
            {orderInfo.estimatedValue.toFixed(2)}
          </p>
        )}
        {orderInfo.actualValue != 0 && (
          <p className="text-gray-800">
            <strong>Actual Value:</strong> ${orderInfo.actualValue.toFixed(2)}
          </p>
        )}
        {orderInfo.initialDeliveryFee && (
          <p className="text-gray-800">
            <strong>Initial Delivery Fee:</strong> $
            {orderInfo.initialDeliveryFee.toFixed(2)}
          </p>
        )}
        {orderInfo.actualDeliveryFee != 0 && (
          <p className="text-gray-800">
            <strong>Actual Delivery Fee:</strong> $
            {orderInfo.actualDeliveryFee.toFixed(2)}
          </p>
        )}
        {orderInfo.orderStatus && (
          <p className="text-gray-800">
            <strong>Status:</strong> {orderInfo.orderStatus}
          </p>
        )}
        {orderInfo.deliveryInstructions && (
          <p className="text-gray-800">
            <strong>Delivery Instructions:</strong>{" "}
            {orderInfo.deliveryInstructions}
          </p>
        )}
        {orderInfo.placedAt && (
          <p className="text-gray-800">
            <strong>Order Placed:</strong>{" "}
            {new Date(orderInfo.placedAt).toISOString()}
          </p>
        )}
        {orderInfo.productURL && (
          <p className="text-blue-600 hover:text-blue-800 transition duration-300">
            <strong>Product URL:</strong>{" "}
            <a
              href={orderInfo.productURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Product
            </a>
          </p>
        )}
        {orderInfo.preferredPickupPlace && (
          <p className="text-gray-800">
            <strong>Pickup Place:</strong>{" "}
            {orderInfo.preferredPickupPlace.formatted_address}
          </p>
        )}
        {orderInfo.orderAccepted && (
          <p className="text-green-500">
            <strong>Order Accepted</strong>
          </p>
        )}
      </div>
    </div>
  );
}
