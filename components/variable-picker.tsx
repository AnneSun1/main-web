"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus } from "lucide-react"
import { variablesService, type Variable } from "../services/variables-service"

interface VariablePickerProps {
  onVariableSelect: (variable: Variable) => void
  buttonText?: string
  buttonVariant?: "default" | "outline" | "ghost"
  buttonSize?: "sm" | "default" | "lg"
}

export function VariablePicker({
  onVariableSelect,
  buttonText = "Add variable",
  buttonVariant = "outline",
  buttonSize = "sm",
}: VariablePickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const categories = variablesService.getVariablesByCategory()
  const filteredCategories = searchQuery
    ? [
        {
          id: "search",
          name: "Search Results",
          variables: variablesService.searchVariables(searchQuery),
        },
      ]
    : categories

  const handleVariableSelect = (variable: Variable) => {
    onVariableSelect(variable)
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className="text-blue-600 border-blue-200 hover:bg-blue-50">
          <Plus className="w-4 h-4 mr-1" />
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto" align="end" side="bottom">
        {/* Search */}
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search variables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>

        {/* Variables by Category */}
        <div className="max-h-80 overflow-y-auto">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.id}>
              {categoryIndex > 0 && <DropdownMenuSeparator />}

              <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                {category.name}
              </DropdownMenuLabel>

              {category.variables.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 italic">No variables found</div>
              ) : (
                category.variables.map((variable) => (
                  <DropdownMenuItem
                    key={variable.id}
                    onClick={() => handleVariableSelect(variable)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-900">{variable.name}</span>
                        <code className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                          {`{{${variable.id}}}`}
                        </code>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{variable.description}</p>
                      <p className="text-xs text-gray-500 italic">Example: {variable.example}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-gray-500 text-center">
          {variablesService.getAllVariables().length} variables available
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
