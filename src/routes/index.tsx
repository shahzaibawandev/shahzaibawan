import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shahzaib Awan — Frontend Developer & AI Automation Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Shahzaib Awan: frontend developer building fast web apps, AI automations and custom AI agents.",
      },
      { property: "og:title", content: "Shahzaib Awan — Frontend Developer & AI Agents" },
      {
        property: "og:description",
        content: "Frontend development, AI automation workflows and AI agents that ship real results.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
