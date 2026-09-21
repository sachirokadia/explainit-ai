import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Cloud,
  Code2,
  Coins,
  Globe2,
  KeyRound,
  Lightbulb,
  Network,
  Orbit,
  Radio,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Popular Topics — ExplainIt AI" },
      {
        name: "description",
        content: "Browse popular concepts and get a clear, AI-powered explanation for any of them.",
      },
      { property: "og:title", content: "Popular Topics — ExplainIt AI" },
      {
        property: "og:description",
        content: "Browse popular concepts and get a clear, AI-powered explanation for any of them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Topics,
});

type Topic = {
  title: string;
  category: string;
  preview: string;
  icon: LucideIcon;
  accent: string;
  surface: string;
};

const topics: Topic[] = [
  {
    title: "Artificial Intelligence",
    category: "Technology",
    preview: "Machines learning patterns from data to make predictions, decisions, or create things.",
    icon: BrainCircuit,
    accent: "text-lilac",
    surface: "bg-surface-lilac",
  },
  {
    title: "Quantum Computing",
    category: "Science",
    preview: "A new kind of computing that uses quantum behavior to explore many possibilities at once.",
    icon: Atom,
    accent: "text-sky",
    surface: "bg-surface-sky",
  },
  {
    title: "Blockchain",
    category: "Technology",
    preview: "A shared digital record that makes it possible to track changes without one central owner.",
    icon: Network,
    accent: "text-mint",
    surface: "bg-surface-mint",
  },
  {
    title: "How the Internet Works",
    category: "Everyday Tech",
    preview: "A worldwide network that moves small packets of information between connected devices.",
    icon: Globe2,
    accent: "text-sky",
    surface: "bg-surface-sky",
  },
  {
    title: "Machine Learning",
    category: "Technology",
    preview: "A way for software to improve at a task by finding useful patterns in examples.",
    icon: Orbit,
    accent: "text-coral",
    surface: "bg-surface-peach",
  },
  {
    title: "APIs",
    category: "Software",
    preview: "A set of rules that lets separate pieces of software ask each other for information or actions.",
    icon: Code2,
    accent: "text-sun",
    surface: "bg-surface-warm",
  },
  {
    title: "Cloud Computing",
    category: "Everyday Tech",
    preview: "Using remote computers over the internet instead of relying only on the device in front of you.",
    icon: Cloud,
    accent: "text-sky",
    surface: "bg-surface-sky",
  },
  {
    title: "Cryptography",
    category: "Security",
    preview: "The art of protecting information by turning it into a form only the right people can read.",
    icon: KeyRound,
    accent: "text-coral",
    surface: "bg-surface-peach",
  },
  {
    title: "The Stock Market",
    category: "Money",
    preview: "A marketplace where people buy and sell small ownership shares in public companies.",
    icon: Coins,
    accent: "text-mint",
    surface: "bg-surface-mint",
  },
  {
    title: "Climate Change",
    category: "Our World",
    preview: "Long-term shifts in Earth’s climate, driven today mainly by heat-trapping gases from human activity.",
    icon: Radio,
    accent: "text-sun",
    surface: "bg-surface-warm",
  },
];

function Topics() {
  return (
    <main className="explainit-page min-h-screen overflow-hidden">
      <section className="explainit-hero border-b border-border/70">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:px-10">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <Link className="explainit-wordmark inline-flex items-center gap-2 text-sm font-bold text-foreground" to="/">
              <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
                <Sparkles className="size-4" aria-hidden="true" />
              </span>
              ExplainIt<span className="text-coral">.</span>
            </Link>
            <Button asChild variant="outline" className="rounded-full border-border bg-background/70 shadow-none">
              <Link to="/">
                Explain a topic
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </nav>

          <div className="max-w-3xl pt-16 sm:pt-24">
            <Badge variant="outline" className="border-border bg-background/70 px-3 py-1 font-medium text-muted-foreground">
              <span className="mr-2 size-1.5 rounded-full bg-coral" aria-hidden="true" />
              The curious list
            </Badge>
            <h1 className="explainit-display mt-6 text-balance text-5xl font-bold leading-[0.98] text-foreground sm:text-7xl">
              Start with a question<span className="text-coral">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              Browse a few ideas people love to understand. Pick one and ExplainIt will take you from the big picture to the details.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10" aria-labelledby="popular-topics">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="explainit-wordmark mb-3 text-xs font-bold uppercase text-muted-foreground">Browse topics</p>
            <h2 id="popular-topics" className="explainit-display text-3xl font-bold text-foreground sm:text-4xl">
              Popular concepts, made clear.
            </h2>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:block">{topics.length} ideas to explore</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article key={topic.title} className={`group rounded-2xl border border-border/70 p-5 transition-transform duration-200 hover:-translate-y-1 sm:p-6 ${topic.surface}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-background/80">
                    <Icon className={`size-5 ${topic.accent}`} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{topic.category}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold text-foreground">{topic.title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-foreground/75">{topic.preview}</p>
                <Button asChild variant="ghost" className="mt-5 -ml-3 rounded-lg px-3 text-foreground hover:bg-background/70">
                  <Link to="/" search={{ topic: topic.title }}>
                    Explore this topic
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl items-center justify-between border-t border-border/70 px-5 py-8 text-xs text-muted-foreground sm:px-8 lg:px-10">
        <Link className="explainit-wordmark font-bold text-foreground/70" to="/">
          ExplainIt<span className="text-coral">.</span>
        </Link>
        <span>Built for curious minds.</span>
      </footer>
    </main>
  );
}