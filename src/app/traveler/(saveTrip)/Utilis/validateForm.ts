import { Errors } from "@/interfaces/Errors/errors";
import { Itinerary } from "@/interfaces/Traveler/Traveler";

export type ValidateFormResponse = {
  isError: boolean;
  errors: Errors<Itinerary>;
};

const validateForm = (itinerary: Itinerary): ValidateFormResponse => {
  const errors: Errors<Itinerary> = {};

  // Helper function to check if a value is empty
  const isEmpty = (value: any): boolean =>
    value === undefined || value === null || value === "";

  // Validate 'from' AddressObject
  if (!itinerary.from) {
    errors["from"] = "From address is required.";
  } else {
    if (isEmpty(itinerary.from.formatted_address)) {
      errors["from.formatted_address"] = "From address is required.";
    }
    if (isEmpty(itinerary.from.lat)) {
      errors["from.lat"] = "From latitude is required.";
    }
    if (isEmpty(itinerary.from.lng)) {
      errors["from.lng"] = "From longitude is required.";
    }
  }

  // Validate 'to' AddressObject
  if (!itinerary.to) {
    errors["to"] = "To address is required.";
  } else {
    if (isEmpty(itinerary.to.formatted_address)) {
      errors["to.formatted_address"] = "To address is required.";
    }
    if (isEmpty(itinerary.to.lat)) {
      errors["to.lat"] = "To latitude is required.";
    }
    if (isEmpty(itinerary.to.lng)) {
      errors["to.lng"] = "To longitude is required.";
    }
  }

  // Validate 'departure' date
  if (!itinerary.departure) {
    errors["departure"] = "Departure date is required.";
  } else {
    const departureDate = new Date(itinerary.departure);
    const now = new Date();
    if (isNaN(departureDate.getTime())) {
      errors["departure"] = "Departure date is invalid.";
    } else if (departureDate <= now) {
      errors["departure"] = "Departure date must be in the future.";
    }
  }

  // Validate 'arrival' date
  if (!itinerary.arrival) {
    errors["arrival"] = "Arrival date is required.";
  } else {
    const arrivalDate = new Date(itinerary.arrival);
    const now = new Date();
    if (isNaN(arrivalDate.getTime())) {
      errors["arrival"] = "Arrival date is invalid.";
    } else if (arrivalDate <= now) {
      errors["arrival"] = "Arrival date must be in the future.";
    }
  }

  // If both dates are valid, check if departure is before arrival
  if (itinerary.departure && itinerary.arrival) {
    const departureDate = new Date(itinerary.departure);
    const arrivalDate = new Date(itinerary.arrival);
    if (
      !isNaN(departureDate.getTime()) &&
      !isNaN(arrivalDate.getTime()) &&
      departureDate >= arrivalDate
    ) {
      errors["departure"] = "Departure date must be before arrival date.";
      errors["arrival"] = "Arrival date must be after departure date.";
    }
  }

  // Determine if there are any errors
  const isError = Object.keys(errors).length > 0;

  return { isError, errors };
};

export default validateForm;
