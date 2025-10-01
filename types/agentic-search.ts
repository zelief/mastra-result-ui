export interface SpecAnalysis {
  spec_name: string;
  target_value: string;
  product_value: string;
  relevance_score: number;
  reasoning: string;
}

export interface ProductSpecAnalysis {
  required_specs: SpecAnalysis[];
  optional_specs: SpecAnalysis[];
  overall_relevance_score: number;
  summary: string;
  most_relevant_sku_id: string | null;
}

export interface SearchResult {
  platform_id: string;
  item_id: string;
  title: string;
  image_url: string;
  price_range: string;
  moq: number;
  supplier_id: string;
  supplier_name: string;
  supplier_region: string;
}

export interface AnalyzedResult {
  searchResult: SearchResult;
  specAnalysis: ProductSpecAnalysis;
}

export interface EmergentTerm {
  term: string;
  relevanceScore?: number;
  relevantFreq?: number;
  irrelevantFreq?: number;
}

export interface KeywordPerformance {
  relevant_count: number;
  total_count: number;
  accuracy_percent: number;
}

export interface IterationResult {
  iteration: number;
  keywords: string[];
  accuracy: number;
  emergent_terms: EmergentTerm[];
  total_relevant_products?: number;
  keyword_performance?: Record<string, KeywordPerformance>;
}

export interface AgenticSearchResult {
  searchResults: {
    analyzedResults: AnalyzedResult[];
    summary: string;
    keyword_to_item_ids: Record<string, string[]>;
  };
  finalAccuracy: number;
  totalIterations: number;
  iterationResults: IterationResult[];
  targetReached: boolean;
  finalKeywordPerformance: Record<string, KeywordPerformance>;
}
