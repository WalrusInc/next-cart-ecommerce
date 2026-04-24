import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

type HomeAdvertisementProps = {
  products: Product[];
};

export function HomeAdvertisement({ products }: HomeAdvertisementProps) {
  const heroProducts = products.slice(0, 3);
  const leadProduct = heroProducts[0];

  return (
    <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl shadow-emerald-100">
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] md:p-8 lg:p-10">
        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100 ring-1 ring-white/15">
            <Sparkles className="size-3.5 text-amber-300" />
            Big online deals
          </div>

          <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
            Shop fresh finds, fast deals, and daily essentials.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
            Discover beauty, phones, home picks, and trending products in one
            simple ecommerce store.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-emerald-500 px-5 text-slate-950 hover:bg-emerald-400"
            >
              <Link href="/products">
                <ShoppingBag className="size-4" />
                Shop now
              </Link>
            </Button>
            {leadProduct ? (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={`/products/${leadProduct.id}`}>Today&apos;s deal</Link>
              </Button>
            ) : null}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-slate-300 sm:flex sm:flex-wrap">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4 text-emerald-300" />
              Fast delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-sky-300" />
              Buyer protection
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-amber-300" />
              New deals daily
            </span>
          </div>
        </div>

        <div className="relative min-h-[260px] md:min-h-[360px]">
          <div className="absolute inset-x-4 bottom-4 top-8 rounded-[2rem] bg-white/10 ring-1 ring-white/15" />
          {heroProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`absolute block overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1 ${
                index === 0
                  ? "left-0 top-3 h-44 w-40 md:h-60 md:w-56"
                  : index === 1
                    ? "right-0 top-14 h-36 w-32 md:h-48 md:w-44"
                    : "bottom-0 left-20 h-32 w-36 md:left-28 md:h-44 md:w-48"
              }`}
              aria-label={`View ${product.title}`}
            >
              <div className="relative h-full w-full bg-gradient-to-br from-white via-teal-50 to-amber-50">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(min-width: 768px) 240px, 160px"
                  className="object-contain p-4"
                  priority={index === 0}
                />
              </div>
            </Link>
          ))}
          <div className="absolute right-4 bottom-4 rounded-2xl bg-[#f43f5e] px-4 py-3 text-sm font-semibold shadow-lg">
            Up to 50% off
          </div>
        </div>
      </div>
    </section>
  );
}
