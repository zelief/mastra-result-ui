interface tmAPIPriceInfo {
    price: string
    sale_price?: string
    origin_price?: string
    price_min?: string
    price_max?: string
    origin_price_min?: string
    origin_price_max?: string
    discount_price?: string
  }
  
  interface tmAPISaleInfo {
    sale_quantity: string | null
    sale_quantity_int: number | null
    orders_count: number | null
    sale_quantity_90days?: string | null
  }
  
  interface tmAPIPriceRange {
    beginAmount: string
    price: string
    startAmount: string
  }
  
  interface tmAPISkuPriceRange {
    stock: number
    begin_num: number
    sku_param?: any[]
    mix_param?: {
      mixNum: number
      mixBegin: number
      mixAmount: number
      shopMixNum: number
      supportMix: boolean
    }
  }
  
  interface tmAPIStockSku {
    skuid: string
    specid: string
    sale_price: string
    origin_price: string
    stock: number
    props_ids: string
    props_names: string
    sale_count: number
    package_info: {
      weight: number
      length: number
      width: number
      height: number
      volume: number
    } | null
  }
  
  interface tmAPIItemShopInfo {
    shop_name: string
    shop_url: string
    seller_login_id: string
    seller_user_id: string
    seller_member_id: string
  }
  
  interface tmAPIDetailDeliveryInfo {
    location: string
    location_code: string
    delivery_fee: number | null
    unit_weight: number
    template_id: string
  }
  
  type tmAPIProductProp = Record<string, string>
  
  interface tmAPIProp {
    pid: string
    prop_name: string
    values: tmAPIMedia[]
  }
  
  interface tmAPIMedia {
    vid: string
    name: string
    imageUrl: string
  }
  
  export interface tmAPIProductDetail {
    item_id: number
    product_url: string
    title: string
    category_id: number
    root_category_id: number
    currency: string
    offer_unit: string
    product_props: tmAPIProductProp[]
    main_imgs: string[]
    video_url: string
    detail_url: string
    sale_count: string
    sale_info: tmAPISaleInfo
    price_info: tmAPIPriceInfo
    tiered_price_info: {
      prices: tmAPIPriceRange[]
      begin_num: number
    }
    mixed_batch?: {
      mix_num: number
      mix_begin: number
      mix_amount: number
      shop_mix_num: number
    }
    shop_info: tmAPIItemShopInfo
    delivery_info: tmAPIDetailDeliveryInfo
    sku_price_scale: string
    sku_price_scale_original: string
    sku_price_range: tmAPISkuPriceRange
    sku_props: tmAPIProp[]
    skus: tmAPIStockSku[]
    is_sold_out: boolean
    stock: number
    promotions: string[] //? not sure about the structure yet
    service_tags: string[]
  }

  
  



  
  