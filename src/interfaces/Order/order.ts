import type { AddressObject } from "../../interfaces/Map/AddressObject";
import { ORDER_STATUS } from "./ORDER_STATUS";
export interface Dimensions {
  lengthInCm: number;
  widthInCm: number;
  heightInCm: number;
}

export interface CompletedOrder {
  buyerId: string;
  description: string;
  images: string[];
  estimatedValue: number;
  initialDeliveryFee: number;
  actualValue: number;
  actualDeliveryFee: number;
  deliveryInstructions: string | null;
  productName: string;
  dimensions: Dimensions;
  productURL: string | null;
  quantity: number;
  placedAt: Date | null;
  preferredPickupPlace: AddressObject;
  isOrderAccepted: boolean;
  orderStatus: ORDER_STATUS;
  _id: string | null;
}

export type InitialOrder = Omit<
  CompletedOrder,
  | "buyerId"
  | "placedAt"
  | "isOrderAccepted"
  | "orderStatus"
  | "images"
  | "actualValue"
  | "actualDeliveryFee"
  | "isOrderAccepted"
  | "_id"
> & {
  selectedFiles: File[];
};
