import Link from "next/link";
import apiServer from "@/utils/apiServer";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import { Traveler } from "@/interfaces/Traveler/Traveler";
import { ROLE } from "@/interfaces/userInfo/userRole";

export default async function SelectTrip() {
  let userInfo: UserInfo | undefined;
  const tripsOfTraveler: Traveler[] = await apiServer(
    "/api/protected/getOwnTrips"
  );

  try {
    const userInfoResponse: UserInfo = await apiServer(
      "/api/protected/getUserInfo"
    );
    userInfo = userInfoResponse;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }

  if (
    !tripsOfTraveler ||
    tripsOfTraveler.length === 0 ||
    !userInfo ||
    (userInfo.role !== ROLE.TRAVELER &&
      userInfo.role !== ROLE.TRAVELER_AND_BUYER)
  ) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-red-500">Error</h1>
        <p className="text-lg mt-2 mb-5">
          An error occurred while fetching data.
        </p>
        <Link
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          href="/"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl mt-10 p-5">
      <h1 className="text-2xl font-semibold text-center mb-5">Select Trip</h1>
      <div className="mb-8 p-4 bg-gray-100 rounded shadow">
        <div className="mb-4">
          <p className="font-bold">{userInfo.name}</p>
          <p className="text-sm text-gray-600">{userInfo.email}</p>
        </div>
        <h2 className="font-semibold">
          You are scheduled for {tripsOfTraveler.length} trip
          {tripsOfTraveler.length > 1 ? "s" : ""}
        </h2>
        <div>
          <ul>
            {tripsOfTraveler.map((trip) => (
              <li key={trip._id} className="m-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="/Traveler/select-trip/map-placeholder.jpg"
                    alt="Map Thumbnail"
                    className="w-20 h-20 object-cover rounded-full shadow"
                  />
                  <div className="flex w-full justify-between">
                    <button className="text-lg text-blue-500 font-semibold">
                      From {trip.itinerary.from.formatted_address} to{" "}
                      {trip.itinerary.to.formatted_address}
                    </button>
                    <Link
                      className="inline-block mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                      href={`/traveler/select-trip/accept-orders?countryStart=${trip.itinerary.from.country}&latStart=${trip.itinerary.from.lat}&lngStart=${trip.itinerary.from.lng}&countryEnd=${trip.itinerary.to.country}&latEnd=${trip.itinerary.to.lat}&lngEnd=${trip.itinerary.to.lng}`}
                    >
                      Select this trip
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {tripsOfTraveler.length === 0 && (
        <div className="text-center">
          <p>You haven't registered any trips yet.</p>
          <Link
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            href={"/traveler"}
          >
            Register a trip
          </Link>
        </div>
      )}
    </div>
  );
}
