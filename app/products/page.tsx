"use client";

import { useEffect, useState } from "react";
import { searchResult } from "@/data/search-result";
import { fetchProductDetails, getAllProductImages } from "@/lib/utils";
import { tmAPIProductDetail } from "@/types/tm-api-1688-product-details";
import { TMAPIAlibabaData } from "@/types/tm-api-alibaba-product-details";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductWithDetails {
  item_id: string;
  platform_id: string;
  details: tmAPIProductDetail | TMAPIAlibabaData | null;
  loading: boolean;
  error?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);

  useEffect(() => {
    const initializeProducts = () => {
      const initialProducts = searchResult.map((item) => ({
        item_id: item.item_id,
        platform_id: item.platform_id,
        details: null,
        loading: true,
      }));
      setProducts(initialProducts);
    };

    const fetchAllProducts = async () => {
      const updatedProducts = await Promise.all(
        searchResult.map(async (item) => {
          try {
            const details = await fetchProductDetails(
              parseInt(item.item_id),
              parseInt(item.platform_id)
            );
            return {
              item_id: item.item_id,
              platform_id: item.platform_id,
              details,
              loading: false,
            };
          } catch {
            return {
              item_id: item.item_id,
              platform_id: item.platform_id,
              details: null,
              loading: false,
              error: "Failed to load product",
            };
          }
        })
      );
      setProducts(updatedProducts);
    };

    initializeProducts();
    fetchAllProducts();
  }, []);

  const renderProductProperties = (
    product: tmAPIProductDetail | TMAPIAlibabaData
  ) => {
    if ("product_props" in product && product.product_props) {
      // Alibaba format
      if (Array.isArray(product.product_props)) {
        return product.product_props.map((prop, index) => (
          <div key={index} className="text-xs text-gray-600">
            <span className="font-medium">{prop.key}:</span> {prop.value}
          </div>
        ));
      }
    }
    return null;
  };

  const renderCategories = (product: tmAPIProductDetail | TMAPIAlibabaData) => {
    if ("category_path" in product && product.category_path) {
      // Alibaba format
      return (
        <div className="text-xs text-blue-600">
          {product.category_path.map((cat) => cat.name).join(" > ")}
        </div>
      );
    }
    return null;
  };

  const getProductImages = (
    product: tmAPIProductDetail | TMAPIAlibabaData,
    platformId: number
  ) => {
    return getAllProductImages(product, platformId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Search Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.item_id} className="h-full">
            <CardHeader className="pb-4">
              {product.loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ) : product.error ? (
                <CardTitle className="text-red-500 text-sm">
                  {product.error}
                </CardTitle>
              ) : product.details ? (
                <>
                  <CardTitle className="text-sm">
                    {product.details.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    ID: {product.item_id}
                  </CardDescription>
                </>
              ) : (
                <CardTitle className="text-gray-500 text-sm">
                  No data available
                </CardTitle>
              )}
            </CardHeader>

            <CardContent className="pt-0">
              {product.loading ? (
                <div className="animate-pulse">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ) : product.details ? (
                <div className="space-y-4">
                  {/* Images */}
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {(() => {
                      const images = getProductImages(
                        product.details,
                        parseInt(product.platform_id)
                      );
                      return images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt={product.details.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      );
                    })()}
                  </div>

                  {/* Product Properties */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-800">
                      Properties:
                    </h4>
                    {renderProductProperties(product.details)}
                  </div>

                  {/* Categories */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-800">
                      Category:
                    </h4>
                    {renderCategories(product.details)}
                  </div>

                  {/* Price Info */}
                  {product.details.price_info && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-gray-800">
                        Price:
                      </h4>
                      {"price_text" in product.details.price_info ? (
                        <div className="text-sm font-bold text-green-600">
                          {product.details.price_info.price_text}
                        </div>
                      ) : (
                        <div className="text-sm font-bold text-green-600">
                          {product.details.price_info.price}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}