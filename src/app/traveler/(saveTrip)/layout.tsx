import MapSelectorWrapperFrom from "./Components/MapSelectorWrapperFrom";
import MapSelectorWrapperTo from "./Components/MapSelectorWrapperTo";
import TripDates from "./Components/TripDates";
import FormDetails from "./Form/FormDetails";
import FormWrapper from "./Form/FormWrapper";

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "traveler",
  description:
    "This is the traveler page of the Jiblii Salaa where travelers specify the start and end locations of their trip as well as other information to include them in the algorithm",
};

export default function TravelerTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FormWrapper>
        <FormDetails
          MapSelectorWrapperFrom={MapSelectorWrapperFrom}
          MapSelectorWrapperTo={MapSelectorWrapperTo}
          TripDates={TripDates}
        />
      </FormWrapper>
    </>
  );
}
