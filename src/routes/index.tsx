import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Baby,
  Check,
  ChevronRight,
  CircleAlert,
  Clipboard,
  Copy,
  FlaskConical,
  Globe2,
  Lightbulb,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { explainTopic, type Explanation } from "@/lib/explain.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExplainIt AI — Understand Anything. Instantly." },
      {
        name: "description",
        content: "From blockchain to quantum physics, get explanations that actually make sense.",
      },
      { property: "og:title", content: "ExplainIt AI — Understand Anything. Instantly." },
      {
        property: "og:description",
        content: "From blockchain to quantum physics, get explanations that actually make sense.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type ExplanationKey = keyof Explanation;

const suggestions = ["Blockchain", "Quantum Computing", "APIs", "Machine Learning"];

const cards: Array<{
  key: ExplanationKey;
  label: string;
  icon: LucideIcon;
  accent: string;
  surface: string;
}> = [
  { key: "eli5", label: "Explain Like I’m 5", icon: Baby, accent: "text-coral", surface: "bg-surface-peach" },
  { key: "simple", label: "Simple Explanation", icon: Lightbulb, accent: "text-mint", surface: "bg-surface-mint" },
  { key: "technical", label: "Technical Explanation", icon: FlaskConical, accent: "text-lilac", surface: "bg-surface-lilac" },
  { key: "example", label: "Real-World Example", icon: Globe2, accent: "text-sky", surface: "bg-surface-sky" },
  { key: "summary", label: "30-Second Summary", icon: Zap, accent: "text-sun", surface: "bg-surface-warm" },
];

function Index() {
  const callExplain = useServerFn(explainTopic);
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<Explanation | null>(null);
  const [loading, setLoading] = useState(false);
  const [simplifying, setSimplifying] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<ExplanationKey | null>(null);

  async function handleExplain(event?: FormEvent) {
    event?.preventDefault();
    const trimmedTopic = topic.trim();
    if (!trimmedTopic || loading || simplifying) return;

    setError("");
    setCopied(null);
    setLoading(true);
    try {
      const next = await callExplain({
        data: { topic: trimmedTopic, simplify: false, current: null },
      });
      setResults(next);
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }

  async function handleSimplify() {
    if (!results || loading || simplifying) return;

    setError("");
    setCopied(null);
    setSimplifying(true);
    try {
      const next = await callExplain({
        data: { topic: topic.trim(), simplify: true, current: results },
      });
      setResults(next);
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setSimplifying(false);
    }
  }

  async function copyExplanation(key: ExplanationKey) {
    if (!results) return;
    try {
      await navigator.clipboard.writeText(results[key]);
      setCopied(key);
      window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 1800);
    } catch {
      setError("Copying is unavailable in this browser. Select the text and copy it manually.");
    }
  }

  return (
    <main className="explainit-page min-h-screen overflow-hidden">
      <section className="explainit-hero relative border-b border-border/70">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-8 lg:px-10">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <a className="explainit-wordmark inline-flex items-center gap-2 text-sm font-bold text-foreground" href="/">
              <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
                <Sparkles className="size-4" aria-hidden="true" />
              </span>
              ExplainIt<span className="text-coral">.</span>
            </a>
            <Badge variant="outline" className="border-border bg-background/70 px-3 py-1 font-medium text-muted-foreground">
              <span className="mr-2 size-1.5 rounded-full bg-mint" aria-hidden="true" />
              Learn at your level
            </Badge>
          </nav>

          <div className="mx-auto max-w-4xl pt-20 text-center sm:pt-28">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <span className="text-coral">●</span> A clearer way to learn
            </div>
            <h1 className="explainit-display text-balance text-5xl font-bold leading-[0.98] text-foreground sm:text-7xl lg:text-8xl">
              Understand Anything<span className="text-coral">.</span>
              <br />
              <span className="explainit-serif font-normal italic text-foreground/80">Instantly.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              From blockchain to quantum physics — get explanations that actually make sense.
            </p>

            <form onSubmit={handleExplain} className="explainit-form mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-background p-2 text-left sm:mt-12 sm:rounded-3xl sm:p-3">
              <Textarea
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="What do you want to understand?"
                aria-label="What do you want to understand?"
                className="min-h-28 resize-none border-0 bg-transparent px-4 py-4 text-lg leading-7 shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0 sm:min-h-32 sm:px-5 sm:py-5 sm:text-xl"
                disabled={loading || simplifying}
              />
              <div className="flex flex-col gap-3 border-t border-border/70 px-2 pt-3 sm:flex-row sm:items-center sm:justify-between sm:px-3">
                <p className="hidden items-center gap-2 px-2 text-xs text-muted-foreground sm:flex">
                  <Clipboard className="size-3.5" aria-hidden="true" />
                  Clear, useful, no jargon overload
                </p>
                <Button type="submit" size="lg" className="h-12 rounded-xl bg-foreground px-5 text-background shadow-none hover:bg-foreground/90 sm:min-w-36">
                  {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Sparkles className="size-4" aria-hidden="true" />}
                  {loading ? "Thinking…" : "Explain It"}
                  {!loading && <ArrowUpRight className="size-4" aria-hidden="true" />}
                </Button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-xs font-medium text-muted-foreground">Try</span>
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTopic(suggestion)}
                  className="rounded-full border-border bg-background/60 font-medium text-muted-foreground shadow-none hover:border-foreground/30 hover:bg-background hover:text-foreground"
                >
                  {suggestion}
                  <ChevronRight className="size-3" aria-hidden="true" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(loading || results || error) && (
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10" aria-live="polite">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="explainit-wordmark mb-3 text-xs font-bold uppercase text-muted-foreground">Your explanation</p>
              <h2 className="explainit-display max-w-3xl text-3xl font-bold text-foreground sm:text-4xl">
                {topic.trim() || "Your topic"}
              </h2>
            </div>
            {results && !loading && (
              <Button type="button" onClick={handleSimplify} disabled={simplifying} variant="outline" className="w-fit rounded-full border-coral/30 bg-surface-peach px-4 text-foreground shadow-none hover:bg-surface-warm">
                {simplifying ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <span aria-hidden="true">😂</span>}
                {simplifying ? "Making it simpler…" : "Make It Even Simpler"}
              </Button>
            )}
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">We couldn’t explain that just yet.</p>
                <p className="mt-1 text-destructive/80">{error}</p>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const text = results?.[card.key];
              return (
                <article key={card.key} className={`explainit-card rounded-2xl border border-border/70 p-5 sm:p-6 ${card.surface} ${index === 2 ? "md:col-span-2" : ""}`} style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-background/80">
                        <Icon className={`size-5 ${card.accent}`} aria-hidden="true" />
                      </span>
                      <h3 className="font-semibold text-foreground">{card.label}</h3>
                    </div>
                    {text && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => copyExplanation(card.key)}
                        className="-mr-2 -mt-2 shrink-0 rounded-lg text-muted-foreground hover:bg-background/70 hover:text-foreground"
                        aria-label={`Copy ${card.label}`}
                      >
                        {copied === card.key ? <Check className="size-4 text-mint" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                        <span className="hidden sm:inline">{copied === card.key ? "Copied" : "Copy"}</span>
                      </Button>
                    )}
                  </div>
                  {text ? (
                    <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/80">{text}</p>
                  ) : (
                    <div className="mt-5 space-y-2.5" aria-label="Generating explanation">
                      <div className="explainit-skeleton h-3 w-full rounded-full" />
                      <div className="explainit-skeleton h-3 w-11/12 rounded-full" />
                      <div className="explainit-skeleton h-3 w-2/3 rounded-full" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      <footer className="mx-auto flex max-w-6xl items-center justify-between border-t border-border/70 px-5 py-8 text-xs text-muted-foreground sm:px-8 lg:px-10">
        <span className="explainit-wordmark font-bold text-foreground/70">ExplainIt<span className="text-coral">.</span></span>
        <span>Built for curious minds.</span>
      </footer>
    </main>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong while generating your explanation. Please try again.";
}