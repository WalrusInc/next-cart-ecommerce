import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const { addToCart } = useCart();
  console.log('product', product);
  console.log('discount', product.discountPercentage);
  console.log('discount type:', typeof product.discountPercentage);
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-sm shadow-emerald-100/50 ring-1 ring-emerald-100/70 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/80">
      <div className="relative aspect-square bg-gradient-to-br from-teal-50 via-white to-amber-50">
        {product.stock === 0 && (
          <Badge
            variant="destructive"
            className="absolute left-2 bottom-2 rounded-md text-[10px] px-2 py-1"
          >
            Out of stock
          </Badge>
        )}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 220px, (min-width: 768px) 25vw, 50vw"
          className="object-contain p-4 transition group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-sm ring-1 ring-white transition hover:text-teal-600"
        >
          <Heart className="size-4" />
        </button>
        {Number(product.discountPercentage) >= 1 ? (
          <span className="absolute left-2 top-2 rounded-full bg-[#f43f5e] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            -{Math.round(Number(product.discountPercentage))}%
          </span>
        ) : null}
      </div>

      <div className="space-y-3 p-3.5">
        <div className="min-h-12">
          <p className="line-clamp-2 text-sm font-medium leading-6">
            {product.title}
          </p>
          <p className="mt-1 truncate text-xs capitalize text-neutral-500">
            {product.brand ?? product.category}
          </p>
        </div>

        <div>
          <div className="flex items-end gap-2">
            <span className="text-lg font-semibold text-[#f43f5e]">
              ${product.price.toFixed(2)}
            </span>
            {Number(product.discountPercentage) >= 1 && (
              <span className="text-xs text-neutral-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
            <span>{product.stock} left</span>
          </div>
        </div>
        {
          Number(product.stock) > 0 ? (
            <Button
              onClick={() => addToCart(product)}
              className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="sm"
            >
              <ShoppingCart className="size-4" />
              Add to cart
            </Button>
          ) : (
            <Button
              disabled
              className="w-full cursor-not-allowed rounded-full bg-neutral-300 text-neutral-500"
              size="sm"
            >
              Out of stock
            </Button>
          )
        }
      </div>
    </article>
  );
}
