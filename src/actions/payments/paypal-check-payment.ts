'use server';

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";



export const paypalCheckPayment = async(paypalTransactionId: string) => {
    //console.log('paypalTransactionId',paypalTransactionId);
    const authToken = await getPayPalBearerToken();
    console.log('authToken', {authToken});

    if(!authToken){
        return {
            ok:false,
            message: "Verification-Token couldn't be obtained"
        }
    }

    const verifyPayment = await verifyPayPalPayment(paypalTransactionId, authToken);

    if(!verifyPayment){
        return {
            ok: false,
            message: 'Error verifying payment'
        }
    }

    const {status, purchase_units} = verifyPayment;
    console.log({status, purchase_units})
    //const {} = purchase_units[0];

    if (status !== 'COMPLETED'){
        return {
            ok:false,
            message: `${paypalTransactionId}-Order: No payment has yet been made on PayPal`
        }
    }
    //update in db
    try{
        //console.log({status, purchase_units})

        await prisma.order.update({
            where: {id: '607a0d1d-fad2-4f60-8ce9-97a1aab3aa94'},
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        })
        // revalidate a path for reconstruction of component

    }catch(error){
        console.log(error);
        return {
            ok: false,
            message:"500 - Payment couldn't be updated"
        }
    }

}

const getPayPalBearerToken = async() :Promise<string | null> => {

    const PAYPAL_CLIENT_ID= process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET_KEY= process.env.PAYPAL_SECRET_KEY;
    const PAYPAL_OAUTH_URL= process.env.PAYPAL_OAUTH_URL ?? '';
    

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
        "utf-8"
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
        "Authorization",
        `Basic ${base64Token}`
    );
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try{
        const result = await fetch(`${PAYPAL_OAUTH_URL}`, {
            ...requestOptions,
            cache: 'no-store',
        }).then( resp => resp.json())

        const {access_token} = result;

        return access_token;
        
    }catch(error){
        console.log(error)
        return null;
    }

}

const verifyPayPalPayment = async(paypalTransactionId: string, bearerToken: string) : Promise<PayPalOrderStatusResponse | null> => {

    const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${bearerToken}`
    );

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try{
        const result = await fetch(PAYPAL_ORDERS_URL, {
            ...requestOptions,
            cache:'no-store',
        }).then( resp => resp.json())
        console.log('resultVerifyPayment', result)
        return result;
        
    }catch(error){
        console.log(error)
        return null;
    }

}