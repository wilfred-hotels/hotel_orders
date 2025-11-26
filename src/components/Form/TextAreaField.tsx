import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface TextAreaProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
}

export default function TextAreaField<
  TFieldValues extends FieldValues = FieldValues
>({ name, label, placeholder }: TextAreaProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="py-5 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:border-transparent"
            />
          </FormControl>
          <FormMessage className="text-red-400 text-xs" />
        </FormItem>
      )}
    />
  );
}
