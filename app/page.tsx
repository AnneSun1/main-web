"use client"

import { useState, useEffect } from "react"
import type { GuestGuide } from "../types/guest-guide"
import { guestGuideService } from "../services/mock-guest-guide-service"
import { TabbedGuideSidebar } from "../components/tabbed-guide-sidebar"
import { ContentEditor } from "../components/content-editor"
import { MobilePreview } from "../components/mobile-preview"
import { Button } from "@/components/ui/button"

export default function GuestGuidePage() {
  const [guides, setGuides] = useState<GuestGuide[]>([])
  const [selectedGuide, setSelectedGuide] = useState<GuestGuide | undefined>()
  const [activeTab, setActiveTab] = useState("home")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadGuides()
  }, [])

  const loadGuides = async () => {
    try {
      const allGuides = await guestGuideService.getGuides()
      setGuides(allGuides)
    } catch (error) {
      console.error("Failed to load guides:", error)
    }
  }

  const handleSelectGuide = (guide: GuestGuide) => {
    setSelectedGuide(guide)
    setIsEditing(true)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSelectedGuide(undefined)
    setIsEditing(false)
  }

  const handleAddGuide = (tabCode: string) => {
    setSelectedGuide(undefined)
    setIsEditing(true)
    setActiveTab(tabCode)
  }

  const handleReorderGuides = async (reorderedGuides: GuestGuide[]) => {
    try {
      // Update all guides with new sequence numbers
      const updatePromises = reorderedGuides.map((guide) =>
        guestGuideService.updateGuide(guide.id, {
          ui_sequence_number: guide.ui_sequence_number,
          ui_section_name: guide.ui_section_name,
        }),
      )

      await Promise.all(updatePromises)
      setGuides(reorderedGuides)

      // Update selected guide if it was reordered
      if (selectedGuide) {
        const updatedSelectedGuide = reorderedGuides.find((g) => g.id === selectedGuide.id)
        if (updatedSelectedGuide) {
          setSelectedGuide(updatedSelectedGuide)
        }
      }
    } catch (error) {
      console.error("Failed to reorder guides:", error)
      // Reload guides to revert changes on error
      loadGuides()
    }
  }

  const handleSaveGuide = async (guideData: Partial<GuestGuide>) => {
    setIsLoading(true)
    try {
      if (selectedGuide) {
        const updatedGuide = await guestGuideService.updateGuide(selectedGuide.id, guideData)
        if (updatedGuide) {
          setSelectedGuide(updatedGuide)
        }
      } else {
        const newGuide = await guestGuideService.createGuide({
          ...guideData,
          ui_tab_code: guideData.ui_tab_code || activeTab,
        } as Omit<GuestGuide, "id" | "created_at" | "updated_at">)
        setSelectedGuide(newGuide)
      }
      await loadGuides()
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save guide:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setSelectedGuide(undefined)
  }

  return (
    <div className="h-screen flex bg-white">
      <TabbedGuideSidebar
        guides={guides}
        selectedGuide={selectedGuide}
        activeTab={activeTab}
        onSelectGuide={handleSelectGuide}
        onTabChange={handleTabChange}
        onAddGuide={handleAddGuide}
        onReorderGuides={handleReorderGuides}
      />

      <div className="flex-1 flex flex-col">
        {isEditing ? (
          <ContentEditor
            guide={selectedGuide}
            onSave={handleSaveGuide}
            onCancel={handleCancelEdit}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a guide item</h3>
              <p className="text-gray-600">Choose an item from the sidebar to edit its content.</p>
              <Button className="mt-4" onClick={() => handleAddGuide(activeTab)}>
                Create New Item
              </Button>
            </div>
          </div>
        )}
      </div>

      <MobilePreview selectedGuide={selectedGuide} guides={guides} activeTab={activeTab} />
    </div>
  )
}
