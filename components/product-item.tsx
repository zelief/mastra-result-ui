"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ShortlistedProduct } from "@/types/sourcing-workflow-output"
import { fetchProductDetails, getAllProductImages } from "@/lib/utils"
import { tmAPIProductDetail } from "@/types/tm-api-1688-product-details"
import { TMAPIAlibabaData } from "@/types/tm-api-alibaba-product-details"
import { ImageCarousel } from "@/components/image-carousel"

interface ProductItemProps {
    product: ShortlistedProduct
}

export function ProductItem({ product }: ProductItemProps) {
    const [productData, setProductData] = useState<tmAPIProductDetail | TMAPIAlibabaData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true)
                setError(null)

                const details = await fetchProductDetails(
                    parseInt(product.searchResult.item_id),
                    product.searchResult.platform_id
                )
                setProductData(details)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch product details')
                console.error('Error fetching product details:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProductData()
    }, [product.searchResult.item_id, product.searchResult.platform_id])

    const getScoreColor = (score: number) => {
        if (score >= 4) return "text-green-600"
        if (score >= 3) return "text-yellow-600"
        return "text-red-600"
    }

    const getPlatformInfo = (platformId: number) => {
        switch (platformId) {
            case 2:
                return { name: "Alibaba", color: "bg-orange-100 text-orange-800 border-orange-200" }
            case 1:
                return { name: "1688", color: "bg-red-100 text-red-800 border-red-200" }
            default:
                return { name: "Unknown Platform", color: "bg-gray-100 text-gray-800 border-gray-200" }
        }
    }

    const getProductImages = () => {
        if (productData) {
            return getAllProductImages(
                productData,
                product.searchResult.platform_id,
                product.specAnalysis.most_relevant_sku_id
            )
        }

        // Fallback to original image if no product details available
        return product.searchResult.image_url ? [product.searchResult.image_url] : []
    }

    const productImages = getProductImages()

    return (
        <Card className="bg-card border-border">
            <CardHeader className="pb-4">
                {loading ? (
                    <div className="w-full h-48 bg-muted flex items-center justify-center rounded-lg">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <ImageCarousel
                            images={productImages}
                            alt={product.searchResult.title}
                        />
                        {product.specAnalysis.most_relevant_sku_id && productImages.length > 0 && (
                            <div className="text-xs text-muted-foreground text-center">
                                Showing images from most relevant SKU: {product.specAnalysis.most_relevant_sku_id}
                            </div>
                        )}
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-sans font-medium text-foreground leading-tight text-sm line-clamp-2 flex-1">
                        {product.searchResult.title}
                    </h3>
                    <Badge className={`text-xs ${getPlatformInfo(product.searchResult.platform_id).color}`}>
                        {getPlatformInfo(product.searchResult.platform_id).name}
                    </Badge>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            {product.shortlistScore.toFixed(1)}%
                        </span>
                    </div>
                    <div className="text-sm text-foreground font-medium">{product.searchResult.price_range}</div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">Supplier:</span>
                        <span className="text-xs text-foreground truncate">{product.searchResult.supplier_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">MOQ:</span>
                        <span className="text-xs text-foreground">{product.searchResult.moq}</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Specification Analysis</h4>
                    <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="text-left p-2 font-medium text-muted-foreground">Name</th>
                                    <th className="text-left p-2 font-medium text-muted-foreground">Target</th>
                                    <th className="text-left p-2 font-medium text-muted-foreground">Product</th>
                                    <th className="text-left p-2 font-medium text-muted-foreground">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.specAnalysis.required_specs.map((spec, specIndex) => (
                                    <tr key={`req-${specIndex}`} className="border-t border-border">
                                        <td className="p-2 text-primary font-medium">{spec.spec_name}</td>
                                        <td className="p-2 text-foreground">{spec.target_value}</td>
                                        <td className="p-2 text-foreground">{spec.product_value}</td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-1">
                                                <span className={`font-medium ${getScoreColor(spec.relevance_score)}`}>
                                                    {spec.relevance_score}/5
                                                </span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button className="inline-flex items-center justify-center">
                                                            <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="max-w-xs">{spec.reasoning}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {product.specAnalysis.optional_specs.map((spec, specIndex) => (
                                    <tr key={`opt-${specIndex}`} className="border-t border-border">
                                        <td className="p-2 text-secondary font-medium">{spec.spec_name}</td>
                                        <td className="p-2 text-foreground">{spec.target_value}</td>
                                        <td className="p-2 text-foreground">{spec.product_value}</td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-1">
                                                <span className={`font-medium ${getScoreColor(spec.relevance_score)}`}>
                                                    {spec.relevance_score}/5
                                                </span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button className="inline-flex items-center justify-center">
                                                            <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="max-w-xs">{spec.reasoning}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {product.specAnalysis.summary && (
                    <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        <strong>Analysis Summary:</strong> {product.specAnalysis.summary}
                    </div>
                )}

                {error && (
                    <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg">
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
