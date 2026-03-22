#!/usr/bin/env python3
"""
agent.py — LangGraph AI agent for portfolio auto-sync.

Flow:
  fetch_readme -> analyze_readme -> update_portfolio_json
                                -> update_github_profile_readme
                                -> translate_content -> update_i18n_files

Run locally (dry-run):
  GROQ_API_KEY=xxx GITHUB_TOKEN=xxx TRIGGER_REPO=chandan1708/ACCIRESCUE \
  GITHUB_USERNAME=chandan1708 python scripts/ai_agent/agent.py --dry-run
"""

import asyncio
import base64
import json
import os
import re
import sys
from pathlib import Path
from typing import Any, TypedDict

import requests
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import StateGraph, END

# ── Paths ─────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent.parent
I18N_DIR = ROOT / "src" / "i18n"
DATA_FILE = ROOT / "public" / "github-data.json"
SCRIPTS_DIR = ROOT / "scripts"

sys.path.insert(0, str(Path(__file__).parent))
from prompts import (
    EXTRACTION_SYSTEM, EXTRACTION_HUMAN,
    TRANSLATION_SYSTEM, TRANSLATION_HUMAN,
    SKILL_CATEGORY_MAP, LANGUAGE_NAMES,
)

# ── Config ────────────────────────────────────────────────────────────────────
GROQ_API_KEY    = os.environ.get("GROQ_API_KEY", "")
GITHUB_TOKEN    = os.environ.get("GITHUB_TOKEN", "")
GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "chandan1708")
TRIGGER_REPO    = os.environ.get("TRIGGER_REPO", "")   # e.g. "chandan1708/my-project"
PROFILE_REPO    = f"{GITHUB_USERNAME}/{GITHUB_USERNAME}"
DRY_RUN         = "--dry-run" in sys.argv

GROQ_MODEL = "llama-3.3-70b-versatile"

# ── Typed agent state ─────────────────────────────────────────────────────────
class AgentState(TypedDict):
    repo_name: str          # short repo name
    repo_full_name: str     # owner/repo
    readme_content: str
    repo_html_url: str
    repo_homepage: str
    # extracted by LLM
    project_title: str
    project_description: str
    project_skills: list[str]
    project_tags: list[str]
    project_highlight: bool
    # translations: {lang_code: {title, description}}
    translations: dict[str, dict[str, str]]
    # error flag
    error: str

# ── GitHub API helpers ────────────────────────────────────────────────────────
def gh_headers() -> dict:
    h = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        h["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return h

def gh_get(path: str) -> dict:
    r = requests.get(f"https://api.github.com{path}", headers=gh_headers(), timeout=15)
    r.raise_for_status()
    return r.json()

def gh_put(path: str, body: dict) -> dict:
    r = requests.put(f"https://api.github.com{path}", headers=gh_headers(),
                     json=body, timeout=15)
    r.raise_for_status()
    return r.json()

# ── Groq LLM setup ───────────────────────────────────────────────────────────
def get_llm() -> ChatGroq:
    return ChatGroq(model=GROQ_MODEL, api_key=GROQ_API_KEY, temperature=0.3)

def llm_json(system: str, human: str) -> dict:
    """Call Groq and parse JSON response."""
    llm = get_llm()
    msgs = [SystemMessage(content=system), HumanMessage(content=human)]
    resp = llm.invoke(msgs)
    raw = resp.content.strip()
    # Strip markdown fences if present
    raw = re.sub(r"^```(?:json)?\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)
    return json.loads(raw)

# ── Helper: safe repo key ─────────────────────────────────────────────────────
def repo_to_key(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "-", name.lower()).strip("-")

# ═══════════════════════════════════════════════════════════════════════════════
# NODE 1 — fetch_readme
# ═══════════════════════════════════════════════════════════════════════════════
def fetch_readme(state: AgentState) -> AgentState:
    """Fetch README.md content from the triggered repo."""
    repo = state["repo_full_name"] or TRIGGER_REPO
    if not repo:
        return {**state, "error": "No repo specified. Set TRIGGER_REPO env var."}

    print(f" Fetching README for {repo}...")
    try:
        data = gh_get(f"/repos/{repo}/contents/README.md")
        content = base64.b64decode(data["content"]).decode("utf-8")
        # Also get repo metadata
        meta = gh_get(f"/repos/{repo}")
        return {
            **state,
            "repo_name": meta["name"],
            "repo_full_name": repo,
            "repo_html_url": meta["html_url"],
            "repo_homepage": meta.get("homepage") or "",
            "readme_content": content,
            "error": "",
        }
    except Exception as e:
        return {**state, "error": f"fetch_readme failed: {e}"}

# ═══════════════════════════════════════════════════════════════════════════════
# NODE 2 — analyze_readme
# ═══════════════════════════════════════════════════════════════════════════════
def analyze_readme(state: AgentState) -> AgentState:
    """Use Groq to extract skills, description, tags from README."""
    if state.get("error"):
        return state

    print(" Analyzing README with Groq LLM...")
    readme = state["readme_content"][:8000]  # truncate to fit context

    try:
        result = llm_json(
            EXTRACTION_SYSTEM,
            EXTRACTION_HUMAN.format(readme_content=readme),
        )
        return {
            **state,
            "project_title": result.get("title", state["repo_name"]),
            "project_description": result.get("description", ""),
            "project_skills": result.get("skills", []),
            "project_tags": result.get("tags", ["Open Source"]),
            "project_highlight": result.get("highlight", False),
        }
    except Exception as e:
        return {**state, "error": f"analyze_readme failed: {e}"}

# ═══════════════════════════════════════════════════════════════════════════════
# NODE 3 — update_portfolio_json
# ═══════════════════════════════════════════════════════════════════════════════
def update_portfolio_json(state: AgentState) -> AgentState:
    """Merge new project + skills into public/github-data.json."""
    if state.get("error"):
        return state

    print(" Updating public/github-data.json...")
    data = json.loads(DATA_FILE.read_text())

    key = repo_to_key(state["repo_name"])
    existing_keys = {p["key"] for p in data["projects"]}

    # ── Add project if new ────────────────────────────────────────────────────
    if key not in existing_keys:
        new_number = str(len(data["projects"]) + 1).zfill(2)
        new_project = {
            "number": new_number,
            "key": key,
            "title": state["project_title"],
            "description": state["project_description"],
            "tags": state["project_tags"],
            "github": state["repo_html_url"],
            "demo": state["repo_homepage"],
            "highlight": state["project_highlight"],
        }
        data["projects"].append(new_project)
        print(f" Added new project: {state['project_title']}")
    else:
        # Update existing project's GitHub/demo links + description
        for p in data["projects"]:
            if p["key"] == key:
                p["github"] = p.get("github") or state["repo_html_url"]
                p["demo"] = p.get("demo") or state["repo_homepage"]
                print(f"  Project '{key}' already exists — updated links only")
                break

    # ── Merge skills into categories ──────────────────────────────────────────
    for skill in state["project_skills"]:
        category = SKILL_CATEGORY_MAP.get(skill)
        if not category:
            continue  # unknown skill — skip (editeable via skill-map.json)
        if category not in data["skills"]:
            data["skills"][category] = []
        existing_lower = [s.lower() for s in data["skills"][category]]
        if skill.lower() not in existing_lower:
            data["skills"][category].append(skill)
            print(f" New skill: {skill} -> {category}")

    import datetime
    data["lastUpdated"] = datetime.datetime.utcnow().isoformat() + "Z"

    if DRY_RUN:
        print("\n DRY RUN — github-data.json would be:\n")
        print(json.dumps(data, indent=2)[:2000])
    else:
        DATA_FILE.write_text(json.dumps(data, indent=2) + "\n")

    return {**state, "_portfolio_data": data}

# ═══════════════════════════════════════════════════════════════════════════════
# NODE 4 — update_github_profile_readme
# ═══════════════════════════════════════════════════════════════════════════════
def update_github_profile_readme(state: AgentState) -> AgentState:
    """Update 'What I Build' and 'The Stack' in the GitHub profile README.
    Uses the same data from github-data.json to keep both in sync."""
    if state.get("error"):
        return state

    print(" Updating GitHub profile README...")

    # Read the freshly updated portfolio data
    data = json.loads(DATA_FILE.read_text())

    try:
        file_data = gh_get(f"/repos/{PROFILE_REPO}/contents/README.md")
        current = base64.b64decode(file_data["content"]).decode("utf-8")
        sha = file_data["sha"]
    except Exception as e:
        print(f" Could not fetch profile README: {e}")
        return state

    # ── Build "What I Build" table ────────────────────────────────────────────
    projects = data["projects"]
    rows = []
    for i in range(0, len(projects), 2):
        left  = projects[i]
        right = projects[i + 1] if i + 1 < len(projects) else None

        def cell(p):
            if not p:
                return "<td width=\"50%\" valign=\"top\"></td>"
            tech = " ".join(f"`{t}`" for t in (p.get("tags") or [])[:4])
            link = f"[↗ View Project]({p['github']})" if p.get("github") else "[↗ View Project](#)"
            desc_lines = "- " + "\n- ".join(
                s.strip() for s in p["description"].replace(".", ".\n").split("\n") if s.strip()
            )
            return (
 f"<td width=\"50%\" valign=\"top\">\n\n"
 f"### {p['title']}\n"
 f"**{p['description']}**\n\n"
 f"{tech}\n\n"
 f"{link}\n\n"
 f"</td>"
            )
        rows.append(f"<tr>\n{cell(left)}\n{cell(right)}\n</tr>")

    projects_block = "<table>\n" + "\n".join(rows) + "\n</table>"

    # ── Build "The Stack" badges ───────────────────────────────────────────────
    # Load badge map from update-readme.mjs equivalents (inline here)
    badge = lambda label, logo, color="white": (
 f"![{label}](https://img.shields.io/badge/{requests.utils.quote(label)}"
 f"-0d1117?style=for-the-badge&logo={logo}&logoColor={color})"
    )
    BADGES = {
        "Python": "![Python](https://img.shields.io/badge/Python-0d1117?style=for-the-badge&logo=python&logoColor=3776AB)",
        "Java": "![Java](https://img.shields.io/badge/Java-0d1117?style=for-the-badge&logo=openjdk&logoColor=ED8B00)",
        "C/C++": "![C++](https://img.shields.io/badge/C++-0d1117?style=for-the-badge&logo=cplusplus&logoColor=00599C)",
        "TensorFlow": "![TensorFlow](https://img.shields.io/badge/TensorFlow-0d1117?style=for-the-badge&logo=tensorflow&logoColor=FF6F00)",
        "PyTorch": "![PyTorch](https://img.shields.io/badge/PyTorch-0d1117?style=for-the-badge&logo=pytorch&logoColor=EE4C2C)",
        "OpenCV": "![OpenCV](https://img.shields.io/badge/OpenCV-0d1117?style=for-the-badge&logo=opencv&logoColor=5C3EE8)",
        "LangChain": "![LangChain](https://img.shields.io/badge/LangChain-0d1117?style=for-the-badge&logo=chainlink&logoColor=1C3C3C)",
        "LangGraph": "![LangGraph](https://img.shields.io/badge/LangGraph-0d1117?style=for-the-badge&logo=graphql&logoColor=E10098)",
        "GraphRAG": "![GraphRAG](https://img.shields.io/badge/GraphRAG-0d1117?style=for-the-badge&logo=neo4j&logoColor=008CC1)",
        "FastAPI": "![FastAPI](https://img.shields.io/badge/FastAPI-0d1117?style=for-the-badge&logo=fastapi&logoColor=009688)",
        "AWS": "![AWS](https://img.shields.io/badge/AWS-0d1117?style=for-the-badge&logo=amazonaws&logoColor=FF9900)",
        "MongoDB": "![MongoDB](https://img.shields.io/badge/MongoDB-0d1117?style=for-the-badge&logo=mongodb&logoColor=47A248)",
        "MySQL": "![MySQL](https://img.shields.io/badge/MySQL-0d1117?style=for-the-badge&logo=mysql&logoColor=4479A1)",
        "Docker": "![Docker](https://img.shields.io/badge/Docker-0d1117?style=for-the-badge&logo=docker&logoColor=2496ED)",
        "Groq": "![Groq](https://img.shields.io/badge/Groq-0d1117?style=for-the-badge&logo=groq&logoColor=white)",
    }
    CAT_LABELS = {
        "Languages": "**Core Languages**",
        "Deep Learning": "**AI / ML / DL**",
        "Agentic AI & RAG": "**LLM & RAG**",
        "Infrastructure": "**Vector DBs & APIs**",
    }
    stack_lines = ['<div align="center">', ""]
    for cat, skills in data["skills"].items():
        label = CAT_LABELS.get(cat, f"**{cat}**")
        stack_lines.append(label)
        stack_lines.append("")
        for s in skills:
            b = BADGES.get(s) or badge(s, "code")
            stack_lines.append(b)
        stack_lines.append("")
    stack_lines.append("</div>")
    stack_block = "\n".join(stack_lines)

    # ── Surgical replacement ──────────────────────────────────────────────────
    def replace_section(content, start_marker, end_marker, new_block):
        start_idx = content.find(start_marker)
        if start_idx == -1:
            print(f" Section '{start_marker}' not found in README — skipping")
            return content
        after_start = content.index("\n", start_idx) + 1
        end_idx = content.find(f"\n{end_marker}", after_start)
        if end_idx == -1:
            # Replace to end of file
            return content[:after_start] + "\n" + new_block + "\n"
        return content[:after_start] + "\n" + new_block + "\n" + content[end_idx:]

    updated = current
    updated = replace_section(updated, "## — The Stack",      "## — What I Build",    stack_block)
    updated = replace_section(updated, "## — What I Build",   "## — By the Numbers",  projects_block)

    if DRY_RUN:
        print("\n DRY RUN — Profile README (first 1500 chars):\n")
        print(updated[:1500])
        return state

    if updated == current:
        print("  No changes to profile README — skipping commit")
        return state

    encoded = base64.b64encode(updated.encode()).decode()
    try:
        gh_put(f"/repos/{PROFILE_REPO}/contents/README.md", {
            "message": f"chore: auto-sync profile README [{state['project_title']}]",
            "content": encoded,
            "sha": sha,
        })
        print(f" Profile README updated -> github.com/{PROFILE_REPO}")
    except Exception as e:
        print(f" Could not commit profile README: {e}")

    return state

# ═══════════════════════════════════════════════════════════════════════════════
# NODE 5 — translate_content
# ═══════════════════════════════════════════════════════════════════════════════
def translate_content(state: AgentState) -> AgentState:
    """Translate project title + description into all 44 languages using Groq."""
    if state.get("error"):
        return state

    print(f" Translating '{state['project_title']}' into {len(LANGUAGE_NAMES)} languages...")

    key = repo_to_key(state["repo_name"])

    # Check if this key already exists in English i18n — skip if it does
    en_file = I18N_DIR / "en.json"
    en_data = json.loads(en_file.read_text())
    if key in (en_data.get("projects", {}).get("items") or {}):
        print(f"  Key '{key}' already in en.json — skipping translation")
        return {**state, "translations": {}}

    async def translate_one(lang_code: str, lang_name: str) -> tuple[str, dict]:
        try:
            result = await asyncio.to_thread(
                llm_json,
                TRANSLATION_SYSTEM,
                TRANSLATION_HUMAN.format(
                    language_name=lang_name,
                    title=state["project_title"],
                    description=state["project_description"],
                ),
            )
            return lang_code, result
        except Exception as e:
            print(f" {lang_code} translation failed: {e}")
            # Fallback to English
            return lang_code, {
                "title": state["project_title"],
                "description": state["project_description"],
            }

    async def translate_all():
        tasks = [translate_one(code, name) for code, name in LANGUAGE_NAMES.items()]
        results = await asyncio.gather(*tasks)
        return dict(results)

    if DRY_RUN:
        # Only translate 3 sample languages in dry-run
        sample = dict(list(LANGUAGE_NAMES.items())[:3])
        async def translate_sample():
            tasks = [translate_one(code, name) for code, name in sample.items()]
            results = await asyncio.gather(*tasks)
            return dict(results)
        translations = asyncio.run(translate_sample())
        print(f"\n DRY RUN — Sample translations:\n{json.dumps(translations, indent=2, ensure_ascii=False)[:1000]}")
    else:
        translations = asyncio.run(translate_all())
        print(f" Translated into {len(translations)} languages")

    return {**state, "translations": translations}

# ═══════════════════════════════════════════════════════════════════════════════
# NODE 6 — update_i18n_files
# ═══════════════════════════════════════════════════════════════════════════════
def update_i18n_files(state: AgentState) -> AgentState:
    """Write translated title+description into each src/i18n/{lang}.json file."""
    if state.get("error"):
        return state

    translations = state.get("translations", {})
    if not translations:
        return state

    key = repo_to_key(state["repo_name"])
    print(f" Updating i18n files for key '{key}'...")

    # Update English first
    en_path = I18N_DIR / "en.json"
    en_data = json.loads(en_path.read_text())
    if "items" not in en_data.get("projects", {}):
        en_data.setdefault("projects", {})["items"] = {}
    en_data["projects"]["items"][key] = {
        "title": state["project_title"],
        "description": state["project_description"],
    }
    if not DRY_RUN:
        en_path.write_text(json.dumps(en_data, indent=2, ensure_ascii=False) + "\n")

    updated_count = 0
    for lang_code, translated in translations.items():
        lang_path = I18N_DIR / f"{lang_code}.json"
        if not lang_path.exists():
            continue
        try:
            lang_data = json.loads(lang_path.read_text())
            lang_data.setdefault("projects", {}).setdefault("items", {})[key] = {
                "title": translated.get("title", state["project_title"]),
                "description": translated.get("description", state["project_description"]),
            }
            if not DRY_RUN:
                lang_path.write_text(json.dumps(lang_data, indent=2, ensure_ascii=False) + "\n")
            updated_count += 1
        except Exception as e:
            print(f" Could not update {lang_code}.json: {e}")

    print(f" Updated {updated_count + 1} i18n files (en + {updated_count} translations)")
    return state

# ═══════════════════════════════════════════════════════════════════════════════
# CONDITIONAL EDGE — should we proceed?
# ═══════════════════════════════════════════════════════════════════════════════
def has_error(state: AgentState) -> str:
    return "end" if state.get("error") else "continue"

# ═══════════════════════════════════════════════════════════════════════════════
# BUILD THE GRAPH
# ═══════════════════════════════════════════════════════════════════════════════
def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("fetch_readme",                 fetch_readme)
    graph.add_node("analyze_readme",               analyze_readme)
    graph.add_node("update_portfolio_json",        update_portfolio_json)
    graph.add_node("update_github_profile_readme", update_github_profile_readme)
    graph.add_node("translate_content",            translate_content)
    graph.add_node("update_i18n_files",            update_i18n_files)

    graph.set_entry_point("fetch_readme")

    graph.add_conditional_edges("fetch_readme",   has_error,
        {"end": END, "continue": "analyze_readme"})
    graph.add_conditional_edges("analyze_readme", has_error,
        {"end": END, "continue": "update_portfolio_json"})
    graph.add_edge("update_portfolio_json",        "update_github_profile_readme")
    graph.add_edge("update_github_profile_readme", "translate_content")
    graph.add_edge("translate_content",            "update_i18n_files")
    graph.add_edge("update_i18n_files",            END)

    return graph.compile()

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════
def main():
    if not GROQ_API_KEY:
        print(" GROQ_API_KEY environment variable not set")
        sys.exit(1)

    repo = TRIGGER_REPO or os.environ.get("GITHUB_REPOSITORY", "")
    if not repo:
        print(" Set TRIGGER_REPO env var (e.g. chandan1708/my-project)")
        sys.exit(1)

    if DRY_RUN:
        print(" DRY RUN MODE — no files will be written\n")

    print(f" Portfolio AI Agent starting for repo: {repo}")
    print(f" Model: {GROQ_MODEL}")
    print(f" Dry run: {DRY_RUN}\n")

    app = build_graph()
    initial_state: AgentState = {
        "repo_name": "",
        "repo_full_name": repo,
        "readme_content": "",
        "repo_html_url": "",
        "repo_homepage": "",
        "project_title": "",
        "project_description": "",
        "project_skills": [],
        "project_tags": [],
        "project_highlight": False,
        "translations": {},
        "error": "",
    }

    final = app.invoke(initial_state)

    if final.get("error"):
        print(f"\n Agent failed: {final['error']}")
        sys.exit(1)

    print(f"\n Agent complete — '{final['project_title']}' synced to portfolio + profile README + {len(final.get('translations', {}))} i18n files")

if __name__ == "__main__":
    main()
