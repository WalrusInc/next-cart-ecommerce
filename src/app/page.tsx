import { ProductCatalog } from "@/components/storefront/product-catalog";
import { ProductSpotlight } from "@/components/storefront/product-spotlight";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getStorefrontData } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getStorefrontData();

  return (
    <StorefrontShell>
      <div className="space-y-6">
        <ProductSpotlight product={data.featuredProduct} />
        <ProductCatalog products={data.products} />
      </div>
    </StorefrontShell>
  );
}
