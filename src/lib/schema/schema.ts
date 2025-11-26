import z from "zod";

export const deliveryFormSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  address: z.string().min(5, "Delivery Address is required"),
  phone: z
    .string()
    .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Invalid phone number"),
  instructions: z.string().optional(),

  method: z.enum(["mpesa", "airtel", "card", "cod"]),
  cardNumber: z.string().optional(),
  mobileAmount: z.string().optional(),
});
