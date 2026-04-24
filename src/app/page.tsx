import { CategoryCards } from "@/components/storefront/category-cards";
import { HomeAdvertisement } from "@/components/storefront/home-advertisement";
import { ProductSpotlight } from "@/components/storefront/product-spotlight";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { getStorefrontData } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getStorefrontData();

  return (
    <StorefrontShell>
      <div className="space-y-6">
        <HomeAdvertisement products={data.products} />
        <ProductSpotlight product={data.featuredProduct} />
        <CategoryCards products={data.products} />
      </div>
    </StorefrontShell>
  );
}
