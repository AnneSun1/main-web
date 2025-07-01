"use client"

import type { PropertyFilter, ReservationStageFilter, ReservationStage } from "../types/guest-guide"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X, Building, Clock } from "lucide-react"
import { useState } from "react"

interface ContentFiltersProps {
  propertyFilter?: PropertyFilter
  reservationStageFilter?: ReservationStageFilter
  onPropertyFilterChange: (filter: PropertyFilter) => void
  onReservationStageFilterChange: (filter: ReservationStageFilter) => void
}

export function ContentFilters({
  propertyFilter,
  reservationStageFilter,
  onPropertyFilterChange,
  onReservationStageFilterChange,
}: ContentFiltersProps) {
  const [newGroupId, setNewGroupId] = useState("")

  const reservationStages: { value: ReservationStage; label: string; description: string }[] = [
    {
      value: "before_check_in",
      label: "Before Check-in",
      description: "Show to guests before their check-in date",
    },
    {
      value: "staying",
      label: "Staying",
      description: "Show to guests during their stay",
    },
    {
      value: "before_check_out",
      label: "Before Check-out",
      description: "Show to guests before check-out time on departure day",
    },
    {
      value: "post_stay",
      label: "Post-stay",
      description: "Show to guests after they have checked out",
    },
  ]

  const handlePropertyTypeChange = (type: "all" | "special_group") => {
    onPropertyFilterChange({
      type,
      special_group_ids: type === "all" ? undefined : propertyFilter?.special_group_ids || [],
    })
  }

  const handleAddSpecialGroup = () => {
    if (newGroupId.trim()) {
      const currentIds = propertyFilter?.special_group_ids || []
      onPropertyFilterChange({
        type: "special_group",
        special_group_ids: [...currentIds, newGroupId.trim()],
      })
      setNewGroupId("")
    }
  }

  const handleRemoveSpecialGroup = (groupId: string) => {
    const currentIds = propertyFilter?.special_group_ids || []
    onPropertyFilterChange({
      type: "special_group",
      special_group_ids: currentIds.filter((id) => id !== groupId),
    })
  }

  const handleReservationStageChange = (stage: ReservationStage, checked: boolean) => {
    const currentStages = reservationStageFilter?.stages || []
    const newStages = checked ? [...currentStages, stage] : currentStages.filter((s) => s !== stage)

    onReservationStageFilterChange({
      stages: newStages,
    })
  }

  return (
    <div className="space-y-8">
      {/* Property Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-5 h-5 text-gray-600" />
          <h5 className="text-lg font-medium text-gray-900">Property Targeting</h5>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-900">Content shows for properties</Label>
            <Select
              value={propertyFilter?.type || "all"}
              onValueChange={(value: "all" | "special_group") => handlePropertyTypeChange(value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="special_group">Special Group Properties</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {propertyFilter?.type === "special_group" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
              <Label className="text-sm font-medium text-gray-700">Special Group Property IDs</Label>

              {/* Add new group ID */}
              <div className="flex gap-2">
                <Input
                  value={newGroupId}
                  onChange={(e) => setNewGroupId(e.target.value)}
                  placeholder="Enter property group ID"
                  className="text-sm"
                />
                <Button size="sm" onClick={handleAddSpecialGroup} disabled={!newGroupId.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* List existing group IDs */}
              {propertyFilter.special_group_ids && propertyFilter.special_group_ids.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Selected Groups:</Label>
                  <div className="flex flex-wrap gap-2">
                    {propertyFilter.special_group_ids.map((groupId) => (
                      <div key={groupId} className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full text-sm">
                        <span className="text-blue-900">{groupId}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveSpecialGroup(groupId)}
                          className="h-4 w-4 p-0 text-blue-600 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reservation Stage Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <h5 className="text-lg font-medium text-gray-900">Reservation Stage Targeting</h5>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-900">Content shows when guest reservation is</Label>
          <div className="grid grid-cols-1 gap-3">
            {reservationStages.map((stage) => (
              <div
                key={stage.value}
                className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  id={stage.value}
                  checked={reservationStageFilter?.stages?.includes(stage.value) || false}
                  onCheckedChange={(checked) => handleReservationStageChange(stage.value, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={stage.value} className="text-sm font-medium text-gray-900 cursor-pointer">
                    {stage.label}
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>

          {(!reservationStageFilter?.stages || reservationStageFilter.stages.length === 0) && (
            <div className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No reservation stages selected. This content will not be visible to guests.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h6 className="text-sm font-medium text-blue-900 mb-2">Targeting Summary</h6>
        <div className="text-sm text-blue-800 space-y-1">
          <div>
            <strong>Properties:</strong>{" "}
            {propertyFilter?.type === "all"
              ? "All properties"
              : `Special groups (${propertyFilter?.special_group_ids?.length || 0} selected)`}
          </div>
          <div>
            <strong>Reservation stages:</strong>{" "}
            {reservationStageFilter?.stages?.length
              ? `${reservationStageFilter.stages.length} stage(s) selected`
              : "None selected"}
          </div>
        </div>
      </div>
    </div>
  )
}
