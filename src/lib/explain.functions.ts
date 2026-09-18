import { createServerFn } from "@tanstack/react-start";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayClient } from "./ai-gateway.server";

const explanationSchema = z.object({
  eli5: z.string(),
  simple: z.string(),
  technical: z.string(),
  example: z.string(),
  summary: z.string(),
});

const explainInputSchema = z.object({
  topic: z.string(),
  simplify: z.boolean(),
  current: explanationSchema.nullable(),
});

export type Explanation = z.infer<typeof explanationSchema>;

export const explainTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => explainInputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("The explanation service is not configured yet.");

    const gateway = createLovableAiGatewayClient(apiKey);
    const prompt = data.simplify
      ? `Make these five explanations about "${data.topic}" even simpler. Keep the same five fields, use friendly everyday language, and avoid jargon. Make each field 1–3 short sentences. Return only the requested structured result.\n\nCurrent explanations:\n${JSON.stringify(data.current)}`
      : `Explain "${data.topic}" for a curious learner at five different levels. Be accurate, warm, and concise. Keep each field to 2–4 short sentences. The technical explanation may use correct terminology, but define it. The real-world example should feel concrete. Return only the requested structured result.`;

    try {
      const result = streamText({
        model: gateway.responses("openai/gpt-6-astra"),
        output: Output.object({ schema: explanationSchema }),
        prompt,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });

      return await result.output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        const rawText = error.text?.trim();
        if (rawText) {
          try {
            const parsed = explanationSchema.safeParse(JSON.parse(rawText));
            if (parsed.success) return parsed.data;
          } catch {
            // The server returns a clear retry message below when the model's shape is unusable.
          }
        }
        throw new Error("The explanation came back in an unreadable format. Please try again.");
      }

      throw error;
    }
  });