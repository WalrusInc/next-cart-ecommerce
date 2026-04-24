import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck } from "lucide-react";

import { ProductDetailActions } from "@/components/storefront/product-detail-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getProductById } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <StorefrontShell>
      <div className="mb-4">
        <Button asChild variant="ghost" className="rounded-full">
          <Link href="/products">Back to products</Link>
        </Button>
      </div>

      <section className="grid gap-6 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] md:p-6">
        <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-teal-50 via-white to-amber-50">
          {product.stock <= 0 ? (
            <Badge variant="destructive" className="absolute left-4 top-4 z-10">
              Out of stock
            </Badge>
          ) : null}
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-8"
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="text-sm font-medium capitalize text-emerald-700">
              {product.brand ?? product.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {product.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)} rating
            </span>
            <span className="inline-flex items-center gap-1">
              <Truck className="size-4 text-teal-600" />
              Fast delivery
            </span>
            <span>{product.stock} left</span>
          </div>

          <div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-semibold text-[#f43f5e]">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage >= 1 ? (
                <span className="text-sm text-neutral-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              ) : null}
            </div>
            {product.discountPercentage >= 1 ? (
              <p className="mt-1 text-sm font-medium text-amber-700">
                {Math.round(product.discountPercentage)}% off
              </p>
            ) : null}
          </div>

          <ProductDetailActions product={product} />
        </div>
      </section>
    </StorefrontShell>
  );
}
