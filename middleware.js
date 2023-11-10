import { NextResponse } from "next/server";

export async function middleware(request) {
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
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home"],
  // matcher: ["/registro", "/planes/:path*"],
};
