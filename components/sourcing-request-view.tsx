"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data based on the new JSON structure
const mockSourcingData = {
  items: [
    {
      id: "item_1",
      title: "Self-Cleaning Insulated Water Bottle",
      selections: { current: 10, total: 10 },
      specifications: {
        required: ["capacity: 750 ml", "color: Blue", "material: Stainless Steel", "MOQ: <30", "target price: $35"],
        optional: [
          "bpa-free: Yes",
          "insulation type: Vacuum Insulated",
          "leak-proof: Yes",
          "lid type: Screw-on or Flip-top",
          "uv sanitizer: UV-C",
        ],
      },
      products: [
        {
          id: "1",
          searchResult: {
            title: "750ml Stainless Steel Insulated Water Bottle - Color: Rubber Paint - Off White",
            image_url: "/stainless-steel-beige-bottle.png",
            price_range: "$18.50-$22.00",
            moq: 1,
            supplier_name: "永康市迎庆杯业有限公司",
            supplier_region: "CN",
          },
          specAnalysis: {
            required_specs: [
              {
                spec_name: "Capacity",
                target_value: "750 ml",
                product_value: "750ml",
                relevance_score: 5,
                reasoning: "Perfect match for capacity requirement",
              },
              {
                spec_name: "Color",
                target_value: "Blue",
                product_value: "Off White, Blue options available",
                relevance_score: 4,
                reasoning: "Blue color is available among multiple color options",
              },
              {
                spec_name: "Material",
                target_value: "Stainless Steel",
                product_value: "304 Stainless Steel",
                relevance_score: 5,
                reasoning: "High-grade 304 stainless steel matches requirement perfectly",
              },
              {
                spec_name: "MOQ",
                target_value: "<30",
                product_value: "1",
                relevance_score: 5,
                reasoning: "MOQ of 1 is well below the 30 unit requirement",
              },
            ],
            optional_specs: [
              {
                spec_name: "BPA-Free",
                target_value: "Yes",
                product_value: "Yes",
                relevance_score: 5,
                reasoning: "Product is certified BPA-free",
              },
              {
                spec_name: "Insulation",
                target_value: "Vacuum Insulated",
                product_value: "Double Wall Vacuum",
                relevance_score: 5,
                reasoning: "Double wall vacuum insulation meets requirement",
              },
            ],
            overall_relevance_score: 4.7,
            shortlistScore: 94.2,
          },
        },
        {
          id: "2",
          searchResult: {
            title: "Stainless Steel Insulated Sports Water Bottle 750ml - Color: Blue",
            image_url: "/placeholder-ojtak.png",
            price_range: "$16.80-$19.50",
            moq: 5,
            supplier_name: "广州番禺区沙头街闪亮珠宝厂",
            supplier_region: "CN",
          },
          specAnalysis: {
            required_specs: [
              {
                spec_name: "Capacity",
                target_value: "750 ml",
                product_value: "750ml",
                relevance_score: 5,
                reasoning: "Exact capacity match",
              },
              {
                spec_name: "Color",
                target_value: "Blue",
                product_value: "Blue",
                relevance_score: 5,
                reasoning: "Perfect blue color match",
              },
              {
                spec_name: "Material",
                target_value: "Stainless Steel",
                product_value: "304 Stainless Steel inner, 201 outer",
                relevance_score: 4,
                reasoning: "Mixed stainless steel grades, 304 inner is good quality",
              },
            ],
            optional_specs: [
              {
                spec_name: "BPA-Free",
                target_value: "Yes",
                product_value: "Not specified",
                relevance_score: 2,
                reasoning: "BPA-free status not clearly specified by supplier",
              },
            ],
            overall_relevance_score: 4.2,
            shortlistScore: 87.5,
          },
        },
      ],
    },
    {
      id: "item_2",
      title: "18K Gold Plated Jewelry Set",
      selections: { current: 5, total: 8 },
      specifications: {
        required: [
          "material: Cubic Zirconia",
          "MOQ: <30",
          "target price: $35",
          "manufacturer location: Guangdong, China",
        ],
        optional: ["sustainable sourcing: Yes", "customizable options: Available", "warranty period: 2 years"],
      },
      products: [
        {
          id: "3",
          searchResult: {
            title: "18K Gold Plated Pendant Moissanite Necklace Jewelry Set",
            image_url: "/placeholder-pombx.png",
            price_range: "$21.58-$22.47",
            moq: 1,
            supplier_name: "Guangzhou Panyu District Shatou Street Shining Jewelry Factory",
            supplier_region: "CN",
          },
          specAnalysis: {
            required_specs: [
              {
                spec_name: "Material",
                target_value: "Cubic Zirconia",
                product_value: "Moissanite",
                relevance_score: 2,
                reasoning: "Moissanite is different from Cubic Zirconia, though both are diamond alternatives",
              },
              {
                spec_name: "MOQ",
                target_value: "<30",
                product_value: "1",
                relevance_score: 5,
                reasoning: "MOQ of 1 is well below requirement",
              },
              {
                spec_name: "Target Price",
                target_value: "$35",
                product_value: "$22.47",
                relevance_score: 5,
                reasoning: "Price is well below target, excellent value",
              },
            ],
            optional_specs: [
              {
                spec_name: "Customizable Options",
                target_value: "Available",
                product_value: "Logo, packaging, graphic customization",
                relevance_score: 5,
                reasoning: "Multiple customization options available",
              },
              {
                spec_name: "Warranty Period",
                target_value: "2 years",
                product_value: "Not specified",
                relevance_score: 1,
                reasoning: "No warranty information provided",
              },
            ],
            overall_relevance_score: 3.6,
            shortlistScore: 72.8,
          },
        },
      ],
    },
  ],
}

export function SourcingRequestView() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const currentItem = mockSourcingData.items[currentItemIndex]

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600"
    if (score >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 4) return "bg-green-100 text-green-800"
    if (score >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-sans font-semibold text-foreground">{currentItem.title}</h1>
            <span className="text-muted-foreground">
              {currentItem.selections.current} / {currentItem.selections.total} selections
            </span>
          </div>
          {mockSourcingData.items.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentItemIndex(
                    (prev) => (prev - 1 + mockSourcingData.items.length) % mockSourcingData.items.length,
                  )
                }
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                Item {currentItemIndex + 1} of {mockSourcingData.items.length}
              </span>
              <button
                onClick={() => setCurrentItemIndex((prev) => (prev + 1) % mockSourcingData.items.length)}
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-sans font-medium text-foreground mb-4">Specifications:</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Required:</h3>
              <div className="flex flex-wrap gap-2">
                {currentItem.specifications.required.map((spec, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Optional:</h3>
              <div className="flex flex-wrap gap-2">
                {currentItem.specifications.optional.map((spec, index) => (
                  <Badge key={index} className="bg-secondary/10 text-secondary border-secondary/20">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-sans font-medium text-foreground mb-4">Products ({currentItem.products.length}):</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentItem.products.map((product) => (
              <Card key={product.id} className="bg-card border-border">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <img
                      src={product.searchResult.image_url || "/placeholder.svg"}
                      alt={product.searchResult.title}
                      className="w-full h-48 object-contain bg-white rounded-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-sans font-medium text-foreground leading-tight text-sm line-clamp-2">
                    {product.searchResult.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getScoreBadge(product.specAnalysis.overall_relevance_score)}>
                        {product.specAnalysis.overall_relevance_score.toFixed(1)}/5
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {product.specAnalysis.shortlistScore}%
                      </span>
                    </div>
                    <div className="text-sm text-foreground font-medium">{product.searchResult.price_range}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground">Supplier:</span>
                      <span className="text-xs text-foreground truncate">{product.searchResult.supplier_name}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Verification Specs</h4>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
