import apiServer from "@/utils/apiServer";
import Link from "next/link";
import NotificationsComponent from "./NotificationHeader";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import { ROLE } from "@/interfaces/userInfo/userRole";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();

  const userInfo: UserInfo = await apiServer(
    "/api/protected/getUserInfo",
    {},
    false
  );

  const isUserAuthenticated: Record<string, boolean> = await apiServer(
    "/api/protected/verifyUser",
    {},
    false,
    { success: false }
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md p-5 md:px-10 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold text-gray-800 cursor-pointer hover:text-gray-600">
          Jibli Salaa
        </h1>
      </Link>
      <nav>
        <ul className="flex space-x-4 md:space-x-8">
          {userInfo?.role === ROLE.TRAVELER_AND_BUYER ? (
            <>
              <Link href="/traveler/select-trip">
                <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                  Manage Trips
                </li>
              </Link>
              <Link href="/manage-orders">
                <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                  Manage Orders
                </li>
              </Link>
            </>
          ) : (
            <>
              {userInfo?.role === ROLE.TRAVELER && (
                <>
                  <Link href="/traveler/manage-orders">
                    <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                      Manage Orders
                    </li>
                  </Link>
                  <Link href={"/traveler/select-trip"}>Select Trip</Link>
                  <Link href="/buyer">
                    <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                      Switch to Buyer
                    </li>
                  </Link>
                </>
              )}
              {userInfo?.role === ROLE.BUYER && (
                <>
                  <Link href="/buyer/manage-orders">
                    <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                      Manage Orders
                    </li>
                  </Link>
                  <Link href="/traveler">
                    <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                      Switch to Traveler
                    </li>
                  </Link>
                </>
              )}
            </>
          )}
          {(!userInfo || userInfo?.role === ROLE.NEITHER) && (
            <>
              <Link href="/traveler">
                <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                  Become a Traveler
                </li>
              </Link>
              <Link href="/buyer">
                <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                  Become a Buyer
                </li>
              </Link>
            </>
          )}
          {userInfo && (
            <Link href="/contact">
              <li className="cursor-pointer text-sm md:text-base text-gray-700 hover:text-blue-500">
                Contact
              </li>
            </Link>
          )}
        </ul>
      </nav>
      <div className="flex gap-5 items-center justify-between">
        <Link
          href="/login"
          className="text-sm md:text-base text-gray-700 hover:text-blue-500"
        >
          Log In
        </Link>
        {isUserAuthenticated.success && <NotificationsComponent />}
      </div>
    </header>
  );
}
