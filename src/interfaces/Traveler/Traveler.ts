import { AddressObject } from "../Map/AddressObject";

export interface Trip {
  travelerId: string;
  itinerary: Itinerary;
  travelerStatus: TRAVELER_STATUS;
  _id: string;
}

export enum TRAVELER_STATUS {
  NO_ORDER,
  ORDER_ACCEPTED,
  ITEM_BOUGHT,
  EN_ROUTE,
  DELIVERED,
  CANCELLED,
}

export interface Itinerary {
  from: AddressObject;
  to: AddressObject;
  departure: Date;
  arrival: Date;
}
