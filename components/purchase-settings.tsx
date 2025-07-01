"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Info, Calendar } from "lucide-react"
import type { PurchaseSettings } from "../types/guest-guide"

interface PurchaseSettingsProps {
  settings?: PurchaseSettings
  onChange: (settings: PurchaseSettings) => void
}

export function PurchaseSettingsForm({ settings, onChange }: PurchaseSettingsProps) {
  const currentSettings: PurchaseSettings = {
    rate_type: "free",
    price: 0,
    unit_type: "per_item",
    set_minimum_price: false,
    minimum_price: 0,
    days_covered_by_minimum: 1,
    ...settings,
  }

  const handleChange = (field: keyof PurchaseSettings, value: any) => {
    const updatedSettings = { ...currentSettings, [field]: value }

    // Auto-set price to 0 when rate type is free
    if (field === "rate_type" && value === "free") {
      updatedSettings.price = 0
    }

    onChange(updatedSettings)
  }

  const calculatePayout = (price: number) => {
    const processingFee = price * 0.09 // 9% processing fee
    return {
      price,
      processingFee: Math.round(processingFee * 100) / 100,
      payout: Math.round((price - processingFee) * 100) / 100,
    }
  }

  const payout = calculatePayout(currentSettings.price)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-6">
        {/* Rate Type */}
        <div className="space-y-2">
          <Label className="text-base font-medium text-gray-900">Rate type</Label>
          <Select
            value={currentSettings.rate_type}
            onValueChange={(value: "free" | "fixed_price" | "per_unit_price") => handleChange("rate_type", value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="fixed_price">Fixed Price</SelectItem>
              <SelectItem value="per_unit_price">Per Unit Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price and Unit Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={currentSettings.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value) || 0)}
                className="pl-8 h-12 text-lg"
                disabled={currentSettings.rate_type === "free"}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Price shown here is the price the guests will pay</span>
            </div>
          </div>

          {currentSettings.rate_type === "per_unit_price" && (
            <div className="space-y-2">
              <Label className="text-base font-medium text-gray-900">Unit</Label>
              <Select
                value={currentSettings.unit_type || "per_item"}
                onValueChange={(value: "per_day" | "per_hour" | "per_item") => handleChange("unit_type", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_day">Per day</SelectItem>
                  <SelectItem value="per_hour">Per hour</SelectItem>
                  <SelectItem value="per_item">Per item</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Set Minimum Price Toggle */}
        {currentSettings.rate_type === "per_unit_price" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={currentSettings.set_minimum_price || false}
                onCheckedChange={(checked) => handleChange("set_minimum_price", checked)}
              />
              <Label className="text-base font-medium text-gray-900">Set Minimum Price</Label>
            </div>

            {currentSettings.set_minimum_price && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                <h5 className="text-lg font-semibold text-gray-900">Minimum Price Configuration</h5>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Minimum Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={currentSettings.minimum_price || 0}
                      onChange={(e) => handleChange("minimum_price", Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                      placeholder="Minimum Price"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Minimum amount customer must pay regardless of stay length
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Days Covered by Minimum</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="number"
                        min="1"
                        value={currentSettings.days_covered_by_minimum || 1}
                        onChange={(e) => handleChange("days_covered_by_minimum", Number.parseInt(e.target.value) || 1)}
                        className="pl-10"
                        placeholder="Days Covered by Minimum"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Number of days covered by the minimum price</p>
                  </div>
                </div>

                {/* Price Formula */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Price formula: max(daysCovered, stayLength) - daysCovered) × dailyRate + minPrice
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payout Breakdown */}
        {currentSettings.price > 0 && (
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-base font-semibold text-gray-900">Payout breakdown</h5>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Price</span>
                  <span className="font-medium">${payout.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Processing fee</span>
                  <span className="font-medium">${payout.processingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Your payout</span>
                    <span className="font-semibold text-gray-900">${payout.payout.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Price Configuration Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h6 className="text-base font-semibold text-blue-900 mb-2">Price Configuration</h6>
            <p className="text-sm text-blue-800 leading-relaxed">
              Items with price set to 0 are still purchasable but offered at no cost (e.g., guest registration). For
              daily rate items, the minimum price ensures you cover your initial costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
