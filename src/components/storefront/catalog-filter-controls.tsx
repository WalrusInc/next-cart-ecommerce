"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type SortValue = "featured" | "price-low" | "price-high" | "rating";

type CatalogFilterControlsProps = {
  category: string;
  categoryOptions: string[];
  hasActiveFilters: boolean;
  query: string;
  setCategory: (value: string) => void;
  setQuery: (value: string) => void;
  setSort: (value: SortValue) => void;
  sort: SortValue;
};

export function DesktopCatalogFilters(props: CatalogFilterControlsProps) {
  return (
    <div className="hidden rounded-2xl border border-white bg-white/95 p-2 shadow-sm ring-1 ring-emerald-100/80 lg:block">
      <FilterFields {...props} layout="desktop" />
    </div>
  );
}

export function MobileCatalogFilters(props: CatalogFilterControlsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-teal-100 bg-white text-teal-700 shadow-sm hover:bg-teal-50 lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          <span className="sr-only">Open filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl border-emerald-100 bg-[#f7fffb]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Search, sort, and narrow the product list.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <FilterFields {...props} layout="mobile" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FilterFields({
  category,
  categoryOptions,
  hasActiveFilters,
  layout,
  query,
  setCategory,
  setQuery,
  setSort,
  sort,
}: CatalogFilterControlsProps & { layout: "desktop" | "mobile" }) {
  return (
    <div
      className={
        layout === "desktop"
          ? "grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]"
          : "grid gap-3"
      }
    >
      <Input
        aria-label="Search products"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
        className="h-9 rounded-full border-emerald-100 bg-white focus-visible:ring-teal-200"
      />

      <select
        aria-label="Filter by category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="h-9 rounded-full border border-emerald-100 bg-white px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-teal-200"
      >
        {categoryOptions.map((item) => (
          <option key={item} value={item}>
            {item === "all" ? "All categories" : formatLabel(item)}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort products"
        value={sort}
        onChange={(event) => setSort(event.target.value as SortValue)}
        className="h-9 rounded-full border border-emerald-100 bg-white px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-teal-200"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to high</option>
        <option value="price-high">Price: High to low</option>
        <option value="rating">Top rated</option>
      </select>

      <Button
        variant="outline"
        className="h-9 rounded-full border-emerald-100 bg-white hover:bg-teal-50"
        disabled={!hasActiveFilters}
        onClick={() => {
          setQuery("");
          setCategory("all");
          setSort("featured");
        }}
      >
        {hasActiveFilters ? (
          <X className="size-4" />
        ) : (
          <SlidersHorizontal className="size-4" />
        )}
        Reset
      </Button>
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
