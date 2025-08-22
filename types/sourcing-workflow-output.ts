// TypeScript types for Sourcing Workflow Output Schema
// Generated from the Mastra workflow schemas

export enum PlatformEnum {
  TM_API = 1,
  ALIBABA = 2,
  LAZADA = 3,
  EC21 = 4,
  DHGATE = 5,
  TAOBAO = 6,
  MADE_IN_CHINA = 8,
}

// Base schemas
export interface ProductSpec {
  spec_name: string;
  spec_value: string;
}

export interface OptionalProductSpec {
  spec_name: string;
  spec_value: string;
  description: string;
}

export interface ItemSchema {
  summary: string;
  product_spec: ProductSpec[];
  supplier_spec: ProductSpec[];
  quantity: number;
  target_price: number;
  needs_customization: boolean;
  num_options?: number;
  optional_product_spec: OptionalProductSpec[];
}

export interface SearchResult {
  platform_id: PlatformEnum;
  item_id: string;
  title: string;
  image_url: string;
  price_range: string;
  moq: number;
  supplier_id: string;
  supplier_name: string;
  supplier_region: string;
}

export interface SpecAnalysis {
  spec_name: string;
  target_value: string;
  product_value: string;
  relevance_score: number; // 1-5 scale
  reasoning: string;
}

export interface SpecMatchingResult {
  required_specs: SpecAnalysis[];
  optional_specs: SpecAnalysis[];
  overall_relevance_score: number; // 1-5 scale
  summary: string;
  most_relevant_sku_id?: string | null;
}

// Search workflow output types
export interface ShortlistedProduct {
  searchResult: SearchResult;
  specAnalysis: SpecMatchingResult;
  shortlistScore: number;
}

export interface SearchWorkflowSummary {
  total_analyzed: number;
  total_shortlisted: number;
  average_shortlist_score: number;
  top_shortlist_score: number;
}

export interface SearchWorkflowOutput {
  item: ItemSchema;
  shortlistedProducts: ShortlistedProduct[];
  summary: SearchWorkflowSummary;
}

// Main sourcing workflow output types
export interface SourcingWorkflowSummary {
  total_items_processed: number;
  total_products_found: number;
  total_shortlisted: number;
  average_shortlist_score: number;
  top_shortlist_score: number;
}

export interface SourcingWorkflowOutput {
  all_search_results: SearchWorkflowOutput[];
  summary: SourcingWorkflowSummary;
  sourcing_description: string;
}

// Input type for the sourcing workflow
export interface SourcingWorkflowInput {
  sourcingRequest: string;
}

// Utility types for easier usage
export type SourcingWorkflowResult = SourcingWorkflowOutput;
export type SearchWorkflowResult = SearchWorkflowOutput;
