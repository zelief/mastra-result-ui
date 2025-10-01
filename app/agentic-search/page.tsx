"use client";

import { useState } from "react";
import { AgenticSearchResult } from "@/types/agentic-search";
import { ProductCard } from "@/components/agentic-search/product-card";
import { IterationResults } from "@/components/agentic-search/iteration-results";
import { KeywordPerformance } from "@/components/agentic-search/keyword-performance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function AgenticSearchPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [data, setData] = useState<AgenticSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoadData = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setData(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setData(null);
    }
  };

  const relevantProducts = data?.searchResults.analyzedResults.filter(
    (result) => result.specAnalysis.overall_relevance_score >= 3
  ) || [];

  const allProducts = data?.searchResults.analyzedResults || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agentic Search Results Visualizer</h1>
        <p className="text-muted-foreground">
          Paste your agentic search workflow JSON output to visualize the results
        </p>
      </div>

      {/* JSON Input Section */}
      {!data && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Load JSON Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="w-full min-h-[200px] p-3 border rounded-md font-mono text-sm"
              placeholder="Paste your agentic search JSON output here..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button onClick={handleLoadData} className="w-full">
              Load Data
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {data && (
        <div className="space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Iterations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalIterations}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Final Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.finalAccuracy.toFixed(1)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Relevant Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {relevantProducts.length}
                  <span className="text-sm text-muted-foreground ml-1">
                    / {allProducts.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Target Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={data.targetReached ? "default" : "secondary"} className="text-sm">
                  {data.targetReached ? "Reached ✓" : "Not Reached"}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">
                All Products ({allProducts.length})
              </TabsTrigger>
              <TabsTrigger value="relevant">
                Relevant Products ({relevantProducts.length})
              </TabsTrigger>
              <TabsTrigger value="iterations">Iterations</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.map((result) => (
                  <ProductCard key={result.searchResult.item_id} result={result} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="relevant" className="mt-6">
              {relevantProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {relevantProducts.map((result) => (
                    <ProductCard key={result.searchResult.item_id} result={result} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No relevant products found (score ≥ 3)
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="iterations" className="mt-6">
              <IterationResults
                iterations={data.iterationResults}
                finalAccuracy={data.finalAccuracy}
                targetReached={data.targetReached}
              />
            </TabsContent>

            <TabsContent value="keywords" className="mt-6">
              <KeywordPerformance keywordPerformance={data.finalKeywordPerformance} />
            </TabsContent>
          </Tabs>

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setData(null);
                setJsonInput("");
                setError(null);
              }}
            >
              Load New Data
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
