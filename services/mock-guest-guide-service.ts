import type { GuestGuide, GuideTemplate } from "../types/guest-guide"

// Mock data
const mockGuides: GuestGuide[] = [
  // Home tab guides
  {
    id: 1,
    tenant_id: 1,
    title: "Welcome",
    short_description: "Welcome message for guests",
    content:
      "We're so excited you're here! Use this guide to easily find information you might need during your stay. Need something else? Our team is here to help, don't hesitate to call or text us!",
    is_html_content: false,
    head_image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KWJXU7PHtQCdESkqf45FKNdQ3t5E7s.png",
    ui_tab_code: "home",
    ui_section_name: "Welcome",
    ui_category: "welcome",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in", "staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    tenant_id: 1,
    title: "Reservation Info",
    short_description: "Details about your reservation",
    content:
      "Here you'll find all the important details about your reservation including check-in/out times, property address, and contact information.",
    is_html_content: false,
    ui_tab_code: "home",
    ui_section_name: "Welcome",
    ui_category: "welcome",
    ui_sequence_number: 2,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in", "staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    tenant_id: 1,
    title: "Getting Here",
    short_description: "Directions and transportation info",
    content: "Find detailed directions to the property, parking information, and local transportation options.",
    is_html_content: false,
    ui_tab_code: "home",
    ui_section_name: "Welcome",
    ui_category: "welcome",
    ui_sequence_number: 3,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in", "staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    tenant_id: 1,
    title: "Access Code",
    short_description: "Property access information",
    content:
      "Your access code is 1234. Use this code to enter the property. The code is active from your check-in time.",
    is_html_content: false,
    ui_tab_code: "home",
    ui_section_name: "Access",
    ui_category: "access",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    tenant_id: 1,
    title: "Wifi",
    short_description: "Internet connection details",
    content: "WiFi Network: PinkDoor_Guest\nPassword: welcome2024\n\nFor any connectivity issues, please contact us.",
    is_html_content: false,
    ui_tab_code: "home",
    ui_section_name: "Access",
    ui_category: "access",
    ui_sequence_number: 2,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    tenant_id: 1,
    title: "Pool Rules",
    short_description: "Pool usage guidelines",
    content:
      "Please follow these pool rules for everyone's safety and enjoyment. Pool hours are 6 AM to 10 PM daily. No glass containers allowed.",
    is_html_content: false,
    ui_tab_code: "home",
    ui_section_name: "Policy",
    ui_category: "policy",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Add-on tab guides
  {
    id: 7,
    tenant_id: 1,
    title: "Early Check-in",
    short_description: "Available for additional fee",
    content:
      "Early check-in is available starting at 12 PM for an additional $50 fee. Please contact us at least 24 hours in advance to arrange.",
    is_html_content: false,
    ui_tab_code: "add-on",
    ui_section_name: "Premium Services",
    ui_category: "addon",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    tenant_id: 1,
    title: "Late Check-out",
    short_description: "Extend your stay",
    content:
      "Late check-out until 2 PM is available for $30. Subject to availability. Please request by 9 AM on your departure day.",
    is_html_content: false,
    ui_tab_code: "add-on",
    ui_section_name: "Premium Services",
    ui_category: "addon",
    ui_sequence_number: 2,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 9,
    tenant_id: 1,
    title: "Extra Cleaning",
    short_description: "Deep cleaning service",
    content:
      "Additional deep cleaning service available for $75. Includes detailed cleaning of all areas and fresh linens.",
    is_html_content: false,
    ui_tab_code: "add-on",
    ui_section_name: "Cleaning Services",
    ui_category: "addon",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Service tab guides
  {
    id: 10,
    tenant_id: 1,
    title: "Concierge",
    short_description: "24/7 guest assistance",
    content:
      "Our concierge service is available 24/7 to help with restaurant reservations, local recommendations, and any questions you may have.",
    is_html_content: false,
    ui_tab_code: "service",
    ui_section_name: "Guest Services",
    ui_category: "service",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 11,
    tenant_id: 1,
    title: "Housekeeping",
    short_description: "Daily cleaning service",
    content:
      "Daily housekeeping service is available upon request. Please place the service card on your door by 9 AM.",
    is_html_content: false,
    ui_tab_code: "service",
    ui_section_name: "Guest Services",
    ui_category: "service",
    ui_sequence_number: 2,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 12,
    tenant_id: 1,
    title: "Maintenance",
    short_description: "Property maintenance support",
    content:
      "For any maintenance issues, please contact us immediately. Our maintenance team is available 24/7 for urgent matters.",
    is_html_content: false,
    ui_tab_code: "service",
    ui_section_name: "Support",
    ui_category: "service",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["staying"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // My Info tab guides
  {
    id: 13,
    tenant_id: 1,
    title: "Contact Information",
    short_description: "How to reach us",
    content:
      "Phone: (555) 123-4567\nEmail: support@pinkdoor.com\nEmergency: (555) 911-0000\n\nWe're here to help 24/7!",
    is_html_content: false,
    ui_tab_code: "my-info",
    ui_section_name: "Contact",
    ui_category: "info",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in", "staying", "after_check_out"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 14,
    tenant_id: 1,
    title: "Property Address",
    short_description: "Full property details",
    content: "The Pink Door\n742 Evergreen Terrace\nSpringfield, IL 62701\n\nParking: Available on-site\nUnit: 2A",
    is_html_content: false,
    ui_tab_code: "my-info",
    ui_section_name: "Property Details",
    ui_category: "info",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in", "staying", "after_check_out"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 15,
    tenant_id: 1,
    title: "Check-in/out Times",
    short_description: "Important timing information",
    content:
      "Check-in: 3:00 PM\nCheck-out: 11:00 AM\n\nEarly check-in and late check-out available for additional fees.",
    is_html_content: false,
    ui_tab_code: "my-info",
    ui_section_name: "Booking Details",
    ui_category: "info",
    ui_sequence_number: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: ["before_check_in", "staying", "after_check_out"] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export class MockGuestGuideService {
  private guides: GuestGuide[] = [...mockGuides]
  private nextId = Math.max(...mockGuides.map((g) => g.id)) + 1

  async getGuides(): Promise<GuestGuide[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.guides]
  }

  async getGuideById(id: number): Promise<GuestGuide | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.guides.find((g) => g.id === id) || null
  }

  async createGuide(guide: Omit<GuestGuide, "id" | "created_at" | "updated_at">): Promise<GuestGuide> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newGuide: GuestGuide = {
      ...guide,
      id: this.nextId++,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    this.guides.push(newGuide)
    return newGuide
  }

  async updateGuide(id: number, updates: Partial<GuestGuide>): Promise<GuestGuide | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = this.guides.findIndex((g) => g.id === id)
    if (index === -1) return null

    this.guides[index] = {
      ...this.guides[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }
    return this.guides[index]
  }

  async deleteGuide(id: number): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = this.guides.findIndex((g) => g.id === id)
    if (index === -1) return false

    this.guides.splice(index, 1)
    return true
  }

  async getTemplate(): Promise<GuideTemplate> {
    const guides = await this.getGuides()
    const sections = this.groupGuidesBySection(guides)

    return {
      id: "default",
      name: "Default Template",
      sections,
    }
  }

  private groupGuidesBySection(guides: GuestGuide[]): any[] {
    const sectionMap = new Map()

    guides.forEach((guide) => {
      const sectionName = guide.ui_section_name || "General"
      if (!sectionMap.has(sectionName)) {
        sectionMap.set(sectionName, {
          name: sectionName,
          items: [],
          expanded: sectionName === "Welcome",
        })
      }
      sectionMap.get(sectionName).items.push(guide)
    })

    return Array.from(sectionMap.values()).map((section) => ({
      ...section,
      items: section.items.sort(
        (a: GuestGuide, b: GuestGuide) => (a.ui_sequence_number || 0) - (b.ui_sequence_number || 0),
      ),
    }))
  }
}

export const guestGuideService = new MockGuestGuideService()
