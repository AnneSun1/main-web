"use client"

import type React from "react"

import type { GuestGuide } from "../types/guest-guide"
import { ChevronDown, Plus, Home, Package, Wrench, User, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TabbedGuideSidebarProps {
  guides: GuestGuide[]
  selectedGuide?: GuestGuide
  activeTab: string
  onSelectGuide: (guide: GuestGuide) => void
  onTabChange: (tab: string) => void
  onAddGuide: (tabCode: string) => void
  onReorderGuides: (guides: GuestGuide[]) => void
}

interface GuideSection {
  name: string
  items: GuestGuide[]
  expanded: boolean
}

export function TabbedGuideSidebar({
  guides,
  selectedGuide,
  activeTab,
  onSelectGuide,
  onTabChange,
  onAddGuide,
  onReorderGuides,
}: TabbedGuideSidebarProps) {
  const [draggedItem, setDraggedItem] = useState<GuestGuide | null>(null)
  const [dragOverSection, setDragOverSection] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "add-on", label: "Add-on", icon: Package },
    { id: "service", label: "Service", icon: Wrench },
    { id: "my-info", label: "My Info", icon: User },
  ]

  // Filter guides by active tab and group by section
  const filteredGuides = guides.filter((guide) => guide.ui_tab_code === activeTab)
  const sections = groupGuidesBySection(filteredGuides)

  function groupGuidesBySection(guides: GuestGuide[]): GuideSection[] {
    const sectionMap = new Map<string, GuestGuide[]>()

    guides.forEach((guide) => {
      const sectionName = guide.ui_section_name || "General"
      if (!sectionMap.has(sectionName)) {
        sectionMap.set(sectionName, [])
      }
      sectionMap.get(sectionName)!.push(guide)
    })

    return Array.from(sectionMap.entries()).map(([name, items]) => ({
      name,
      items: items.sort((a, b) => (a.ui_sequence_number || 0) - (b.ui_sequence_number || 0)),
      expanded: true,
    }))
  }

  const handleDragStart = (e: React.DragEvent, guide: GuestGuide) => {
    setDraggedItem(guide)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, sectionName: string, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverSection(sectionName)
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverSection(null)
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, targetSectionName: string, targetIndex: number) => {
    e.preventDefault()

    if (!draggedItem) return

    const updatedGuides = [...guides]
    const draggedGuideIndex = updatedGuides.findIndex((g) => g.id === draggedItem.id)

    if (draggedGuideIndex === -1) return

    // Remove the dragged item
    const [draggedGuide] = updatedGuides.splice(draggedGuideIndex, 1)

    // Update the dragged item's section if it changed
    const updatedDraggedGuide = {
      ...draggedGuide,
      ui_section_name: targetSectionName,
    }

    // Find the target section items
    const targetSectionItems = updatedGuides
      .filter((g) => g.ui_tab_code === activeTab && (g.ui_section_name || "General") === targetSectionName)
      .sort((a, b) => (a.ui_sequence_number || 0) - (b.ui_sequence_number || 0))

    // Insert at the target position
    const insertIndex = Math.min(targetIndex, targetSectionItems.length)

    // Update sequence numbers for the target section
    targetSectionItems.splice(insertIndex, 0, updatedDraggedGuide)

    // Reassign sequence numbers
    targetSectionItems.forEach((item, index) => {
      const guideIndex = updatedGuides.findIndex((g) => g.id === item.id)
      if (guideIndex !== -1) {
        updatedGuides[guideIndex] = {
          ...updatedGuides[guideIndex],
          ui_sequence_number: index + 1,
          ui_section_name: targetSectionName,
        }
      } else {
        // This is the dragged item, add it back
        updatedGuides.push({
          ...item,
          ui_sequence_number: index + 1,
          ui_section_name: targetSectionName,
        })
      }
    })

    onReorderGuides(updatedGuides)
    setDraggedItem(null)
    setDragOverSection(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverSection(null)
    setDragOverIndex(null)
  }

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Top Tab Navigation - Now at the very top */}
      <div className="border-b border-gray-200 bg-white">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 py-3 px-2 text-xs transition-colors relative ${
                  activeTab === tab.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area - Full Height with Scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900 mb-4"
            onClick={() => onAddGuide(activeTab)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New item
          </Button>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.name}>
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-gray-900">{section.name}</h3>
                </div>

                <div
                  className="ml-6 space-y-1"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, section.name, section.items.length)}
                >
                  {section.items.map((guide, index) => (
                    <div key={guide.id}>
                      {/* Drop zone above each item */}
                      <div
                        className={`h-1 transition-colors ${
                          dragOverSection === section.name && dragOverIndex === index ? "bg-blue-400 rounded" : ""
                        }`}
                        onDragOver={(e) => handleDragOver(e, section.name, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, section.name, index)}
                      />

                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, guide)}
                        onDragEnd={handleDragEnd}
                        className={`group cursor-move ${draggedItem?.id === guide.id ? "opacity-50" : ""}`}
                      >
                        <button
                          onClick={() => onSelectGuide(guide)}
                          className={`w-full p-3 text-left rounded-md border transition-colors flex items-start gap-2 ${
                            selectedGuide?.id === guide.id
                              ? "bg-blue-50 border-blue-200 text-blue-900"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-900"
                          }`}
                        >
                          <GripVertical className="w-4 h-4 text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1">{guide.title}</div>
                            {guide.short_description && (
                              <div
                                className="text-xs text-gray-600 overflow-hidden"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {guide.short_description}
                              </div>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Drop zone at the end of section */}
                  <div
                    className={`h-1 transition-colors ${
                      dragOverSection === section.name && dragOverIndex === section.items.length
                        ? "bg-blue-400 rounded"
                        : ""
                    }`}
                    onDragOver={(e) => handleDragOver(e, section.name, section.items.length)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, section.name, section.items.length)}
                  />
                </div>
              </div>
            ))}

            {sections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No items in this tab yet.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => onAddGuide(activeTab)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add first item
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
