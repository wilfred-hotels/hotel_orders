'use server'

import { fetchAndValidate } from "@/lib/fetch-validate";
import { GuestResponse, guestSchema } from "@/lib/schema/authSchema";

export async function createGuest(): Promise<GuestResponse> {
  return fetchAndValidate<GuestResponse>(
    "/guests",
    guestSchema,
    { method: "POST" }
  );
}