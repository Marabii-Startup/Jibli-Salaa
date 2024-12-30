import "server-only";
import Input from "@/components/Input";

export default function FormUsualInputs() {
  return (
    <>
      <>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Please fill out your order details
        </h2>

        {/* Product URL */}
        <Input
          label="Product URL (Optional)"
          type="text"
          name="productURL"
          pattern={String(/^https?:\/\/[^\s/$.?#].[^\s]*$/)}
          errorMessage="Please enter a valid URL."
        />

        {/* Estimated Value */}
        <Input
          label="Estimated Value:"
          type="number"
          name="estimatedValue"
          pattern={String(/^(1[1-9]|[2-9][0-9]|[1-9][0-9]{2,})$/)}
          errorMessage="Please enter a number higher than 10."
          initialValue={10}
          required
        />

        {/* Product Name */}
        <Input
          label="Product Name"
          type="text"
          name="productName"
          pattern={String(/^[a-zA-Z0-9 .,'-]{3,100}$/)}
          errorMessage="Product name is required, 3-100 characters, and may contain letters, numbers, spaces, and . , ' -"
          required
        />

        {/* Description */}
        <Input
          label="Description"
          name="description"
          isTextarea={true}
          pattern={String(/^[a-zA-Z0-9\s.,'"-]{10,1000}$/)}
          errorMessage="Description is required, 10-1000 characters, and may contain letters, numbers, spaces, and . , ' \"
          required
        />

        {/* Quantity */}
        <Input
          label="How many items are you willing to buy?"
          type="number"
          name="quantity"
          pattern={String(/^([1-9]|[1-9][0-9]+)$/)}
          errorMessage="Quantity must be at least 1."
          initialValue={1}
          required
        />

        {/* Length in cm */}
        <Input
          label="Length in cm"
          type="number"
          name="dimensions.lengthInCm"
          pattern={String(/^[1-9]\d*$/)}
          errorMessage="Length must be a positive number."
          required
        />

        {/* Width in cm */}
        <Input
          label="Width in cm"
          type="number"
          name="dimensions.widthInCm"
          pattern={String(/^[1-9]\d*$/)}
          errorMessage="Width must be a positive number."
          required
        />

        {/* Height in cm */}
        <Input
          label="Height in cm"
          type="number"
          name="dimensions.heightInCm"
          pattern={String(/^[1-9]\d*$/)}
          errorMessage="Height must be a positive number."
          required
        />

        {/* Special Instructions */}
        <Input
          label="Special Instructions"
          name="deliveryInstructions"
          isTextarea={true}
          pattern={String(/^[a-zA-Z0-9\s.,'"-]{10,1000}$/)}
          errorMessage="Delivery instructions must be 10-1000 characters and may contain letters, numbers, spaces, and . , ' \"
        />

        {/* Initial Delivery Fee */}
        <Input
          label="Declare how much you're willing to pay the traveler"
          type="number"
          name="initialDeliveryFee"
          pattern={String(/^[5-9]\d*$|^\d{2,}$/)}
          errorMessage="Delivery fee must be larger than 5."
          initialValue={5}
          required
        />
      </>
    </>
  );
}
