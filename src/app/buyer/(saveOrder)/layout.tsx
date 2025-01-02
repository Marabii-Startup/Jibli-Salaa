import FormWrapper from "@/components/Form/FormWrapper";
import { InitialOrder } from "@/interfaces/Order/order";
import { saveOrder } from "./Utilis/saveOrderAction";
import FormMapInput from "./Form/FormMapinput";
import FormUsualInputs from "./Form/FormUsualInputs";
import FormImagesInput from "./Form/FormImagesInput";
import FormErrorHandler from "./Form/FormErrorHandler";
import FormSubmissionButton from "./Form/FormSubmissionButton";

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "Buyer Page",
  description:
    "This is the buyers page designed to help users place orders in the Jiblii Salaa website. Travelers can then accept those orders and hand deliver them to their destinations.",
};

export default function BuyerLayout() {
  return (
    <>
      <FormWrapper<InitialOrder> action={saveOrder}>
        <FormUsualInputs />
        <FormMapInput />
        <FormImagesInput />
        <FormErrorHandler />
        <FormSubmissionButton />
      </FormWrapper>
    </>
  );
}
