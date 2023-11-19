import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request) {
  let url;
  const ageCheckLocal = request.cookies.has("AgeCheck");
  const ageCheckSession = request.cookies.has("AgeCheck");
  const isAuthorized = request.cookies.has("jwt");

  if (isAuthorized) {
    const token = request.cookies.get("jwt");
    const decodeToken = jwtDecode(token.value.toString());

    console.log(decodeToken);

    if (new Date().getTime() > decodeToken.exp * 1000) {
      console.log("delete cookie");
      request.cookies.delete("jwt"); // No funciona
      url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (
      request.nextUrl.pathname.includes("admin") &&
      decodeToken.role != "ROLE_ADMIN"
    ) {
      url = request.nextUrl.clone();
      url.pathname = "/user";
      return NextResponse.redirect(url);
    }
    if (
      request.nextUrl.pathname.includes("user") &&
      decodeToken.role == "ROLE_ADMIN"
    ) {
      url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  } else if (
    request.nextUrl.pathname.includes("user") ||
    request.nextUrl.pathname.includes("admin")
  ) {
    url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (!(ageCheckLocal || ageCheckSession) && request.nextUrl.pathname !== "/") {
    url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  switch (true) {
    case (ageCheckLocal || ageCheckSession) && request.nextUrl.pathname === "/":
      url = request.nextUrl.clone();
      url.pathname = "/home";
      return NextResponse.redirect(url);
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/login",
    "/registro",
    "/planes",
    "/user/(.*)",
    "/admin/(.*)",
  ],
};
