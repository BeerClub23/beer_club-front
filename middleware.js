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

    if (new Date().getTime() > decodeToken.expires) {
      request.cookies.delete("jwt");
      url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    } 
  } else if (request.nextUrl.pathname.includes("user") || request.nextUrl.pathname.includes("admin")) {
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
  // let cookieJwt = await request.cookies.get("jwt");
  // let cookieAgeCheck = await request.cookies.get("AgeCheck");
  // if (request.url.includes("/")) {
  //   if (cookieJwt || cookieAgeCheck) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/home";
  //     return NextResponse.redirect(url);
  //   }
  // }
  // if (request.url.includes("/home")) {
  //   if (cookieJwt || cookieAgeCheck) {
  //     return NextResponse.next();
  //   } else {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  // }

  // Chequeo de si esta logueado
  // let cookie = await request.cookies.get("jwt");
  // if (!cookie) {
  //   // const requestPage = request.nextUrl.pathname;
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/login";
  //   // url.search = `p=${requestPage}`;
  //   return NextResponse.redirect(url);
  // }
  //return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/login", "/registro", "/planes", "/user/(.*)"],
  // matcher: ["/registro", "/planes/:path*"],
};
