"use server";

import { API } from './config';
import { parseJsonSafe } from './_utils';

type MpesaInitiatePayload = {
  userId?: string;
  cartId?: string;
  phone: string;
  amount: number | string;
  accountReference?: string;
  transactionDesc?: string;
};

/**
 * Initiate an MPesa STK push by calling the backend endpoint.
 * The backend is expected to perform the Daraja/STK call and return the parsed response.
 */
export async function initiateMpesaPayment(token: string, payload: MpesaInitiatePayload): Promise<any> {
    console.log("initiating mpesa payment",payload)
  const res = await fetch(API.payments_mpesa_initiate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // attempt to get body for debug
    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch (e) {
      /* ignore */
    }
    throw new Error(`Failed to initiate MPesa payment: ${res.status} ${res.statusText} ${bodyText}`);
  }

  const parsed = await parseJsonSafe(res);
  return parsed;
}
