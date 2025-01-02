"use client";
import { motion } from "framer-motion";
import { FaBox, FaPlane } from "react-icons/fa";
import Link from "next/link";
import { ORDER_STATUS } from "@/interfaces/Order/ORDER_STATUS";
import { CompletedOrder } from "@/interfaces/Order/order";
import { Trip } from "@/interfaces/Traveler/Traveler";

type DashboardCardProps = {
  type: "order" | "trip";
  data: CompletedOrder | Trip;
};

const DashboardCard = ({ type, data }: DashboardCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border text-black capitalize p-6 rounded-lg shadow-lg bg-gray-100 transition"
    >
      {type === "order" ? (
        <>
          <FaBox className="text-3xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {(data as CompletedOrder).productName}
          </h3>
          <img
            className="w-full h-48 object-cover mb-4 rounded"
            src={(data as CompletedOrder).images[0]}
            alt={(data as CompletedOrder).productName}
          />
          {/* Conditional Rendering Based on Order Status */}
          {(data as CompletedOrder).orderStatus === ORDER_STATUS.ITEM_PAID && (
            <div>
              <p className="mb-2 text-secondary">
                Please confirm delivery once you receive your product.
              </p>
              <Link
                href={`/buyer/buyer-pay/confirmDelivery/${
                  (data as CompletedOrder)._id
                }`}
                className="inline-block bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Confirm Delivery
              </Link>
            </div>
          )}
          {(data as CompletedOrder).orderStatus === ORDER_STATUS.DELIVERED && (
            <div>
              <p className="mb-2 text-secondary">
                You've successfully received your product. Share your
                experience!
              </p>
              <Link
                href={"mailto:jibli.salaa@gmail.com"}
                className="inline-block bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Send Email
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <FaPlane className="text-3xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Trip to {(data as Trip).itinerary.to.formatted_address}
          </h3>
          <p className="text-black mb-1">
            Departure:{" "}
            {new Date((data as Trip).itinerary.departure).toLocaleDateString()}
          </p>
          <p className="text-black">
            Arrival:{" "}
            {new Date((data as Trip).itinerary.arrival).toLocaleDateString()}
          </p>
        </>
      )}
    </motion.div>
  );
};

export default DashboardCard;
