import { Errors } from "@/interfaces/Errors/errors";
import { InitialOrder } from "@/interfaces/Order/order";

export type ValidateFormResponse = {
  isError: boolean;
  errors: Errors<InitialOrder>;
};

const validateForm = (buyerOrder: InitialOrder): ValidateFormResponse => {
  let errors: Errors<InitialOrder> = {};
  const regexProductName = /^[a-zA-Z0-9\s.,'-]{3,100}$/;
  const regexDescription = /^[a-zA-Z0-9\s.,'"-]{10,1000}$/;
  const regexDeliveryInstructions = /^[a-zA-Z0-9\s.,'"-]{10,1000}$/;

  // Validate productURL (optional but must be valid if provided)
  if (
    buyerOrder.productURL &&
    !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(buyerOrder.productURL)
  ) {
    errors.productURL = "Please enter a valid URL.";
  }

  // Validate estimatedValue (required and > 10)
  if (!buyerOrder.estimatedValue || buyerOrder.estimatedValue < 10) {
    errors.estimatedValue = "Estimated value must be more than 10.";
  }

  // Validate productName (required, length 3-100, matches regex)
  if (
    !buyerOrder.productName ||
    !regexProductName.test(buyerOrder.productName)
  ) {
    errors.productName =
      "Product name is required, 3-100 characters, and may contain letters, numbers, spaces, and . , ' -";
  }

  // Validate description (required, length 10-1000, matches regex)
  if (
    !buyerOrder.description ||
    !regexDescription.test(buyerOrder.description)
  ) {
    errors.description =
      "Description is required, 10-1000 characters, and may contain letters, numbers, spaces, and . , ' \" -";
  }

  // Validate quantity (must be more than 1)
  if (buyerOrder.quantity < 1) {
    errors.quantity = "Quantity must be at least 1.";
  }

  // Validate each dimension (must be positive)
  if (buyerOrder.dimensions) {
    if (buyerOrder.dimensions.lengthInCm <= 0) {
      errors["dimensions.lengthInCm"] = "Length must be a positive number.";
    }
    if (buyerOrder.dimensions.widthInCm <= 0) {
      errors["dimensions.widthInCm"] = "Width must be a positive number.";
    }
    if (buyerOrder.dimensions.heightInCm <= 0) {
      errors["dimensions.heightInCm"] = "Height must be a positive number.";
    }
  } else {
    errors.dimensions = "Dimensions are required.";
  }

  // Validate deliveryInstructions (optional but must match regex if provided)
  if (
    buyerOrder.deliveryInstructions &&
    !regexDeliveryInstructions.test(buyerOrder.deliveryInstructions)
  ) {
    errors.deliveryInstructions =
      "Delivery instructions must be 10-1000 characters and may contain letters, numbers, spaces, and . , ' \" -";
  }

  // Validate initialDeliveryFee (must be larger than 5)
  if (!buyerOrder.initialDeliveryFee || buyerOrder.initialDeliveryFee < 5) {
    errors.initialDeliveryFee = "Delivery fee must be larger than 5.";
  }

  // Validate preferredPickupPlace
  if (
    !buyerOrder.preferredPickupPlace ||
    !buyerOrder.preferredPickupPlace.formatted_address ||
    buyerOrder.preferredPickupPlace.lat === null ||
    buyerOrder.preferredPickupPlace.lng === null
  ) {
    errors.preferredPickupPlace =
      "Please enter or re-enter your preferred pickup place.";
  }

  // Validate images
  if (
    buyerOrder.selectedFiles.length === 0 ||
    buyerOrder.selectedFiles.some((file) => file.size === 0)
  ) {
    errors.selectedFiles = "Please select valid images before submitting.";
  }

  return { isError: Object.keys(errors).length !== 0, errors };
};

export default validateForm;
