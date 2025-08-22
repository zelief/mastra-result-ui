import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { tmAPIProductDetail } from "@/types/tm-api-1688-product-details";
import {
  TMAPIAlibabaData,
  TMAPIAlibabaSku,
} from "@/types/tm-api-alibaba-product-details";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Mastra API URL from environment variable
export function getMastraApiUrl(): string {
  return process.env.NEXT_PUBLIC_MASTRA_API_URL || "http://localhost:4111";
}

// Get backend URL from environment variable
export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4111";
}

// Fetch product details from the API
export async function fetchProductDetails(
  itemId: number,
  platformId: number
): Promise<tmAPIProductDetail | TMAPIAlibabaData | null> {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(
      `${backendUrl}/v1/product/scrape-product-details?item_id=${itemId}&platform_id=${platformId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

// Get images for 1688 platform SKU
export function getImagesForSku(propsIds: string, skuProps: any[]): string[] {
  const images: string[] = [];

  if (!propsIds || !skuProps) {
    return images;
  }

  const propPairs = propsIds.split(";");

  propPairs.forEach((pair) => {
    const [pid, vid] = pair.split(":");
    const prop = skuProps.find((p: any) => p.pid === pid);

    if (prop) {
      const value = prop.values.find((v: any) => v.vid === vid);
      if (value?.imageUrl) {
        images.push(value.imageUrl);
      }
    }
  });

  return images;
}

// Get images for Alibaba platform SKU
export function getAlibabaSkuImages(
  sku: any,
  productData: TMAPIAlibabaData
): string[] {
  return sku.props_ids
    ? sku.props_ids
        .split(";")
        .map((propIdPair: string) => {
          const [pid, vid] = propIdPair.split(":");
          const prop = (productData.sku_props || []).find((p) => p.pid === pid);
          if (prop) {
            const value = prop.values.find((v) => v.vid === vid);
            return value?.imageUrl || "";
          }
          return "";
        })
        .filter((url: string) => url !== "")
    : [];
}

// Get all images for a product (SKU images first, then product images)
export function getAllProductImages(
  productData: tmAPIProductDetail | TMAPIAlibabaData | null,
  platformId: number
): string[] {
  if (!productData) return [];

  const images: string[] = [];

  // Add SKU images first
  if (platformId === 1 && "skus" in productData) {
    // 1688 platform
    const skuImages =
      productData.skus?.flatMap((sku) =>
        getImagesForSku(sku.props_ids, productData.sku_props || [])
      ) || [];
    images.push(...skuImages);
  } else if (platformId === 2 && "skus" in productData) {
    // Alibaba platform
    const skuImages =
      productData.skus?.flatMap((sku) =>
        getAlibabaSkuImages(sku, productData as TMAPIAlibabaData)
      ) || [];
    images.push(...skuImages);
  }

  // Add product images if no SKU images or as fallback
  if (images.length === 0 && "main_imgs" in productData) {
    images.push(...(productData.main_imgs || []));
  }

  // Remove duplicates and empty strings
  return [...new Set(images.filter((img) => img && img.trim() !== ""))];
}
