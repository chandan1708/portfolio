#!/usr/bin/env node
/**
 * sync-github.mjs
 * Fetches all public repos for GITHUB_USERNAME via the GitHub REST API,
 * extracts project metadata + detects skills from repo topics,
 * then writes public/github-data.json.
 *
 * Run locally:  GITHUB_TOKEN=xxx GITHUB_USERNAME=chandan1708 node scripts/sync-github.mjs
 * Dry-run:      GITHUB_TOKEN=xxx GITHUB_USERNAME=chandan1708 node scripts/sync-github.mjs --dry-run
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_PAT || "";
const USERNAME = process.env.GITHUB_USERNAME || "chandan1708";
const DRY_RUN = process.argv.includes("--dry-run");

/* ─── Curated fallback seed (projects that may have no GitHub description) ── */
const CURATED_PROJECTS = {
  alp: {
    title: "ALP Intelligence Surveillance",
    description:
      "Advanced AI Surveillance System with real-time phone usage detection, waste monitoring, and attendance tracking achieving 89% accuracy. Reduced manual oversight by 40%.",
    tags: ["Deep Learning", "Computer Vision", "Real-time"],
    highlight: true,
  },
  accirescue: {
    title: "ACCIRESCUE",
    description:
      "AI-powered accident detection and emergency routing leveraging live CCTV feeds and real-time traffic data, improving emergency response efficiency by 40%.",
    tags: ["Computer Vision", "Real-time Analytics", "Emergency"],
    highlight: false,
  },
  krushi: {
    title: "KrushiAI",
    description:
      "Autonomous ML-driven agricultural rover for real-time field data and crop recommendations. Won 1st Place at Fusion Techathon 3.0, outperforming 104 teams.",
    tags: ["Machine Learning", "IoT", "Autonomous Systems"],
    highlight: true,
  },
};

/* ─── Curated base skills (always present regardless of GitHub topics) ──── */
const BASE_SKILLS = {
  Languages: ["Python", "Java", "C/C++", "EDA"],
  "Deep Learning": [
    "CNN / ANN / RNN",
    "TensorFlow",
    "Transformers",
    "Fine-Tuning (LoRA, QLoRA)",
    "Prompt Engineering",
  ],
  "Agentic AI & RAG": [
    "LangChain",
    "LangGraph",
    "GraphRAG",
    "RAFT",
    "CAG",
    "BLEU Evaluation",
  ],
  Infrastructure: [
    "MySQL",
    "MongoDB",
    "Chroma DB",
    "Astra DB",
    "AWS",
    "FastAPI",
    "Django REST",
  ],
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */
async function ghFetch(path) {
  const headers = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Fetch all public repos (handles pagination) */
async function fetchAllRepos() {
  let page = 1;
  const all = [];
  while (true) {
    const repos = await ghFetch(
      `/users/${USERNAME}/repos?type=public&sort=pushed&per_page=100&page=${page}`
    );
    all.push(...repos);
    if (repos.length < 100) break;
    page++;
  }
  return all;
}

/** Fetch topics for a single repo */
async function fetchTopics(repoName) {
  try {
    const data = await ghFetch(
      `/repos/${USERNAME}/${repoName}/topics`
    );
    return data.names || [];
  } catch {
    return [];
  }
}

/** Map a list of topic strings → new skills per category */
function detectSkillsFromTopics(topics, skillMap) {
  const detected = {};
  for (const [category, topicList] of Object.entries(skillMap)) {
    if (category === "_comment") continue;
    for (const topic of topics) {
      if (topicList.map((t) => t.toLowerCase()).includes(topic.toLowerCase())) {
        if (!detected[category]) detected[category] = new Set();
        // Use the display name from the topic (capitalised nicely)
        detected[category].add(
          topic.charAt(0).toUpperCase() + topic.slice(1).replace(/-/g, " ")
        );
      }
    }
  }
  return detected;
}

/** Merge detected skills into base skills, avoiding duplicates */
function mergeSkills(base, detected) {
  const merged = {};
  for (const [cat, skills] of Object.entries(base)) {
    const existing = new Set(skills.map((s) => s.toLowerCase()));
    const newSkills = [...(detected[cat] || [])].filter(
      (s) => !existing.has(s.toLowerCase())
    );
    merged[cat] = [...skills, ...newSkills];
  }
  return merged;
}

/** Convert a repo name or full_name to a clean display title */
function repoToTitle(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Match a repo to a curated key (fuzzy match) */
function matchCuratedKey(repoName) {
  const lower = repoName.toLowerCase();
  if (lower.includes("alp")) return "alp";
  if (lower.includes("acci") || lower.includes("rescue")) return "accirescue";
  if (lower.includes("krushi") || lower.includes("krishi")) return "krushi";
  return null;
}

/* ─── Main ─────────────────────────────────────────────────────────────── */
async function main() {
  console.log(`🔄 Syncing GitHub repos for @${USERNAME}...`);

  const skillMap = JSON.parse(
    readFileSync(join(__dirname, "skill-map.json"), "utf8")
  );

  // 1. Fetch repos
  let repos = await fetchAllRepos();

  // Filter: skip forks and repos without descriptions, keep non-empty
  repos = repos.filter(
    (r) => !r.fork && r.name !== USERNAME // skip profile repo itself
  );

  console.log(`   Found ${repos.length} public non-fork repos`);

  // 2. Fetch topics for each repo (in parallel, max 5 at a time)
  const topicsPerRepo = {};
  const chunks = [];
  for (let i = 0; i < repos.length; i += 5) chunks.push(repos.slice(i, i + 5));

  for (const chunk of chunks) {
    const results = await Promise.all(
      chunk.map(async (r) => [r.name, await fetchTopics(r.name)])
    );
    for (const [name, topics] of results) topicsPerRepo[name] = topics;
  }

  // 3. Build projects list
  // Start from curated seed, then add any new GitHub repos on top
  const curatedKeys = new Set(Object.keys(CURATED_PROJECTS));
  const newGhProjects = [];

  for (const repo of repos) {
    const curatedKey = matchCuratedKey(repo.name);
    if (curatedKey) continue; // already in curated list

    // Include repos that have a description (skip nameless experiments)
    if (!repo.description) continue;

    const topics = topicsPerRepo[repo.name] || [];
    const humanTags = topics
      .slice(0, 4)
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " "));

    newGhProjects.push({
      key: repo.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      title: repo.full_name
        ? repoToTitle(repo.name)
        : repo.name,
      description: repo.description,
      tags: humanTags.length ? humanTags : ["Open Source"],
      github: repo.html_url,
      demo: repo.homepage || "",
      highlight: repo.stargazers_count > 0,
    });
  }

  // Merge: curated first, then new GitHub repos
  const curatedList = Object.entries(CURATED_PROJECTS).map(([key, data]) => {
    // Try to pick up GitHub URL from matching repo
    const matchedRepo = repos.find((r) => matchCuratedKey(r.name) === key);
    return {
      key,
      ...data,
      github: matchedRepo ? matchedRepo.html_url : "",
      demo: matchedRepo?.homepage || "",
    };
  });

  const allProjects = [...curatedList, ...newGhProjects].map((p, i) => ({
    number: String(i + 1).padStart(2, "0"),
    ...p,
  }));

  // 4. Detect & merge skills
  const allTopics = Object.values(topicsPerRepo).flat();
  const detectedSkills = detectSkillsFromTopics(allTopics, skillMap);
  const mergedSkills = mergeSkills(BASE_SKILLS, detectedSkills);

  // 5. Build output
  const output = {
    _note:
      "Auto-generated by scripts/sync-github.mjs — do not edit manually. Will be overwritten on next sync.",
    lastUpdated: new Date().toISOString(),
    projects: allProjects,
    skills: mergedSkills,
  };

  if (DRY_RUN) {
    console.log("\n📋 DRY RUN — would write public/github-data.json:\n");
    console.log(JSON.stringify(output, null, 2));
    console.log("\n✅ Dry run complete.");
    return;
  }

  const outputPath = join(ROOT, "public", "github-data.json");
  writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
  console.log(`✅ Written → ${outputPath}`);
  console.log(`   Projects: ${allProjects.length} | New from GitHub: ${newGhProjects.length}`);
}

main().catch((err) => {
  console.error("❌ Sync failed:", err.message);
  process.exit(1);
});
