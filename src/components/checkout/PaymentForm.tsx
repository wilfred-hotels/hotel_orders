"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { CreditCard, DollarSign } from "lucide-react";
import { paymentSchema } from "@/lib/schema/schema";

type PaymentFormValues = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: "credit", cardNumber: "", mobileAmount: "" },
  });

  const method = form.watch("method");

  const onSubmit = (values: PaymentFormValues) => {
    console.log("Payment data:", values);
    alert(`Payment method: ${values.method}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* Payment Method */}
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm font-medium mb-2">
                Payment Method
              </FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-2"
                >
                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <RadioGroupItem value="credit" />
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span>Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <RadioGroupItem value="mobileMoney" />
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span>Mobile Money</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <RadioGroupItem value="cod" />
                    <span>Cash on Delivery</span>
                  </label>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Conditional Inputs */}
        {method === "credit" && (
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    {...field}
                    className="w-full text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}

        {method === "mobileMoney" && (
          <FormField
            control={form.control}
            name="mobileAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">Amount to Pay</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    {...field}
                    className="w-full text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm transition"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
