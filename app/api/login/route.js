import { NextResponse } from "next/server";

export async function POST() {
  // return NextResponse.json({ token: "iagdhagdhgahjdghjagdshjgd" });

  return NextResponse.json(
    { message: "no puede ingresar, no esta registrado" },
    { status: 401 },
  );

  // return NextResponse.json(
  //   { message: "no se pudo ingresar, intentelo mas tarde" },
  //   { status: 500 },
  // );
}
