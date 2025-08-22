export interface TMAPIAlibabaData {
  item_id: number;
  title: string;
  product_url: string;
  category_path: TMAPIAlibabaCategoryPath[] | null;
  category_id: number;
  currency: string;
  product_props: TMAPIAlibabaProductProp[] | null;
  main_imgs: string[];
  video_url: any;
  price_info: TMAPIAlibabaPriceInfo;
  tiered_price_info: TMAPIAlibabaTieredPriceInfo[] | null;
  comment_count: number;
  customization_options: TMAPIAlibabaCustomizationOption[] | null;
  certifications: any[] | null;
  review_info: TMAPIAlibabaReviewInfo;
  sales_count: string;
  shop_info: TMAPIAlibabaShopInfo;
  delivery_info: TMAPIAlibabaDeliveryInfo;
  sku_props: TMAPIAlibabaSkuProp[] | null;
  skus: TMAPIAlibabaSku[] | null;
  min_order_quantity: number;
  unit: string;
}

export interface TMAPIAlibabaCategoryPath {
  id: string;
  name: string;
}

export interface TMAPIAlibabaProductProp {
  key: string;
  value: string;
}

export interface TMAPIAlibabaPriceInfo {
  price_text: string;
  price_min: string;
  price_max: string;
}

export interface TMAPIAlibabaTieredPriceInfo {
  begin_num: number;
  end_num?: number;
  price: string;
}

export interface TMAPIAlibabaCustomizationOption {
  custom_type: string;
  min_order_quantity: number;
}

export interface TMAPIAlibabaReviewInfo {
  rating_star: any;
  review_count: number;
}

export interface TMAPIAlibabaShopInfo {
  company_name: string;
  company_id: number;
  company_type: string | null;
  company_region: string;
  opening_years: string;
  seller_id: number;
  member_id: number;
  login_id: string;
  contact_name: string;
  shop_url: string;
  shop_rate: TMAPIAlibabaShopRate;
  response_time: string;
  ontime_delivery_rate: any;
  is_company_auth: boolean;
  is_gold_supplier: boolean;
  is_top_supplier: boolean;
  is_dispatch_guaranteed: boolean;
}

export interface TMAPIAlibabaShopRate {
  average_star: string;
  scores: TMAPIAlibabaScore[];
}

export interface TMAPIAlibabaScore {
  type: string;
  score: string;
}

export interface TMAPIAlibabaDeliveryInfo {
  area_from: string;
  delivery_days: number;
  unit_weight: string;
  unit_size: string;
}

export interface TMAPIAlibabaSkuProp {
  pid: string;
  prop_name: string;
  values: TMAPIAlibabaValue[];
}

export interface TMAPIAlibabaValue {
  name: string;
  vid: string;
  imageUrl: string;
}

export interface TMAPIAlibabaSku {
  skuid: string;
  sale_price: string;
  origin_price: string;
  sample_price: string;
  stock: number;
  props_ids: string;
  props_names: string;
}
