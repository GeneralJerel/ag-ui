// Agent skills loaded from open-generative-ui at build time.
// These instruct the agent on how to use Excalidraw MCP tools,
// generate SVG diagrams, interactive widgets, and more.

import { readFileSync } from "fs";
import { join } from "path";

const SKILLS_DIR = join(process.cwd(), "../../references/open-generative-ui/apps/agent/skills");

function loadSkill(filename: string): string {
  try {
    return readFileSync(join(SKILLS_DIR, filename), "utf-8");
  } catch {
    return "";
  }
}

export const AGENT_SKILLS = [
  loadSkill("excalidraw-diagram-skill.txt"),
  loadSkill("svg-diagram-skill.txt"),
  loadSkill("master-agent-playbook.txt"),
  loadSkill("agent-skills-vol2.txt"),
].filter(Boolean).join("\n\n---\n\n");
