"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyzedResult } from "@/types/agentic-search";

interface ProductCardProps {
  result: AnalyzedResult;
}

export function ProductCard({ result }: ProductCardProps) {
  const { searchResult, specAnalysis } = result;

  const getScoreColor = (score: number) => {
    if (score >= 3) return "text-green-600";
    if (score >= 2) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 3) return "default";
    if (score >= 2) return "secondary";
    return "destructive";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm line-clamp-2">{searchResult.title}</CardTitle>
          <Badge variant={getScoreBadgeVariant(specAnalysis.overall_relevance_score)}>
            {specAnalysis.overall_relevance_score.toFixed(1)}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>ID: {searchResult.item_id}</div>
          <div>{searchResult.supplier_name}</div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={searchResult.image_url}
            alt={searchResult.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Price and MOQ */}
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Price</div>
            <div className="font-semibold text-green-600">¥{searchResult.price_range}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">MOQ</div>
            <div className="font-semibold">{searchResult.moq}</div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold">Overall Score</h4>
            <span className={`text-lg font-bold ${getScoreColor(specAnalysis.overall_relevance_score)}`}>
              {specAnalysis.overall_relevance_score.toFixed(1)}/5
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{specAnalysis.summary}</p>
        </div>

        {/* Required Specs */}
        {specAnalysis.required_specs.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-xs font-semibold mb-3">Required Specifications</h4>
            <div className="space-y-3">
              {specAnalysis.required_specs.map((spec, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{spec.spec_name}</span>
                    <Badge variant={getScoreBadgeVariant(spec.relevance_score)} className="text-xs">
                      {spec.relevance_score}/5
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Target:</span> {spec.target_value}
                    </div>
                    <div>
                      <span className="font-medium">Product:</span> {spec.product_value}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{spec.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional Specs */}
        {specAnalysis.optional_specs.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-xs font-semibold mb-3">Optional Specifications</h4>
            <div className="space-y-3">
              {specAnalysis.optional_specs.map((spec, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{spec.spec_name}</span>
                    <Badge variant={getScoreBadgeVariant(spec.relevance_score)} className="text-xs">
                      {spec.relevance_score}/5
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Target:</span> {spec.target_value}
                    </div>
                    <div>
                      <span className="font-medium">Product:</span> {spec.product_value}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{spec.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
