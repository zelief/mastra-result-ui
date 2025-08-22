import { SourcingRequestView } from "@/components/sourcing-request-view"

interface PageProps {
    params: Promise<{
        workflow_run_id: string
    }>
}

export default async function WorkflowRunPage({ params }: PageProps) {
    const { workflow_run_id } = await params

    return (
        <div className="min-h-screen bg-background">
            <SourcingRequestView workflowRunId={workflow_run_id} />
        </div>
    )
}
