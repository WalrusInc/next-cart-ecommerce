"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  DesktopCatalogFilters,
  MobileCatalogFilters,
  type SortValue,
} from "@/components/storefront/catalog-filter-controls";
import { ProductCard } from "@/components/storefront/product-card";
import type { Product } from "@/lib/products";

type ProductCatalogProps = {
  initialCategory?: string;
  products: Product[];
};

export function ProductCatalog({ initialCategory = "all", products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortValue>("featured");

  const categories = useMemo(() => getCategoryCards(products), [products]);
  const categoryOptions = useMemo(
    () => ["all", ...categories.map((item) => item.name)],
    [categories]
  );
  const selectedCategory = categoryOptions.includes(category) ? category : "all";

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const visibleProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.brand?.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    return visibleProducts.toSorted((first, second) => {
      const firstOut = Number(first.stock) <= 0;
      const secondOut = Number(second.stock) <= 0;

      if (firstOut && !secondOut) return 1;
      if (!firstOut && secondOut) return -1;
      switch (sort) {
        case "price-low":
          return first.price - second.price;
        case "price-high":
          return second.price - first.price;
        case "rating":
          return second.rating - first.rating;
        case "featured":
          return second.discountPercentage - first.discountPercentage;
      }
    });
  }, [products, query, selectedCategory, sort]);

  const hasActiveFilters =
    query.length > 0 || selectedCategory !== "all" || sort !== "featured";

  return (
    <section className="space-y-4">
      <div className="sticky top-16 z-10 space-y-2 rounded-2xl border border-white/80 bg-white px-3 py-2 shadow-sm shadow-emerald-100/60 md:px-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Shop by category
            </h2>
            <p className="hidden text-xs text-slate-500 sm:block">
              Phones, beauty products, and more in one catalog.
            </p>
          </div>
          <div className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 md:block">
            Free delivery over $50
          </div>
          <MobileCatalogFilters
            category={selectedCategory}
            categoryOptions={categoryOptions}
            hasActiveFilters={hasActiveFilters}
            query={query}
            setCategory={setCategory}
            setQuery={setQuery}
            setSort={setSort}
            sort={sort}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryCard
            active={selectedCategory === "all"}
            count={products.length}
            image={products[0]?.thumbnail}
            label="All products"
            onClick={() => setCategory("all")}
          />
          {categories.map((item) => (
            <CategoryCard
              key={item.name}
              active={selectedCategory === item.name}
              count={item.count}
              image={item.image}
              label={formatLabel(item.name)}
              onClick={() => setCategory(item.name)}
            />
          ))}
        </div>

        <DesktopCatalogFilters
          category={selectedCategory}
          categoryOptions={categoryOptions}
          hasActiveFilters={hasActiveFilters}
          query={query}
          setCategory={setCategory}
          setQuery={setQuery}
          setSort={setSort}
          sort={sort}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-950 md:text-2xl">
            Today&apos;s picks
          </h1>
          <p className="text-sm text-slate-500">
            {filteredProducts.length} products available
          </p>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/80 bg-white/80 p-10 text-center shadow-sm">
          <p className="font-medium">No products found</p>
          <p className="mt-1 text-sm text-neutral-500">
            Try a different keyword or category.
          </p>
        </div>
      )}
    </section>
  );
}

function CategoryCard({
  active,
  count,
  image,
  label,
  onClick,
}: {
  active: boolean;
  count: number;
  image: string | undefined;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid mt-2 mb-2 min-w-[150px] grid-cols-[34px_1fr] items-center gap-2 rounded-full border bg-white/90 p-2 pr-3 text-left transition hover:border-teal-300 hover:shadow-sm md:min-w-[164px] ${
        active
          ? "border-teal-400 bg-teal-50 shadow-sm ring-2 ring-teal-100"
          : "border-white ring-1 ring-emerald-100/80"
      }`}
    >
      <span className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-teal-100 to-amber-100">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="32px"
            className="object-contain p-1"
          />
        ) : null}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-medium text-slate-950">
          {label}
        </span>
        <span className="text-xs text-slate-500">{count} items</span>
      </span>
    </button>
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
