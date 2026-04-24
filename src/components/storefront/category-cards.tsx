import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/products";

type CategoryCardsProps = {
  products: Product[];
};

export function CategoryCards({ products }: CategoryCardsProps) {
  const categories = getCategoryCards(products);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 md:text-2xl">
            Shop by category
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pick a category and browse matching products.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden rounded-full border border-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 sm:inline-flex"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-100/40 ring-1 ring-emerald-50 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-teal-50 via-white to-amber-50">
              {category.image ? (
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-contain p-5 transition group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-3">
              <h3 className="truncate text-sm font-semibold text-slate-950">
                {formatLabel(category.name)}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {category.count} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function getCategoryCards(products: Product[]) {
  const categories = new Map<string, { count: number; image?: string; name: string }>();

  for (const product of products) {
    const category = categories.get(product.category);

    categories.set(product.category, {
      count: (category?.count ?? 0) + 1,
      image: category?.image ?? product.thumbnail,
      name: product.category,
    });
  }

  return [...categories.values()].toSorted((first, second) =>
    first.name.localeCompare(second.name)
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
