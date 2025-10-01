"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IterationResult } from "@/types/agentic-search";

interface IterationResultsProps {
  iterations: IterationResult[];
  finalAccuracy: number;
  targetReached: boolean;
}

export function IterationResults({ iterations, finalAccuracy, targetReached }: IterationResultsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Search Iterations</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={targetReached ? "default" : "secondary"}>
              {finalAccuracy.toFixed(1)}% Accuracy
            </Badge>
            {targetReached ? (
              <Badge variant="default">Target Reached ✓</Badge>
            ) : (
              <Badge variant="secondary">Max Iterations</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {iterations.map((iteration) => (
            <div key={iteration.iteration} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Iteration {iteration.iteration}</h3>
                <Badge variant={iteration.accuracy >= 90 ? "default" : iteration.accuracy >= 50 ? "secondary" : "destructive"}>
                  {iteration.accuracy.toFixed(1)}% accuracy
                </Badge>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Keywords Used:</h4>
                <div className="flex flex-wrap gap-1">
                  {iteration.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Relevant Products */}
              {iteration.total_relevant_products !== undefined && (
                <div className="text-xs text-muted-foreground">
                  Relevant Products: {iteration.total_relevant_products}
                </div>
              )}

              {/* Keyword Performance */}
              {iteration.keyword_performance && (
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Keyword Performance:</h4>
                  <div className="space-y-1">
                    {Object.entries(iteration.keyword_performance).map(([keyword, perf]) => (
                      <div key={keyword} className="text-xs flex items-center justify-between">
                        <span className="font-medium truncate flex-1">{keyword}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {perf.relevant_count}/{perf.total_count}
                          </span>
                          <Badge
                            variant={perf.accuracy_percent >= 90 ? "default" : perf.accuracy_percent >= 50 ? "secondary" : "destructive"}
                            className="text-xs min-w-[50px] justify-center"
                          >
                            {perf.accuracy_percent.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergent Terms */}
              {iteration.emergent_terms.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Emergent Terms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {iteration.emergent_terms.map((term, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {term.term}
                        {term.relevanceScore !== undefined && (
                          <span className="ml-1 text-muted-foreground">({term.relevanceScore})</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
