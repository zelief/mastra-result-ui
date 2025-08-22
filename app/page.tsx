"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [workflowRunId, setWorkflowRunId] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (workflowRunId.trim()) {
      router.push(`/${workflowRunId.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-foreground text-center mb-6">
            Sourcing Workflow Results
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="workflowRunId" className="block text-sm font-medium text-foreground mb-2">
                Workflow Run ID
              </label>
              <input
                id="workflowRunId"
                type="text"
                placeholder="Enter workflow run ID"
                value={workflowRunId}
                onChange={(e) => setWorkflowRunId(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              View Results
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
