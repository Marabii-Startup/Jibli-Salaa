import { NextRequest, NextResponse } from "next/server";
import { ROLE } from "./interfaces/userInfo/userRole";
import apiServer from "./utils/apiServer";
import { UserInfo } from "./interfaces/userInfo/userInfo";

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken")?.value;
  if (!jwtToken) {
    console.log("No JWT token found in cookies");
    const originalUrl = request.nextUrl.clone();
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set(
      "redirect",
      originalUrl.pathname + originalUrl.search
    );
    return Response.redirect(loginUrl, 302);
  }

  try {
    // Verify the user
    const verifyResult = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}/api/protected/verifyUser`,
      {
        method: "GET",
        headers: {
          Cookie: `jwtToken=${jwtToken}`,
        },
      }
    );

    const verifyResponse = await verifyResult.json();
    const success = verifyResponse.success;

    if (!success) {
      const originalUrl = request.nextUrl.clone();
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set(
        "redirect",
        originalUrl.pathname + originalUrl.search
      );
      return Response.redirect(loginUrl, 302);
    }

    // Check if the requested path is either /traveler or /buyer
    const pathname = request.nextUrl.pathname;
    const isRoleFreeRoute = pathname === "/traveler" || pathname === "/buyer";

    if (isRoleFreeRoute) {
      // Allow access without a role check
      return NextResponse.next();
    }

    // Fetch user info to get the role
    const userInfo: UserInfo = await apiServer(`/api/protected/getUserInfo`);

    // Determine the required role for other paths
    let requiredRole: ROLE | null = null;

    if (pathname.startsWith("/buyer")) {
      requiredRole = ROLE.BUYER;
    } else if (pathname.startsWith("/traveler")) {
      requiredRole = ROLE.TRAVELER;
    }

    // Check if the user has the required role
    if (
      requiredRole &&
      userInfo.role !== requiredRole &&
      userInfo.role !== ROLE.TRAVELER_AND_BUYER
    ) {
      // Redirect to home page if the user lacks the required role
      return Response.redirect(new URL("/", request.nextUrl.origin), 302);
    }

    // Proceed to the requested route
    return NextResponse.next();
  } catch (error) {
    console.log("Error:", error);
    const originalUrl = request.nextUrl.clone();
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set(
      "redirect",
      originalUrl.pathname + originalUrl.search
    );
    return Response.redirect(loginUrl, 302);
  }
}

export const config = {
  matcher: [
    "/traveler",
    "/traveler/manage-orders",
    "/traveler/receive-payment",
    "/traveler/receive-payment/:orderId",
    "/traveler/select-trip",
    "/traveler/select-trip/accept-orders",
    "/buyer",
    "/buyer/buyer-pay/:orderId",
    "/buyer/buyer-pay/confirmDelivery/:orderId",
    "/buyer/buyer-pay/error",
    "/buyer/buyer-pay/success",
    "/buyer/manage-orders",
    "/negotiate",
  ],
};
