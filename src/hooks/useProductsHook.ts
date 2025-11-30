"use client";


import { getProducts } from "@/actions/products";
import { Product } from "@/actions/types";
import { useQuery } from "@tanstack/react-query";

export function useProduct() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
