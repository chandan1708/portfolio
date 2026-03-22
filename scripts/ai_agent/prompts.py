"""
prompts.py — Groq LLM prompts for the portfolio AI agent.
"""

# ── Extraction prompt ─────────────────────────────────────────────────────────
EXTRACTION_SYSTEM = """You are an expert technical writer and AI engineer.
Your job is to read a GitHub project README and extract structured information.
Always respond with valid JSON only — no markdown fences, no extra text."""

EXTRACTION_HUMAN = """Read the following README and extract:

1. **skills**: A flat list of specific technologies, frameworks, libraries, and languages used.
   - Use exact names (e.g. "TensorFlow" not "tensorflow", "FastAPI" not "fast api")
   - Include only things explicitly mentioned in the README
   - Max 10 skills

2. **title**: The project name as a clean, display-ready string (Title Case)

3. **description**: A 1-2 sentence analytical description that:
   - Highlights the technical approach and real-world impact
   - Includes specific metrics if mentioned in README (e.g. "achieving 89% accuracy")
   - Is written in third person, professional tone
   - Is concise (max 40 words)

4. **tags**: 2-4 high-level category tags from this list only:
   ["Deep Learning", "Computer Vision", "Machine Learning", "NLP", "LLM",
    "Agentic AI", "RAG", "Real-time Analytics", "IoT", "Robotics",
    "Backend", "Frontend", "Full Stack", "Data Engineering", "Cloud",
    "Computer Vision", "Edge AI", "Autonomous Systems", "Emergency", "Healthcare"]

5. **highlight**: true if the project has notable achievements (awards, significant metrics, novel approach), false otherwise.

README content:
---
{readme_content}
---

Respond with this exact JSON structure:
{{
  "title": "...",
  "description": "...",
  "skills": ["...", "..."],
  "tags": ["...", "..."],
  "highlight": true
}}"""


# ── Translation prompt ────────────────────────────────────────────────────────
TRANSLATION_SYSTEM = """You are a professional multilingual translator specializing in technical content.
Keep technical terms, proper nouns, acronyms, and product names in English (e.g. TensorFlow, FastAPI, Python, AI, ML, LLM, RAG).
Translate only descriptive text naturally into the target language.
Always respond with valid JSON only — no markdown, no extra text."""

TRANSLATION_HUMAN = """Translate the following project title and description into {language_name}.

Title: {title}
Description: {description}

Respond with this exact JSON:
{{
  "title": "translated title here",
  "description": "translated description here"
}}"""


# ── Skill-to-category mapping (mirrors skill-map.json) ───────────────────────
SKILL_CATEGORY_MAP = {
    "Python": "Languages",
    "Java": "Languages",
    "C++": "Languages",
    "C/C++": "Languages",
    "JavaScript": "Languages",
    "TypeScript": "Languages",
    "Go": "Languages",
    "Rust": "Languages",
    "Bash": "Languages",
    "SQL": "Languages",

    "TensorFlow": "Deep Learning",
    "PyTorch": "Deep Learning",
    "Keras": "Deep Learning",
    "OpenCV": "Deep Learning",
    "CNN": "Deep Learning",
    "RNN": "Deep Learning",
    "LSTM": "Deep Learning",
    "Transformers": "Deep Learning",
    "Scikit-learn": "Deep Learning",
    "YOLO": "Deep Learning",
    "Hugging Face": "Deep Learning",

    "LangChain": "Agentic AI & RAG",
    "LangGraph": "Agentic AI & RAG",
    "GraphRAG": "Agentic AI & RAG",
    "RAG": "Agentic AI & RAG",
    "LoRA": "Agentic AI & RAG",
    "QLoRA": "Agentic AI & RAG",
    "RAFT": "Agentic AI & RAG",
    "CAG": "Agentic AI & RAG",
    "LLM": "Agentic AI & RAG",
    "OpenAI": "Agentic AI & RAG",
    "Groq": "Agentic AI & RAG",
    "Llama": "Agentic AI & RAG",
    "Gemini": "Agentic AI & RAG",

    "FastAPI": "Infrastructure",
    "Django": "Infrastructure",
    "Flask": "Infrastructure",
    "AWS": "Infrastructure",
    "GCP": "Infrastructure",
    "Docker": "Infrastructure",
    "MongoDB": "Infrastructure",
    "MySQL": "Infrastructure",
    "PostgreSQL": "Infrastructure",
    "Redis": "Infrastructure",
    "ChromaDB": "Infrastructure",
    "Chroma DB": "Infrastructure",
    "Pinecone": "Infrastructure",
    "AstraDB": "Infrastructure",
    "Astra DB": "Infrastructure",
}


# ── Language code → display name map (for translation prompt) ────────────────
LANGUAGE_NAMES = {
    "ao": "Angolan Portuguese",
    "ar": "Arabic",
    "as": "Assamese",
    "bg": "Bulgarian",
    "bn": "Bengali",
    "ca": "Catalan",
    "cs": "Czech",
    "da": "Danish",
    "de": "German",
    "es": "Spanish",
    "et": "Estonian",
    "fi": "Finnish",
    "fr": "French",
    "gu": "Gujarati",
    "hi": "Hindi",
    "hr": "Croatian",
    "hu": "Hungarian",
    "it": "Italian",
    "ja": "Japanese",
    "kha": "Khasi",
    "kn": "Kannada",
    "ko": "Korean",
    "kok": "Konkani",
    "ks": "Kashmiri",
    "lt": "Lithuanian",
    "lus": "Mizo",
    "merry": "Merry (custom)",
    "ml": "Malayalam",
    "mni": "Meitei",
    "mr": "Marathi",
    "njz": "Naga (custom)",
    "nl": "Dutch",
    "no": "Norwegian",
    "or": "Odia",
    "pa": "Punjabi",
    "pt": "Portuguese",
    "ro": "Romanian",
    "ru": "Russian",
    "sv": "Swedish",
    "ta": "Tamil",
    "te": "Telugu",
    "uk": "Ukrainian",
    "vi": "Vietnamese",
    "zh": "Chinese (Simplified)",
}
