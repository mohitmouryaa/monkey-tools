import type { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";
import { HeroView } from "@/modules/hero/ui/views/hero-view";

export const metadata: Metadata = {
  title: "Monkey Tools - Free Online Tools for Everyone",
  description:
    "We offer PDF, text, image and other online tools to make your life easier. Fast, secure, no sign-up required. Convert, compress, merge files in seconds.",
  keywords: "online tools, free tools, pdf tools, image tools, text tools, converter, compressor",
  openGraph: {
    title: "Monkey Tools - Free Online Tools",
    description: "Free PDF, text, and image tools to make your life easier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monkey Tools - Free Online Tools",
    description: "Free PDF, text, and image tools to make your life easier",
  },
};

export default async function Home() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <HeroView />
    </ErrorBoundary>
  );
}
