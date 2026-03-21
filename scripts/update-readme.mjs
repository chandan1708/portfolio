#!/usr/bin/env node
/**
 * update-readme.mjs
 * Reads public/github-data.json, then surgically updates:
 *   - "## — What I Build" section   → project cards table
 *   - "## — The Stack" section       → skill badges
 * in your GitHub profile README (chandan1708/chandan1708), leaving everything else untouched.
 *
 * Run locally:  GITHUB_TOKEN=xxx node scripts/update-readme.mjs
 * Dry-run:      GITHUB_TOKEN=xxx node scripts/update-readme.mjs --dry-run
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_PAT || "";
const PROFILE_REPO = "chandan1708/chandan1708";
const DRY_RUN = process.argv.includes("--dry-run");

/* ─── Shields.io badge map for skills ──────────────────────────────────── */
// Maps skill display name → shields.io badge markdown
// Add more entries here if you add new skills
const BADGE_MAP = {
    // Languages
    Python: "![Python](https://img.shields.io/badge/Python-0d1117?style=for-the-badge&logo=python&logoColor=3776AB)",
    Java: "![Java](https://img.shields.io/badge/Java-0d1117?style=for-the-badge&logo=openjdk&logoColor=ED8B00)",
    "C/C++": "![C++](https://img.shields.io/badge/C++-0d1117?style=for-the-badge&logo=cplusplus&logoColor=00599C)",
    EDA: "![EDA](https://img.shields.io/badge/EDA-0d1117?style=for-the-badge&logo=databricks&logoColor=FF3621)",
    JavaScript: "![JavaScript](https://img.shields.io/badge/JavaScript-0d1117?style=for-the-badge&logo=javascript&logoColor=F7DF1E)",
    TypeScript: "![TypeScript](https://img.shields.io/badge/TypeScript-0d1117?style=for-the-badge&logo=typescript&logoColor=3178C6)",
    Go: "![Go](https://img.shields.io/badge/Go-0d1117?style=for-the-badge&logo=go&logoColor=00ADD8)",
    Rust: "![Rust](https://img.shields.io/badge/Rust-0d1117?style=for-the-badge&logo=rust&logoColor=white)",

    // Deep Learning
    TensorFlow: "![TensorFlow](https://img.shields.io/badge/TensorFlow-0d1117?style=for-the-badge&logo=tensorflow&logoColor=FF6F00)",
    PyTorch: "![PyTorch](https://img.shields.io/badge/PyTorch-0d1117?style=for-the-badge&logo=pytorch&logoColor=EE4C2C)",
    OpenCV: "![OpenCV](https://img.shields.io/badge/OpenCV-0d1117?style=for-the-badge&logo=opencv&logoColor=5C3EE8)",
    "CNN / ANN / RNN": "![CNN/ANN/RNN](https://img.shields.io/badge/CNN%20%2F%20ANN%20%2F%20RNN-0d1117?style=for-the-badge&logo=neural-network&logoColor=white)",
    Transformers: "![Transformers](https://img.shields.io/badge/Transformers-0d1117?style=for-the-badge&logo=huggingface&logoColor=FFD21E)",
    "Fine-Tuning (LoRA, QLoRA)": "![LoRA/QLoRA](https://img.shields.io/badge/LoRA%20%2F%20QLoRA-0d1117?style=for-the-badge&logo=huggingface&logoColor=FFD21E)",
    "Prompt Engineering": "![Prompt Engineering](https://img.shields.io/badge/Prompt%20Engineering-0d1117?style=for-the-badge&logo=openai&logoColor=412991)",

    // Agentic AI & RAG
    LangChain: "![LangChain](https://img.shields.io/badge/LangChain-0d1117?style=for-the-badge&logo=chainlink&logoColor=1C3C3C)",
    LangGraph: "![LangGraph](https://img.shields.io/badge/LangGraph-0d1117?style=for-the-badge&logo=graphql&logoColor=E10098)",
    GraphRAG: "![GraphRAG](https://img.shields.io/badge/GraphRAG-0d1117?style=for-the-badge&logo=neo4j&logoColor=008CC1)",
    RAFT: "![RAFT](https://img.shields.io/badge/RAFT-0d1117?style=for-the-badge&logo=openai&logoColor=412991)",
    CAG: "![CAG](https://img.shields.io/badge/CAG-0d1117?style=for-the-badge&logo=openai&logoColor=412991)",
    "BLEU Evaluation": "![BLEU](https://img.shields.io/badge/BLEU%20Evaluation-0d1117?style=for-the-badge&logo=testcafe&logoColor=white)",

    // Infrastructure
    FastAPI: "![FastAPI](https://img.shields.io/badge/FastAPI-0d1117?style=for-the-badge&logo=fastapi&logoColor=009688)",
    "Django REST": "![DRF](https://img.shields.io/badge/DRF-0d1117?style=for-the-badge&logo=django&logoColor=092E20)",
    AWS: "![AWS](https://img.shields.io/badge/AWS-0d1117?style=for-the-badge&logo=amazonaws&logoColor=FF9900)",
    MongoDB: "![MongoDB](https://img.shields.io/badge/MongoDB-0d1117?style=for-the-badge&logo=mongodb&logoColor=47A248)",
    MySQL: "![MySQL](https://img.shields.io/badge/MySQL-0d1117?style=for-the-badge&logo=mysql&logoColor=4479A1)",
    "Chroma DB": "![ChromaDB](https://img.shields.io/badge/ChromaDB-0d1117?style=for-the-badge&logo=databricks&logoColor=FF3621)",
    "Astra DB": "![AstraDB](https://img.shields.io/badge/AstraDB-0d1117?style=for-the-badge&logo=datastax&logoColor=white)",
    Docker: "![Docker](https://img.shields.io/badge/Docker-0d1117?style=for-the-badge&logo=docker&logoColor=2496ED)",
    Kubernetes: "![Kubernetes](https://img.shields.io/badge/Kubernetes-0d1117?style=for-the-badge&logo=kubernetes&logoColor=326CE5)",
    Redis: "![Redis](https://img.shields.io/badge/Redis-0d1117?style=for-the-badge&logo=redis&logoColor=DC382D)",
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */
async function ghFetch(path, options = {}) {
    const headers = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };
    if (GITHUB_TOKEN) headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com${path}`, {
        ...options,
        headers: { ...headers, ...(options.headers || {}) },
    });
    if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}: ${await res.text()}`);
    return res.json();
}

/** Generate the "What I Build" table rows for allProjects */
function renderProjectsSection(projects) {
    const rows = [];
    for (let i = 0; i < projects.length; i += 2) {
        const left = projects[i];
        const right = projects[i + 1];

        const renderCell = (p) => {
            if (!p) return `<td width="50%" valign="top"></td>`;
            const techBadges = p.tags
                .map((t) => `\`${t}\``)
                .join(" ");
            const viewLink = p.github
                ? `[↗ View Project](${p.github})`
                : `[↗ View Project](#)`;
            return [
                `<td width="50%" valign="top">`,
                ``,
                `### ${p.title ? ` ${p.title}` : ""}`,
                `**${p.description}**`,
                ``,
                (p.tags || []).map((t) => `- ${t}`).join("\n"),
                ``,
                techBadges,
                ``,
                viewLink,
                ``,
                `</td>`,
            ].join("\n");
        };

        rows.push(`<tr>\n${renderCell(left)}\n${renderCell(right)}\n</tr>`);
    }

    return `<table>\n${rows.join("\n")}\n</table>`;
}

/** Generate The Stack section: grouped skill badges */
function renderStackSection(skills) {
    // Category display names in the README style
    const categoryLabels = {
        Languages: "**Core Languages**",
        "Deep Learning": "**AI / ML / DL**",
        "Agentic AI & RAG": "**LLM & RAG**",
        Infrastructure: "**Vector DBs & APIs**",
    };

    const lines = ["<div align=\"center\">", ""];

    for (const [cat, skillList] of Object.entries(skills)) {
        const label = categoryLabels[cat] || `**${cat}**`;
        lines.push(label, "");

        const badges = skillList
            .map((s) => BADGE_MAP[s] || `![${s}](https://img.shields.io/badge/${encodeURIComponent(s)}-0d1117?style=for-the-badge)`)
            .join("\n");
        lines.push(badges, "");
    }

    lines.push("</div>");
    return lines.join("\n");
}

/** Surgically replace a section between two heading markers */
function replaceSection(content, startMarker, endMarker, newBlock) {
    // Match from startMarker line up to (but not including) endMarker line
    const regex = new RegExp(
        `(${escapeRegex(startMarker)}\\n)([\\s\\S]*?)(\\n${escapeRegex(endMarker)})`,
        "m"
    );
    if (regex.test(content)) {
        return content.replace(regex, `$1\n${newBlock}\n$3`);
    }
    // If endMarker not found, replace to end of section (next ## heading or EOF)
    const startIdx = content.indexOf(startMarker);
    if (startIdx === -1) throw new Error(`Section marker not found: ${startMarker}`);
    const afterStart = content.indexOf("\n", startIdx) + 1;
    const nextHeading = content.indexOf("\n## ", afterStart);
    const endIdx = nextHeading !== -1 ? nextHeading : content.length;
    return content.slice(0, afterStart) + "\n" + newBlock + "\n" + content.slice(endIdx);
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ─── Main ─────────────────────────────────────────────────────────────── */
async function main() {
    console.log("🔄 Updating profile README...");

    // 1. Read generated data
    const data = JSON.parse(
        readFileSync(join(ROOT, "public", "github-data.json"), "utf8")
    );

    // 2. Fetch current README from GitHub API
    const fileData = await ghFetch(`/repos/${PROFILE_REPO}/contents/README.md`);
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf8");
    const sha = fileData.sha;

    // 3. Render new sections
    const projectsBlock = renderProjectsSection(data.projects);
    const stackBlock = renderStackSection(data.skills);

    // 4. Surgically replace sections
    let updated = currentContent;

    // Replace "What I Build" section content
    updated = replaceSection(
        updated,
        "## — What I Build",
        "## — By the Numbers",
        projectsBlock
    );

    // Replace "The Stack" section content
    updated = replaceSection(
        updated,
        "## — The Stack",
        "## — whoami",  // whoami comes before the stack, so use next heading after stack
        stackBlock
    );

    // Fix: the stack comes AFTER whoami in the file, adjust end marker
    // Re-read markers based on actual file structure
    // The stack section ends at "## — What I Build"
    updated = currentContent; // reset and do more precise replacement

    // Find and replace The Stack section
    const stackStart = "## — The Stack";
    const stackEnd = "## — What I Build";
    updated = replaceSection(updated, stackStart, stackEnd, stackBlock);

    // Find and replace What I Build section
    const buildStart = "## — What I Build";
    const buildEnd = "## — By the Numbers";
    updated = replaceSection(updated, buildStart, buildEnd, projectsBlock);

    if (DRY_RUN) {
        console.log("\n📋 DRY RUN — updated README:\n");
        console.log(updated.slice(0, 3000) + (updated.length > 3000 ? "\n...(truncated)" : ""));
        console.log("\n✅ Dry run complete.");
        return;
    }

    // 5. Commit updated README via API
    const encodedContent = Buffer.from(updated).toString("base64");
    await ghFetch(`/repos/${PROFILE_REPO}/contents/README.md`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: `chore: auto-sync profile README [${new Date().toISOString().slice(0, 10)}]`,
            content: encodedContent,
            sha,
        }),
    });

    console.log(`✅ Profile README updated → github.com/${PROFILE_REPO}`);
    console.log(`   Projects: ${data.projects.length}`);
}

main().catch((err) => {
    console.error("❌ README update failed:", err.message);
    process.exit(1);
});
