export default function TripDates() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Enter the departure date and time of your trip
      </h2>
      <input
        type="datetime-local"
        name="departure"
        required
        className="w-full p-2 text-gray-700 border rounded-md shadow-sm mb-4"
      />

      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Enter the arrival date and time of your trip
      </h2>
      <input
        type="datetime-local"
        name="arrival"
        required
        className="w-full p-2 text-gray-700 border rounded-md shadow-sm mb-4"
      />
    </div>
  );
}
