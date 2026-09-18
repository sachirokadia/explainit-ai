# ExplainIt AI MVP

## User-facing result
- Replace the starter placeholder with a polished, responsive ExplainIt AI page.
- Add a focused topic input, suggestion chips, loading/error states, and five explanation cards.
- Add copy actions per card and a simpler follow-up action that refreshes the current explanations.

## Implementation
- Define a warm, light educational visual system in `src/styles.css` with semantic tokens, typography, soft gradients, motion, and responsive layout utilities.
- Build the page in `src/routes/index.tsx` with React state for topic, results, loading, errors, copy feedback, and simplification.
- Add a server-only `createServerFn` in `src/lib/explain.functions.ts` that calls Lovable AI with the required server-side key and returns structured explanation text without exposing secrets.
- Add unique page metadata for the home route and update root metadata to remove template branding.

## Verification
- Confirm the app builds cleanly.
- Exercise the public UI at desktop and mobile sizes, including suggestions, loading/error behavior, copy actions, and the server-backed explanation flow where the gateway is available.
