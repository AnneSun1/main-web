"use client"
import type { GuestGuide, GuideSection } from "../types/guest-guide"
import { ChevronDown, ChevronRight, Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GuideSidebarProps {
  sections: GuideSection[]
  selectedGuide?: GuestGuide
  onSelectGuide: (guide: GuestGuide) => void
  onToggleSection: (sectionName: string) => void
  onAddGuide: (sectionName: string) => void
}

export function GuideSidebar({
  sections,
  selectedGuide,
  onSelectGuide,
  onToggleSection,
  onAddGuide,
}: GuideSidebarProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Guide templates</span>
          <span>/</span>
          <span>Default Template</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Default Template</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Guide</span>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900 mb-4"
            onClick={() => onAddGuide("General")}
          >
            <Plus className="w-4 h-4 mr-2" />
            New tab
          </Button>

          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.name}>
                <button
                  onClick={() => onToggleSection(section.name)}
                  className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 rounded-md"
                >
                  {section.expanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                  <span className="font-medium text-gray-900">{section.name}</span>
                </button>

                {section.expanded && (
                  <div className="ml-6 space-y-1">
                    {section.items.map((guide) => (
                      <button
                        key={guide.id}
                        onClick={() => onSelectGuide(guide)}
                        className={`flex items-center gap-2 w-full p-2 text-left rounded-md text-sm ${
                          selectedGuide?.id === guide.id
                            ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronRight className="w-3 h-3" />
                        <span>{guide.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
