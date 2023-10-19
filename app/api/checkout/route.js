// import type {NextApiRequest, NextApiResponse} from 'next';
// import {CheckoutInput} from "dh-marvel/features/checkout/checkout.types";

import { redirect } from "next/dist/server/api-utils";
import {
    ERROR_CARD_DATA_INCORRECT,
    ERROR_CARD_WITHOUT_AUTHORIZATION,
    ERROR_CARD_WITHOUT_FUNDS,
    ERROR_INCORRECT_ADDRESS,
    ERROR_METHOD_NOT_ALLOWED,
    ERROR_SERVER
} from "../../services/checkout/checkout.errors";


const serverError = 'error'
export const invalidAddress = 'invalid'
export const validCard = '4242424242424242';
export const withoutFundsCard = '4111 4111 4111 4111'.replaceAll(" ", "");
export const withoutAuthorizationCard = '4000 4000 4000 4000'.replaceAll(" ", "");

export async function POST(req, res) {         
        // const body = await req.json();       
        // console.log(body);
        // return new Response(JSON.stringify({ message: 'Respuesta exitosa' }))         
        
       
    if (req.method !== "POST") {
        res.status(405).json(ERROR_METHOD_NOT_ALLOWED);
        return;
    }
    try {
        const body = await req.json();       
        
        
        if (body.address.address1 === invalidAddress) {
            return new Response(JSON.stringify(ERROR_INCORRECT_ADDRESS),  {
                status: 400,
              })
            // res.status(400).json(ERROR_INCORRECT_ADDRESS);
            return
        }
        if (body.card.number === withoutFundsCard) {
            // res.status(400).json(ERROR_CARD_WITHOUT_FUNDS);
            // return
            return new Response(JSON.stringify(ERROR_CARD_WITHOUT_FUNDS,{
                status: 400,
              }))
        }
        if (body.card.number === withoutAuthorizationCard) {
            // res.status(400).json(ERROR_CARD_WITHOUT_AUTHORIZATION);
            // return
            return new Response(JSON.stringify(ERROR_CARD_WITHOUT_AUTHORIZATION,{
                status: 400,
              }))
        }
        if (body.card.number === validCard) {
            // res.setHeader("Set-Cookie", 'Access=true; path=/confirmacion-compra; samesite=lax; httponly; expires=0;')   
          /*  res.status(200).json({data: body});
            return*/
            // redirect('http://localhost:3000/congratulations')
            return new Response(JSON.stringify({ message: 'Respuesta exitosa' },{
                status: 400,
              }))
        }
         return new Response(JSON.stringify(ERROR_CARD_DATA_INCORRECT,  {
            status: 400,
          }))
        //  res.status(400).json(ERROR_CARD_DATA_INCORRECT);*/
    } 
    catch (err) {
        return new Response(JSON.stringify(ERROR_SERVER,  {
            status: 500,
          }))
        // res.status(500).json(ERROR_SERVER);
    }

}