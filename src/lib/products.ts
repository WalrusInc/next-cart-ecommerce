import "server-only";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  rating: number;
  brand?: string;
  sku?: string;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
};

export type StorefrontData = {
  products: Product[];
  featuredProduct: Product;
};

const fallbackFeaturedProduct: Product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description: "A volumizing mascara for dramatic lashes.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 7.17,
  stock: 99,
  rating: 4.94,
  brand: "Essence",
  sku: "BEA-ESS-001",
  thumbnail: "/window.svg",
};

const fallbackProducts: Product[] = [
  fallbackFeaturedProduct,
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description: "A compact palette with everyday shades.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 5.5,
    stock: 44,
    rating: 3.28,
    brand: "Glamour Beauty",
    sku: "BEA-EYE-002",
    thumbnail: "/window.svg",
  },
  {
    id: 3,
    title: "Powder Canister",
    description: "Lightweight setting powder in a minimal canister.",
    category: "beauty",
    price: 14.99,
    discountPercentage: 12.14,
    stock: 59,
    rating: 3.82,
    brand: "Velvet Touch",
    sku: "BEA-POW-003",
    thumbnail: "/window.svg",
  },
];

const fallbackSmartphones: Product[] = [
  {
    id: 101,
    title: "iPhone 15 Pro",
    description: "A premium smartphone with a titanium design.",
    category: "smartphones",
    price: 999,
    discountPercentage: 8,
    stock: 36,
    rating: 4.8,
    brand: "Apple",
    sku: "PHN-APL-101",
    thumbnail: "/window.svg",
  },
  {
    id: 102,
    title: "Galaxy S24 Ultra",
    description: "A flagship Android smartphone with a bright display.",
    category: "smartphones",
    price: 1199,
    discountPercentage: 10,
    stock: 24,
    rating: 4.7,
    brand: "Samsung",
    sku: "PHN-SAM-102",
    thumbnail: "/window.svg",
  },
];

const apiUrl = "https://dummyjson.com";

export async function getStorefrontData(): Promise<StorefrontData> {
  const [products, featuredProduct, phoneProducts, smartphoneProducts] =
    await Promise.all([
      getProducts(`${apiUrl}/products?limit=24`, fallbackProducts),
      getProduct(`${apiUrl}/products/1`, fallbackFeaturedProduct),
      getProducts(`${apiUrl}/products/search?q=phone`, fallbackSmartphones),
      getProducts(`${apiUrl}/products/category/smartphones`, fallbackSmartphones),
    ]);

  return {
    products: mergeProducts(products, phoneProducts, smartphoneProducts),
    featuredProduct,
  };
}

export async function getProductById(id: number): Promise<Product | null> {
  const fallbackProduct = [
    ...fallbackProducts,
    ...fallbackSmartphones,
  ].find((product) => product.id === id);

  try {
    const response = await fetch(`${apiUrl}/products/${id}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`DummyJSON returned ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isProduct(data)) {
      throw new Error("DummyJSON returned an unexpected product shape");
    }

    return data;
  } catch {
    return fallbackProduct ?? null;
  }
}

async function getProducts(url: string, fallback: Product[]): Promise<Product[]> {
  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`DummyJSON returned ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isProductsResponse(data)) {
      throw new Error("DummyJSON returned an unexpected product shape");
    }

    return data.products;
  } catch {
    return fallback;
  }
}

async function getProduct(url: string, fallback: Product): Promise<Product> {
  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`DummyJSON returned ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isProduct(data)) {
      throw new Error("DummyJSON returned an unexpected product shape");
    }

    return data;
  } catch {
    return fallback;
  }
}

function mergeProducts(...groups: Product[][]) {
  const products = new Map<number, Product>();

  for (const group of groups) {
    for (const product of group) {
      products.set(product.id, product);
    }
  }

  return [...products.values()];
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  if (!isRecord(value) || !Array.isArray(value.products)) {
    return false;
  }

  return value.products.every(isProduct);
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.category === "string" &&
    typeof value.price === "number" &&
    typeof value.discountPercentage === "number" &&
    typeof value.stock === "number" &&
    typeof value.rating === "number" &&
    typeof value.thumbnail === "string" &&
    (value.brand === undefined || typeof value.brand === "string") &&
    (value.sku === undefined || typeof value.sku === "string")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
