"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addToCart } = useCart();

  return (
    <Button
      disabled={product.stock <= 0}
      onClick={() => addToCart(product)}
      className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
    >
      <ShoppingCart className="size-4" />
      {product.stock > 0 ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
