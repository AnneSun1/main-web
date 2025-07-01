"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { GuestGuide, PropertyFilter, ReservationStageFilter } from "../types/guest-guide"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RichTextEditor } from "./rich-text-editor"
import { ContentFilters } from "./content-filters"
import { VariablePicker } from "./variable-picker"
import { PurchaseSettingsForm } from "./purchase-settings"
import type { Variable } from "../services/variables-service"
import type { PurchaseSettings } from "../types/guest-guide"

interface ContentEditorProps {
  guide?: GuestGuide
  onSave: (guide: Partial<GuestGuide>) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ContentEditor({ guide, onSave, onCancel, isLoading }: ContentEditorProps) {
  const [activeEditorTab, setActiveEditorTab] = useState("content")
  const [formData, setFormData] = useState<Partial<GuestGuide>>({
    title: "",
    short_description: "",
    content: "",
    is_html_content: false,
    head_image_url: "",
    ui_tab_code: "home",
    ui_section_name: "General",
    ui_category: "general",
    ui_sequence_number: 1,
    tenant_id: 1,
    filter_by_listing_tags: { type: "all" },
    filter_by_reservation_stage: { stages: [] },
  })

  useEffect(() => {
    if (guide) {
      setFormData({
        ...guide,
        // Ensure filters have default values if not set
        filter_by_listing_tags: guide.filter_by_listing_tags || { type: "all" },
        filter_by_reservation_stage: guide.filter_by_reservation_stage || { stages: [] },
      })
    }
  }, [guide])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field: keyof GuestGuide, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleHtmlToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_html_content: checked,
      // If switching from HTML to plain text, strip HTML tags
      content: checked ? prev.content : prev.content?.replace(/<[^>]*>/g, "") || "",
    }))
  }

  const handlePropertyFilterChange = (filter: PropertyFilter) => {
    setFormData((prev) => ({ ...prev, filter_by_listing_tags: filter }))
  }

  const handleReservationStageFilterChange = (filter: ReservationStageFilter) => {
    setFormData((prev) => ({ ...prev, filter_by_reservation_stage: filter }))
  }

  const handleVariableSelect = (variable: Variable) => {
    const variableText = `{{${variable.id}}}`

    if (formData.is_html_content) {
      // For rich text editor, insert at cursor or append
      const currentContent = formData.content || ""
      setFormData((prev) => ({
        ...prev,
        content: currentContent + variableText,
      }))
    } else {
      // For plain text editor, insert at cursor or append
      const currentContent = formData.content || ""
      setFormData((prev) => ({
        ...prev,
        content: currentContent + variableText,
      }))
    }
  }

  const handlePurchaseSettingsChange = (settings: PurchaseSettings) => {
    setFormData((prev) => ({ ...prev, purchase_settings: settings }))
  }

  const editorTabs = [
    { id: "content", label: "Content" },
    ...(formData.ui_tab_code === "add-on" ? [{ id: "purchase", label: "Purchase Setting" }] : []),
    { id: "visibility", label: "Visibility Condition" },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{guide ? "Edit Guide Item" : "New Guide Item"}</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          {editorTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveEditorTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeEditorTab === tab.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {activeEditorTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {activeEditorTab === "content" && (
            <>
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 border-b pb-2">Basic Information</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter guide title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ui_sequence_number">Sequence Number</Label>
                    <Input
                      id="ui_sequence_number"
                      type="number"
                      value={formData.ui_sequence_number || ""}
                      onChange={(e) => handleChange("ui_sequence_number", Number.parseInt(e.target.value) || 0)}
                      placeholder="Order in section"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Input
                    id="short_description"
                    value={formData.short_description || ""}
                    onChange={(e) => handleChange("short_description", e.target.value)}
                    placeholder="Brief description for preview"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ui_tab_code">Tab Code</Label>
                    <Select
                      value={formData.ui_tab_code || "home"}
                      onValueChange={(value) => handleChange("ui_tab_code", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="add-on">Add-on</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="my-info">My Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ui_section_name">Section Name</Label>
                    <Input
                      id="ui_section_name"
                      value={formData.ui_section_name || ""}
                      onChange={(e) => handleChange("ui_section_name", e.target.value)}
                      placeholder="Section grouping name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ui_category">Category</Label>
                  <Input
                    id="ui_category"
                    value={formData.ui_category || ""}
                    onChange={(e) => handleChange("ui_category", e.target.value)}
                    placeholder="Content category"
                  />
                </div>

                <div>
                  <Label htmlFor="head_image_url">Header Image URL</Label>
                  <Input
                    id="head_image_url"
                    value={formData.head_image_url || ""}
                    onChange={(e) => handleChange("head_image_url", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 border-b pb-2">Content</h4>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_html_content"
                    checked={formData.is_html_content || false}
                    onCheckedChange={handleHtmlToggle}
                  />
                  <Label htmlFor="is_html_content">HTML Content</Label>
                  <span className="text-sm text-gray-500">
                    {formData.is_html_content ? "Rich text editor with media support" : "Plain text editor"}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="content">Content *</Label>
                    <VariablePicker
                      onVariableSelect={handleVariableSelect}
                      buttonText="Add variable"
                      buttonVariant="ghost"
                      buttonSize="sm"
                    />
                  </div>
                  {formData.is_html_content ? (
                    <RichTextEditor
                      value={formData.content || ""}
                      onChange={(value) => handleChange("content", value)}
                      placeholder="Enter your rich content here..."
                    />
                  ) : (
                    <Textarea
                      id="content"
                      value={formData.content || ""}
                      onChange={(e) => handleChange("content", e.target.value)}
                      placeholder="Enter the guide content..."
                      rows={10}
                      required
                    />
                  )}
                </div>

                {formData.is_html_content && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Rich Text Editor Features:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Bold, italic, underline formatting</li>
                      <li>• Headers (H1, H2, H3)</li>
                      <li>• Bullet and numbered lists</li>
                      <li>• Insert links, images, and videos</li>
                      <li>• HTML source code editing</li>
                      <li>• File upload support for media</li>
                      <li>• File upload support for media</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          {activeEditorTab === "purchase" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Purchase Settings</h4>
                  <p className="text-sm text-gray-600">
                    Configure pricing, rate types, and minimum price settings for this add-on item.
                  </p>
                </div>
              </div>

              <PurchaseSettingsForm settings={formData.purchase_settings} onChange={handlePurchaseSettingsChange} />
            </div>
          )}

          {activeEditorTab === "visibility" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Targeting</h4>
                  <p className="text-sm text-gray-600">
                    Select specific buildings, groups, or property tags to apply this content to. If no targets are
                    added, the content will apply to all properties.
                  </p>
                </div>
              </div>

              <ContentFilters
                propertyFilter={formData.filter_by_listing_tags}
                reservationStageFilter={formData.filter_by_reservation_stage}
                onPropertyFilterChange={handlePropertyFilterChange}
                onReservationStageFilterChange={handleReservationStageFilterChange}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
