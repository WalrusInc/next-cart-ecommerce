"use client";

import Image from "next/image";
import { ShieldCheck, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";

type ProductSpotlightProps = {
  product: Product;
};

export function ProductSpotlight({ product }: ProductSpotlightProps) {
  const { addToCart } = useCart();
  return (
    <section className="grid grid-cols-[1fr_112px] gap-3 overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-emerald-100/70 ring-1 ring-emerald-100/80 backdrop-blur md:grid-cols-[1fr_340px] md:gap-4 md:p-5">
      <div className="flex min-w-0 flex-col justify-center gap-2 md:gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-teal-600 md:text-sm">
            Featured deal
          </p>
          <h1 className="mt-1 line-clamp-2 max-w-2xl text-base font-semibold leading-snug text-slate-950 md:mt-2 md:text-4xl md:leading-tight">
            {product.title}
          </h1>
          <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-neutral-600 md:block">
            {product.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 md:gap-3 md:text-sm">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3 fill-amber-400 text-amber-400 md:size-4" />
            {product.rating.toFixed(1)} rating
          </span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <Truck className="size-4 text-teal-600" />
            Fast delivery
          </span>
          <span className="hidden items-center gap-1 md:inline-flex">
            <ShieldCheck className="size-4 text-sky-600" />
            Buyer protection
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-2 md:gap-3">
          <span className="text-xl font-semibold text-[#f43f5e] md:text-3xl">
            ${product.price.toFixed(2)}
          </span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 md:px-3 md:py-1 md:text-sm">
            {Math.round(product.discountPercentage)}% off
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => addToCart(product)}
            size="sm"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 md:h-8"
          >
            Add to cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden rounded-full border-emerald-100 bg-white/80 hover:bg-emerald-50 md:inline-flex"
          >
            Buy now
          </Button>
        </div>
      </div>

      <div className="relative aspect-square self-center rounded-2xl bg-gradient-to-br from-teal-100 via-white to-amber-100 ring-1 ring-white/80">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority
          sizes="(min-width: 768px) 340px, 112px"
          className="object-contain p-3 md:p-8"
        />
      </div>
    </section>
  );
}
