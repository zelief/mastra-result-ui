const API_BASE = process.env.NEXT_PUBLIC_SUPPLIER_MASTRA_API_URL;

export interface Message {
  role: string;
  content: string;
}

export interface Goal {
  description: string;
  status: "BACKLOG" | "IN_PROGRESS" | "COMPLETED" | "ESCALATED";
}

export interface Item {
  itemDescription: string;
  price?: number;
  moq?: number;
  leadTimeInDays?: number;
  dimensions?: string;
  weightInKg?: number;
  packaging?: string;
}

export interface EscalationSummary {
  summary: string;
  datetime: string;
}

export interface SupplierAgentState {
  originalItem: Item;
  supplierVerifiedItem: Item;
  goals: Goal[];
  escalationSummaries?: EscalationSummary[];
}

export interface WorkflowInput {
  state: SupplierAgentState;
  conversation: Message[];
}

export interface WorkflowOutput {
  state: SupplierAgentState;
  conversation: Message[];
}

export async function runSupplierCommunicationWorkflow(
  input: WorkflowInput,
  language: "english" | "chinese" = "english"
): Promise<WorkflowOutput> {
  const workflowId =
    language === "chinese"
      ? "supplierCommunicationChineseWorkflow"
      : "supplierCommunicationWorkflow";

  const response = await fetch(
    `${API_BASE}/api/workflows/${workflowId}/start-async`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputData: input, runtimeContext: {} }),
    }
  );

  if (!response.ok) {
    throw new Error(`Workflow execution failed: ${response.statusText}`);
  }

  return response.json().then((data) => data.result);
}
