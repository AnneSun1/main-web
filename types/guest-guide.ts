export interface PurchaseSettings {
  rate_type: "free" | "fixed_price" | "per_unit_price"
  price: number
  unit_type?: "per_day" | "per_hour" | "per_item"
  set_minimum_price?: boolean
  minimum_price?: number
  days_covered_by_minimum?: number
}

// Add purchase_settings to the GuestGuide interface
export interface GuestGuide {
  id: number
  tenant_id: number
  title: string
  short_description?: string
  content: string
  is_html_content?: boolean
  head_image_url?: string
  filter_by_listing_tags?: PropertyFilter
  filter_by_reservation_stage?: ReservationStageFilter
  ui_tab_code: string
  ui_section_name?: string
  ui_category: string
  ui_sequence_number?: number
  purchase_settings?: PurchaseSettings
  created_at?: string
  updated_at?: string
}

export interface PropertyFilter {
  type: "all" | "special_group"
  special_group_ids?: string[]
}

export interface ReservationStageFilter {
  stages: ReservationStage[]
}

export type ReservationStage = "before_check_in" | "staying" | "before_check_out" | "post_stay"

export interface GuideSection {
  name: string
  items: GuestGuide[]
  expanded: boolean
}

export interface GuideTemplate {
  id: string
  name: string
  sections: GuideSection[]
}
