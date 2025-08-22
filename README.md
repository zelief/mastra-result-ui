# Mastra Result UI

A Next.js application for viewing sourcing workflow results from Mastra.

## Features

- Dynamic routing with workflow run ID (`/:workflow_run_id`)
- Fetches data from Mastra API endpoint
- Displays sourcing workflow results with product analysis
- Responsive design with modern UI components

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Home Page**: Enter a workflow run ID in the form to view results
2. **Dynamic Route**: Navigate directly to `/{workflow_run_id}` to view specific workflow results

## API Integration

The application fetches data from:

```
http://localhost:4111/api/workflows/sourcingWorkflow/runs/:workflow_run_id
```

The response should contain a `snapshot.result` field that matches the `SourcingWorkflowOutput` type.

## Project Structure

- `app/[workflow_run_id]/page.tsx` - Dynamic route page
- `app/page.tsx` - Home page with workflow ID input
- `components/sourcing-request-view.tsx` - Main component for displaying results
- `types/sourcing-workflow-output.ts` - TypeScript types for workflow data

## Development

- Built with Next.js 15
- Uses TypeScript for type safety
- Styled with Tailwind CSS
- UI components from shadcn/ui
