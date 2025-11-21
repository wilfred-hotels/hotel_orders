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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { deliveryFormSchema } from "@/lib/schema/schema";

// 2. Type inferred from schema
type DeliveryFormValues = z.infer<typeof deliveryFormSchema>;

export function DeliveryForm() {
  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      instructions: "",
    },
  });

  const onSubmit = (values: DeliveryFormValues) => {
    console.log("Form values:", values);
    // handle submission here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="w-full text-sm py-5"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm">Delivery Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main St, City, State"
                  {...field}
                  className="w-full text-sm py-5"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm">Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="(555) 123-4567"
                  {...field}
                  className="w-full text-sm py-5"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm">Special Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special delivery instructions..."
                  rows={3}
                  {...field}
                  className="w-full text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 py-2 rounded-lg text-sm transition"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
