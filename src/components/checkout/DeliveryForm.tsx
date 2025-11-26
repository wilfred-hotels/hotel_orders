import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { deliveryFormSchema } from "@/lib/schema/schema";
import FormContent from "../Form/FormContent";
import InputField from "../Form/InputField";
import TextAreaField from "../Form/TextAreaField";

type FormValues = z.infer<typeof deliveryFormSchema>;

const paymentOptions = [
  { id: "mpesa", label: "MPESA" },
  { id: "airtel", label: "Airtel Money" },
  { id: "card", label: "Visa / Mastercard" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function CheckoutForm() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    "mpesa" | "airtel" | "card" | "cod"
  >("mpesa");

  const handleSubmit = (values: FormValues) => {
    console.log("Form submission:", values);
    alert(`Payment method: ${selectedPaymentMethod}`);
  };

  return (
    <FormContent onSubmit={handleSubmit}>
      <div className="space-y-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Delivery Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="fullName"
            label="Full Name *"
            placeholder="John Doe"
          />
          <InputField
            name="phone"
            label="Phone Number *"
            placeholder="07XX XXX XXX"
          />
        </div>

        <InputField
          name="address"
          label="Delivery Address *"
          placeholder="123 Main St, City"
        />
        <TextAreaField
          name="instructions"
          label="Delivery Instructions"
          placeholder="Any special instructions..."
        />
      </div>

      <div className="space-y-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Payment Method
        </h2>

        <div className="flex flex-wrap gap-4">
          {paymentOptions.map((method) => (
            <div
              key={method.id}
              className={`flex-1 p-3 sm:p-4  rounded-lg border text-center cursor-pointer text-sm sm:text-base  transition-all ${
                selectedPaymentMethod === method.id
                  ? "border-[#FF5722] bg-[#FF5722]/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPaymentMethod(method.id as any)}
            >
              {method.label}
            </div>
          ))}
        </div>

        {selectedPaymentMethod === "mpesa" && (
          <InputField
            name="mobileAmount"
            label="Enter phone number (MPESA)"
            placeholder="0700xxxxxxx"
          />
        )}

        {selectedPaymentMethod === "airtel" && (
          <InputField
            name="mobileAmount"
            label="Enter phone number (Airtel Money)"
            placeholder="0700xxxxxxx"
          />
        )}

        {selectedPaymentMethod === "card" && (
          <InputField
            name="cardNumber"
            label="Card Number"
            placeholder="1234 5678 9012 3456"
          />
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg bg-orange-600 hover:bg-orange-700"
      >
        Complete Order
      </Button>
    </FormContent>
  );
}
