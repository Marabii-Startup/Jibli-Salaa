import "server-only";

export default function FormDetails({
  MapSelectorWrapperFrom,
  MapSelectorWrapperTo,
  TripDates,
}: {
  MapSelectorWrapperFrom: React.ComponentType;
  MapSelectorWrapperTo: React.ComponentType;
  TripDates: React.ComponentType;
}) {
  return (
    <>
      <section className="flex gap-5 my-10 justify-around flex-wrap">
        <div>
          <h2 className="text-2xl mb-5 text-center font-semibold text-gray-800">
            Start Location
          </h2>
          <MapSelectorWrapperFrom />
        </div>
        <div>
          <h2 className="text-2xl mb-5 text-center font-semibold text-gray-800">
            Destination
          </h2>
          <MapSelectorWrapperTo />
        </div>
      </section>
      <section>
        <TripDates />
      </section>
    </>
  );
}
