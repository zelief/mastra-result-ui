import { SourcingRequestView } from "@/components/sourcing-request-view"

interface PageProps {
    params: {
        workflow_run_id: string
    }
}

export default function WorkflowRunPage({ params }: PageProps) {
    return (
        <div className="min-h-screen bg-background">
            <SourcingRequestView workflowRunId={params.workflow_run_id} />
        </div>
    )
}
