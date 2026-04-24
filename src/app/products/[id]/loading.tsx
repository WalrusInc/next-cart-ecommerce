import { StorefrontShell } from "@/components/storefront/storefront-shell";

export default function LoadingProductPage() {
  return (
    <StorefrontShell>
      <div className="grid gap-6 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] md:p-6">
        <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />
        <div className="flex flex-col justify-center gap-4">
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-100" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-neutral-100" />
          <div className="h-20 animate-pulse rounded bg-neutral-100" />
          <div className="h-10 w-36 animate-pulse rounded bg-neutral-100" />
          <div className="h-10 w-40 animate-pulse rounded-full bg-neutral-100" />
        </div>
      </div>
    </StorefrontShell>
  );
}
