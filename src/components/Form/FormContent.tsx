"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { deliveryFormSchema } from "@/lib/schema/schema";
import { z } from "zod";

type FormValues = z.infer<typeof deliveryFormSchema>;

interface FormContentProps {
  children: React.ReactNode;
  onSubmit: (values: FormValues) => Promise<void> | void;
}

export default function FormContent({ children, onSubmit }: FormContentProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      instructions: "",
      method: "mpesa",
      cardNumber: "",
      mobileAmount: "",
    },
  });

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {children}
        </form>
      </FormProvider>
    </Form>
  );
}
