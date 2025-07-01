"use client"

import type { GuestGuide } from "../types/guest-guide"
import { Search, MapPin, ChevronRight } from "lucide-react"

interface MobilePreviewProps {
  selectedGuide?: GuestGuide
  guides: GuestGuide[]
  activeTab: string
}

export function MobilePreview({ selectedGuide, guides, activeTab }: MobilePreviewProps) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "add-on", label: "Add-on" },
    { id: "service", label: "Service" },
    { id: "my-info", label: "My Info" },
  ]

  // Map tab IDs to display names
  const getTabLabel = (tabId: string) => {
    return tabs.find((tab) => tab.id === tabId)?.label || tabId
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Mobile Preview</h3>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div className="flex-1 p-4">
        <div className="bg-black rounded-3xl p-2 h-full max-h-[600px]">
          <div className="bg-white rounded-2xl h-full overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="h-6 bg-gray-50 flex items-center justify-center">
              <div className="w-16 h-1 bg-black rounded-full"></div>
            </div>

            {/* Header Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600">
              <img src="/placeholder.svg?height=192&width=320" alt="Property" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-bold">The Pink Door</h2>
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <MapPin className="w-3 h-3" />
                  <span>742 Evergreen Terrace, Springfield</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 pb-16 overflow-y-auto">
              {selectedGuide ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedGuide.title}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  {selectedGuide.is_html_content ? (
                    <div
                      className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedGuide.content }}
                    />
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{selectedGuide.content}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {guides
                    .filter((guide) => guide.ui_tab_code === activeTab)
                    .map((guide) => (
                      <div key={guide.id} className="flex items-center justify-between py-2">
                        <div>
                          <span className="text-gray-900 font-medium block">{guide.title}</span>
                          {guide.short_description && (
                            <span className="text-gray-500 text-xs">{guide.short_description}</span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                </div>
              )}
            </div>
            {/* Bottom Navigation */}
            <div className="border-t border-gray-200 bg-white">
              <div className="grid grid-cols-4">
                {tabs.map((tab) => {
                  const icons = {
                    home: "🏠",
                    "add-on": "📦",
                    service: "🔧",
                    "my-info": "👤",
                  }
                  return (
                    <button
                      key={tab.id}
                      className={`flex flex-col items-center gap-1 py-2 px-2 text-xs transition-colors ${
                        tab.id === activeTab ? "text-blue-600 bg-blue-50" : "text-gray-600"
                      }`}
                    >
                      <span className="text-lg">{icons[tab.id as keyof typeof icons]}</span>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
