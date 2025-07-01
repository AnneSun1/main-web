export interface Variable {
  id: string
  name: string
  description: string
  category: string
  example: string
}

export interface VariableCategory {
  id: string
  name: string
  variables: Variable[]
}

const variables: Variable[] = [
  // Guest Information
  {
    id: "guest_first",
    name: "Guest First Name",
    description: "Primary guest's first name",
    category: "guest",
    example: "John",
  },
  {
    id: "guest_last",
    name: "Guest Last Name",
    description: "Primary guest's last name",
    category: "guest",
    example: "Smith",
  },
  {
    id: "guest_full_name",
    name: "Guest Full Name",
    description: "Primary guest's full name",
    category: "guest",
    example: "John Smith",
  },
  {
    id: "guest_email",
    name: "Guest Email",
    description: "Primary guest's email address",
    category: "guest",
    example: "john.smith@email.com",
  },
  {
    id: "guest_phone",
    name: "Guest Phone",
    description: "Primary guest's phone number",
    category: "guest",
    example: "+1 (555) 123-4567",
  },

  // Property Attributes
  {
    id: "building_name",
    name: "Building Name",
    description: "Name of the building or property",
    category: "property",
    example: "The Pink Door",
  },
  {
    id: "listing_address_city",
    name: "City",
    description: "City where the property is located",
    category: "property",
    example: "Springfield",
  },
  {
    id: "listing_address",
    name: "Full Address",
    description: "Complete property address",
    category: "property",
    example: "742 Evergreen Terrace, Springfield, IL 62701",
  },
  {
    id: "guide_link",
    name: "Guide Link",
    description: "Link to the property guide",
    category: "property",
    example: "https://example.com/guide/123",
  },
  {
    id: "marketing_code",
    name: "Marketing Code",
    description: "Property marketing or reference code",
    category: "property",
    example: "PD-742",
  },
  {
    id: "property_name",
    name: "Property Name",
    description: "Official name of the property",
    category: "property",
    example: "The Pink Door Apartment",
  },
  {
    id: "property_review_link",
    name: "Property Review Link",
    description: "Link to property reviews",
    category: "property",
    example: "https://example.com/reviews/123",
  },

  // Reservation Details
  {
    id: "checkin",
    name: "Check-in Date",
    description: "Guest's check-in date",
    category: "reservation",
    example: "March 15, 2024",
  },
  {
    id: "checkout",
    name: "Check-out Date",
    description: "Guest's check-out date",
    category: "reservation",
    example: "March 18, 2024",
  },
  {
    id: "checkin_time",
    name: "Check-in Time",
    description: "Check-in time",
    category: "reservation",
    example: "3:00 PM",
  },
  {
    id: "checkout_time",
    name: "Check-out Time",
    description: "Check-out time",
    category: "reservation",
    example: "11:00 AM",
  },
  {
    id: "reservation_number",
    name: "Reservation Number",
    description: "Unique reservation identifier",
    category: "reservation",
    example: "RES-2024-001234",
  },
  {
    id: "nights_count",
    name: "Number of Nights",
    description: "Total nights in reservation",
    category: "reservation",
    example: "3",
  },

  // Access Information
  {
    id: "access_code",
    name: "Access Code",
    description: "Property access code",
    category: "access",
    example: "1234",
  },
  {
    id: "wifi_network",
    name: "WiFi Network",
    description: "WiFi network name",
    category: "access",
    example: "PinkDoor_Guest",
  },
  {
    id: "wifi_password",
    name: "WiFi Password",
    description: "WiFi network password",
    category: "access",
    example: "welcome2024",
  },
  {
    id: "parking_info",
    name: "Parking Information",
    description: "Parking details and instructions",
    category: "access",
    example: "Space #15 in underground garage",
  },

  // Contact Information
  {
    id: "host_name",
    name: "Host Name",
    description: "Property host or manager name",
    category: "contact",
    example: "Sarah Johnson",
  },
  {
    id: "host_phone",
    name: "Host Phone",
    description: "Host contact phone number",
    category: "contact",
    example: "+1 (555) 123-4567",
  },
  {
    id: "host_email",
    name: "Host Email",
    description: "Host contact email",
    category: "contact",
    example: "host@pinkdoor.com",
  },
  {
    id: "emergency_phone",
    name: "Emergency Phone",
    description: "Emergency contact number",
    category: "contact",
    example: "+1 (555) 911-0000",
  },
  {
    id: "support_email",
    name: "Support Email",
    description: "Customer support email",
    category: "contact",
    example: "support@pinkdoor.com",
  },
]

const categories: VariableCategory[] = [
  {
    id: "guest",
    name: "Guest Information",
    variables: variables.filter((v) => v.category === "guest"),
  },
  {
    id: "property",
    name: "Property Attributes",
    variables: variables.filter((v) => v.category === "property"),
  },
  {
    id: "reservation",
    name: "Reservation Details",
    variables: variables.filter((v) => v.category === "reservation"),
  },
  {
    id: "access",
    name: "Access Information",
    variables: variables.filter((v) => v.category === "access"),
  },
  {
    id: "contact",
    name: "Contact Information",
    variables: variables.filter((v) => v.category === "contact"),
  },
]

export class VariablesService {
  getAllVariables(): Variable[] {
    return [...variables]
  }

  getVariablesByCategory(): VariableCategory[] {
    return [...categories]
  }

  searchVariables(query: string): Variable[] {
    const searchTerm = query.toLowerCase()
    return variables.filter(
      (variable) =>
        variable.name.toLowerCase().includes(searchTerm) ||
        variable.description.toLowerCase().includes(searchTerm) ||
        variable.id.toLowerCase().includes(searchTerm),
    )
  }

  getVariableById(id: string): Variable | undefined {
    return variables.find((variable) => variable.id === id)
  }

  formatVariable(variableId: string): string {
    return `{{${variableId}}}`
  }

  getCategoryName(categoryId: string): string {
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.name || categoryId
  }
}

export const variablesService = new VariablesService()
