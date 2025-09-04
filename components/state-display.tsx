"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SupplierAgentState } from "@/lib/api"

interface StateDisplayProps {
  state: SupplierAgentState
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'default' // green-ish
    case 'IN_PROGRESS':
      return 'secondary' // blue-ish
    case 'ESCALATED':
      return 'destructive' // red-ish
    case 'BACKLOG':
      return 'outline' // neutral
    default:
      return 'outline'
  }
}

export function StateDisplay({ state }: StateDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Goals Section */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Communication Goals</h3>
        <div className="space-y-2">
          {state.goals.map((goal, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge variant={getStatusVariant(goal.status)}>
                {goal.status.replace('_', ' ')}
              </Badge>
              <span className="text-sm text-foreground">{goal.description}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Original Item */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Original Item</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Description:</span>{" "}
            <span className="text-foreground">{state.originalItem.itemDescription}</span>
          </div>
          {state.originalItem.price && (
            <div>
              <span className="font-medium">Price:</span>{" "}
              <span className="text-foreground">${state.originalItem.price}</span>
            </div>
          )}
          {state.originalItem.moq && (
            <div>
              <span className="font-medium">MOQ:</span>{" "}
              <span className="text-foreground">{state.originalItem.moq}</span>
            </div>
          )}
          {state.originalItem.leadTimeInDays && (
            <div>
              <span className="font-medium">Lead Time:</span>{" "}
              <span className="text-foreground">{state.originalItem.leadTimeInDays} days</span>
            </div>
          )}
          {state.originalItem.dimensions && (
            <div>
              <span className="font-medium">Dimensions:</span>{" "}
              <span className="text-foreground">{state.originalItem.dimensions}</span>
            </div>
          )}
          {state.originalItem.weightInKg && (
            <div>
              <span className="font-medium">Weight:</span>{" "}
              <span className="text-foreground">{state.originalItem.weightInKg} kg</span>
            </div>
          )}
          {state.originalItem.packaging && (
            <div>
              <span className="font-medium">Packaging:</span>{" "}
              <span className="text-foreground">{state.originalItem.packaging}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Supplier Verified Item */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Supplier Verified Item</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Description:</span>{" "}
            <span className="text-foreground">{state.supplierVerifiedItem.itemDescription}</span>
          </div>
          {state.supplierVerifiedItem.price && (
            <div>
              <span className="font-medium">Price:</span>{" "}
              <span className="text-foreground">${state.supplierVerifiedItem.price}</span>
            </div>
          )}
          {state.supplierVerifiedItem.moq && (
            <div>
              <span className="font-medium">MOQ:</span>{" "}
              <span className="text-foreground">{state.supplierVerifiedItem.moq}</span>
            </div>
          )}
          {state.supplierVerifiedItem.leadTimeInDays && (
            <div>
              <span className="font-medium">Lead Time:</span>{" "}
              <span className="text-foreground">{state.supplierVerifiedItem.leadTimeInDays} days</span>
            </div>
          )}
          {state.supplierVerifiedItem.dimensions && (
            <div>
              <span className="font-medium">Dimensions:</span>{" "}
              <span className="text-foreground">{state.supplierVerifiedItem.dimensions}</span>
            </div>
          )}
          {state.supplierVerifiedItem.weightInKg && (
            <div>
              <span className="font-medium">Weight:</span>{" "}
              <span className="text-foreground">{state.supplierVerifiedItem.weightInKg} kg</span>
            </div>
          )}
          {state.supplierVerifiedItem.packaging && (
            <div>
              <span className="font-medium">Packaging:</span>{" "}
              <span className="text-foreground">{state.supplierVerifiedItem.packaging}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Escalation Summaries */}
      {state.escalationSummaries && state.escalationSummaries.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Escalation Summaries</h3>
          <div className="space-y-3">
            {state.escalationSummaries.map((escalation, index) => (
              <div key={index} className="border-l-2 border-destructive pl-3">
                <div className="text-xs text-muted-foreground mb-1">
                  {new Date(escalation.datetime).toLocaleString()}
                </div>
                <div className="text-sm text-foreground">{escalation.summary}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}