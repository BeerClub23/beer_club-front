import { NextResponse } from "next/server";

export async function POST(token) {
  const response = NextResponse.json({ token: token });
  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    maxAge: 60 * 60,
  });
  return response;
  // return NextResponse.json(
  //   { message: "no puede ingresar, no esta registrado" },
  //   { status: 401 },
  // );

  // return NextResponse.json(
  //   { message: "no se pudo ingresar, intentelo mas tarde" },
  //   { status: 500 },
  // );
}
