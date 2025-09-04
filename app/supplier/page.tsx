"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Item, Goal } from "@/lib/api"

export default function SupplierEntryPage() {
  const router = useRouter()
  const [originalItem, setOriginalItem] = useState<Item>({
    itemDescription: "Custom wireless Bluetooth earbuds with noise cancellation",
    price: 25.50,
    moq: 1000,
    leadTimeInDays: 15,
    dimensions: "2.5cm x 1.8cm x 1.2cm",
    weightInKg: 0.008,
    packaging: "Individual retail boxes with custom branding"
  })
  const [goals, setGoals] = useState<Goal[]>([
    { description: "Negotiate price to under $23 per unit", status: "BACKLOG" },
    { description: "Confirm product specifications and quality standards", status: "BACKLOG" },
    { description: "Discuss customization options for branding and packaging", status: "BACKLOG" }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleItemChange = (field: keyof Item, value: string | number) => {
    setOriginalItem(prev => ({
      ...prev,
      [field]: field === 'itemDescription' || field === 'dimensions' || field === 'packaging'
        ? value
        : value === '' ? undefined : Number(value)
    }))
  }

  const handleGoalChange = (index: number, description: string) => {
    setGoals(prev => prev.map((goal, i) =>
      i === index ? { ...goal, description } : goal
    ))
  }

  const addGoal = () => {
    setGoals(prev => [...prev, { description: "", status: "BACKLOG" }])
  }

  const removeGoal = (index: number) => {
    setGoals(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!originalItem.itemDescription.trim()) {
      alert("Please provide an item description")
      return
    }

    const validGoals = goals.filter(goal => goal.description.trim())
    if (validGoals.length === 0) {
      alert("Please provide at least one goal")
      return
    }

    setIsSubmitting(true)

    try {
      const chatId = Date.now().toString()
      const initialState = {
        originalItem,
        supplierVerifiedItem: {
          itemDescription: originalItem.itemDescription,
        },
        goals: validGoals.map((goal, index) => ({
          ...goal,
          status: index === 0 ? "IN_PROGRESS" as const : "BACKLOG" as const
        })),
        escalationSummaries: []
      }

      localStorage.setItem(`supplier-chat-${chatId}`, JSON.stringify({
        state: initialState,
        conversation: []
      }))

      router.push(`/supplier/chat/${chatId}`)
    } catch (error) {
      console.error('Error starting chat:', error)
      alert('Failed to start chat. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold text-foreground mb-6">
            Supplier Communication Setup
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Original Item Section */}
            <div>
              <h2 className="text-lg font-medium text-foreground mb-4">Original Item</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Item Description *
                  </label>
                  <Input
                    value={originalItem.itemDescription}
                    onChange={(e) => handleItemChange('itemDescription', e.target.value)}
                    placeholder="Describe the item you want to source"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Price ($)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={originalItem.price || ""}
                      onChange={(e) => handleItemChange('price', e.target.value)}
                      placeholder="Target price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      MOQ (Minimum Order Quantity)
                    </label>
                    <Input
                      type="number"
                      value={originalItem.moq || ""}
                      onChange={(e) => handleItemChange('moq', e.target.value)}
                      placeholder="Minimum order quantity"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Lead Time (days)
                    </label>
                    <Input
                      type="number"
                      value={originalItem.leadTimeInDays || ""}
                      onChange={(e) => handleItemChange('leadTimeInDays', e.target.value)}
                      placeholder="Lead time in days"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Weight (kg)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={originalItem.weightInKg || ""}
                      onChange={(e) => handleItemChange('weightInKg', e.target.value)}
                      placeholder="Weight in kg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Dimensions
                    </label>
                    <Input
                      value={originalItem.dimensions || ""}
                      onChange={(e) => handleItemChange('dimensions', e.target.value)}
                      placeholder="e.g., 10cm x 5cm x 2cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Packaging
                    </label>
                    <Input
                      value={originalItem.packaging || ""}
                      onChange={(e) => handleItemChange('packaging', e.target.value)}
                      placeholder="Packaging requirements"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div>
              <h2 className="text-lg font-medium text-foreground mb-4">Communication Goals</h2>
              <div className="space-y-3">
                {goals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={goal.description}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                      placeholder="What do you want to achieve with the supplier?"
                      className="flex-1"
                    />
                    {goals.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeGoal(index)}
                        className="px-3"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addGoal}
                  className="w-full"
                >
                  Add Another Goal
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Starting Chat..." : "Start Supplier Chat"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}