"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SourcingWorkflowOutput } from "@/types/sourcing-workflow-output"
import { getMastraApiUrl } from "@/lib/utils"
import { ProductItem } from "@/components/product-item"

interface SourcingRequestViewProps {
  workflowRunId: string
}

export function SourcingRequestView({ workflowRunId }: SourcingRequestViewProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [data, setData] = useState<SourcingWorkflowOutput | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const mastraApiUrl = getMastraApiUrl()
        const response = await fetch(`${mastraApiUrl}/api/workflows/sourcingWorkflow/runs/${workflowRunId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()

        // Extract the result from the snapshot
        const workflowData = result.snapshot.result as SourcingWorkflowOutput
        setData(workflowData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [workflowRunId])

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading sourcing data...</h2>
          <p className="text-muted-foreground">Please wait while we fetch the workflow results.</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-2">Error loading data</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">Please check the workflow run ID and try again.</p>
        </div>
      </div>
    )
  }

  // Add error handling for empty data
  if (!data || !data.all_search_results || data.all_search_results.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-2">No sourcing data available</h2>
          <p className="text-muted-foreground">Please check your data source and try again.</p>
        </div>
      </div>
    )
  }

  const currentItem = data.all_search_results[currentItemIndex]

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sans font-semibold text-foreground max-w-2xl">
              {currentItem.item.summary}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sourcing Request ID:{" "}
              {data.sourcing_request_id ? (
                <a
                  href={`https://scube.sourcy.ai/dashboard/sourcing/${data.sourcing_request_id}/bot-results`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {data.sourcing_request_id}
                </a>
              ) : (
                "UNKNOWN"
              )}
            </p>
          </div>
          {data.all_search_results.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentItemIndex(
                    (prev) => (prev - 1 + data.all_search_results.length) % data.all_search_results.length,
                  )
                }
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                Item {currentItemIndex + 1} of {data.all_search_results.length}
              </span>
              <button
                onClick={() => setCurrentItemIndex((prev) => (prev + 1) % data.all_search_results.length)}
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sourcing Description */}
        {data.sourcing_description && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-sans font-medium text-blue-900 mb-2">Sourcing Request Description</h2>
            <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
              {data.sourcing_description}
            </p>
          </div>
        )}

        {/* Item Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-sans font-medium text-foreground mb-4">Product Specifications:</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Required:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentItem.item.product_spec.map((spec, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                      {spec.spec_name}: {spec.spec_value}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Supplier Requirements:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentItem.item.supplier_spec.map((spec, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                      {spec.spec_name}: {spec.spec_value}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Optional Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentItem.item.optional_product_spec.map((spec, index) => (
                    <Badge key={index} className="bg-secondary/10 text-secondary border-secondary/20">
                      {spec.spec_name}: {spec.spec_value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-sans font-medium text-foreground mb-4">Order Details:</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <span className="text-sm font-medium">{currentItem.item.quantity.toLocaleString()} pcs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Target Price USD:</span>
                <span className="text-sm font-medium">{currentItem.item.target_price_usd} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Target Price CNY:</span>
                <span className="text-sm font-medium">{currentItem.item.target_price_cny} CNY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Customization:</span>
                <span className="text-sm font-medium">{currentItem.item.needs_customization ? "Required" : "Not Required"}</span>
              </div>
              {currentItem.item.num_options && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Options Requested:</span>
                  <span className="text-sm font-medium">{currentItem.item.num_options}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-sans font-medium text-foreground mb-4">
            Shortlisted Products ({currentItem.shortlistedProducts.length}):
          </h2>
          {currentItem.shortlistedProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products were shortlisted for this item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentItem.shortlistedProducts.map((product, productIndex) => (
                <ProductItem key={productIndex} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Overall Summary */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h2 className="font-sans font-medium text-foreground mb-3">Overall Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Items:</span>
              <div className="font-medium">{data.summary.total_items_processed}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Products Found:</span>
              <div className="font-medium">{data.summary.total_products_found}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Shortlisted:</span>
              <div className="font-medium">{data.summary.total_shortlisted}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Average Score:</span>
              <div className="font-medium">{data.summary.average_shortlist_score.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
