"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KeywordPerformance as KeywordPerformanceType } from "@/types/agentic-search";

interface KeywordPerformanceProps {
  keywordPerformance: Record<string, KeywordPerformanceType>;
  title?: string;
}

export function KeywordPerformance({ keywordPerformance, title = "Final Keyword Performance" }: KeywordPerformanceProps) {
  // Sort keywords by accuracy (descending)
  const sortedKeywords = Object.entries(keywordPerformance).sort(
    ([, a], [, b]) => b.accuracy_percent - a.accuracy_percent
  );

  const getPerformanceBadgeVariant = (accuracy: number): "default" | "secondary" | "destructive" | "outline" => {
    if (accuracy >= 90) return "default";
    if (accuracy >= 50) return "secondary";
    if (accuracy >= 20) return "outline";
    return "destructive";
  };

  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 90) return "bg-green-500";
    if (accuracy >= 50) return "bg-yellow-500";
    if (accuracy >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {sortedKeywords.length} keywords tested across all iterations
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedKeywords.map(([keyword, performance]) => (
            <div key={keyword} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <div className="font-medium text-sm truncate">{keyword}</div>
                <div className="text-xs text-muted-foreground">
                  {performance.relevant_count} relevant / {performance.total_count} total products
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getPerformanceColor(performance.accuracy_percent)}`}
                    style={{ width: `${Math.min(performance.accuracy_percent, 100)}%` }}
                  />
                </div>
                <Badge variant={getPerformanceBadgeVariant(performance.accuracy_percent)} className="min-w-[60px] justify-center">
                  {performance.accuracy_percent.toFixed(1)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {sortedKeywords.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No keyword performance data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
