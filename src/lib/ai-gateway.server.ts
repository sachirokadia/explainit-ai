import { createOpenAI } from "@ai-sdk/openai";

const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim();

  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(RUN_ID_HEADER)) headers.set(RUN_ID_HEADER, runId);

      const response = await fetch(input, { ...init, headers });
      const returnedRunId = response.headers.get(RUN_ID_HEADER)?.trim();
      if (!runId && returnedRunId) runId = returnedRunId;
      return response;
    },
  };
}

export function createLovableAiGatewayClient(apiKey: string) {
  const runIdFetch = createLovableAiGatewayRunIdFetch();

  return createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });
}