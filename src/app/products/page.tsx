import { ProductCatalog } from "@/components/storefront/product-catalog";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getStorefrontData } from "@/lib/products";

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const data = await getStorefrontData();

  return (
    <StorefrontShell>
      <ProductCatalog
        key={category ?? "all"}
        initialCategory={category ?? "all"}
        products={data.products}
      />
    </StorefrontShell>
  );
}
