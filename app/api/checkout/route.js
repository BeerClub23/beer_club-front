// import type {NextApiRequest, NextApiResponse} from 'next';
// import {CheckoutInput} from "dh-marvel/features/checkout/checkout.types";
import { NextResponse } from "next/server";
// const serverError = "error";
const invalidAddress = "invalid";
const validCard = "4242424242424242";
const withoutFundsCard = "5454545454545454";
const withoutAuthorizationCard = "6161616161616161";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Metodo no permitido" },
      { status: 405 },
    );
  }
  try {
    const body = await req.json();
    if (body.street === invalidAddress) {
      return NextResponse.json(
        { message: "La dirección no es correcta" },
        { status: 400 },
      );
    }
    if (body.cardNumber === withoutFundsCard) {
      return NextResponse.json(
        {
          message:
            "Los fondos son insuficientes, por favor contáctese con su banco.",
        },
        { status: 400 },
      );
    }
    if (body.cardNumber == withoutAuthorizationCard) {
      return NextResponse.json(
        {
          message:
            "La tarjeta no se encuentra autorizada, por favor contáctese con su banco.",
        },
        { status: 400 },
      );
    }
    if (body.cardNumber === validCard) {
      // res.setHeader("Set-Cookie", 'Access=true; path=/confirmacion-compra; samesite=lax; httponly; expires=0;')
      /*  res.status(200).json({data: body});
            return*/
      // redirect('http://localhost:3000/congratulations')
      return NextResponse.json(
        {
          message: "Respuesta exitosa.",
          invoiceNumber: " 0001-00000001",
          amount: "200",
          cardNumber: "",
          description: "",
        },
        {
          status: 200,
        },
      );
    }
    return NextResponse.json(
      { message: "Los datos de la tarjeta son incorrectos" },
      {
        status: 400,
      },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error server, intente nuevamente en unos minutos..." },
      {
        status: 500,
      },
    );
  }
}
