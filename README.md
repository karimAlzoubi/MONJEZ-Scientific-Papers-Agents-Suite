<div align="center">

# 🚀 SPAS: Scientific Papers Agents Suite
### From Text to Triumph: An Autonomous Multi-Agent Pipeline for Research Communication

**A Submission for the [Agenticthon](https://agenticthon.com/) Hackathon**
<br>
by **Mohammad Karim Alzoubi** & **Osama Shakaki**

</div>

---

## 🎯 Our Mission
Scientific breakthroughs are often trapped within the dense, static confines of academic papers. The process of communicating research—translating complex ideas into code, posters, presentations, videos, and discussions—is a manual, time-consuming effort.

**SPAS is our answer.** It is an autonomous, multi-agent ecosystem that orchestrates a team of specialized AI agents to transform any scientific paper into a complete suite of communication assets. With a single command, SPAS converts static text into five dynamic formats:

| 💻 **Code** | 🖼️ **Posters** | 📊 **Slides** | 🎥 **Videos** | 🎙️ **Podcasts** |
|:---:|:---:|:---:|:---:|:---:|
| Executable Repositories | Professional & Visual | Polished Presentations | Engaging Video Abstracts | Conversational Audio |

---

## ✨ Meet the Agentic Suite
SPAS is composed of five expert agents, each a master of its domain, working in a sophisticated pipeline where precision meets creativity.

---

### 💻 The Code Agent: *From Theory to Executable Reality*
This agent reads the methodology and mathematical logic from a paper and autonomously writes a clean, modular, and functional code repository.

<p align="center">
  <img src="assets/code_agent_workflow.png" alt="Code Agent Workflow" width="100%">
</p>

**Internal Workflow:**
- **Planning Agent:** Acts as the System Architect, designing the file structure and dependencies.
- **Analysis Agent:** Functions as a Research Scientist, meticulously interpreting equations.
- **Coding & Debugging Agents:** Senior Engineers that write and autonomously fix Python code.

---

### 🖼️ The Poster Agent: *From Paper to Pixel-Perfect Poster*
Condenses lengthy papers into visually stunning academic posters, ready for any conference.

<p align="center">
  <img src="assets/poster_agent_teaser.jpeg" alt="Poster Agent Workflow" width="100%">
</p>

**Internal Workflow:**
- **Parser Agent:** Distills text and visual assets (figures, tables) into a structured library.
- **Planner Agent:** Uses a binary-tree algorithm to partition the canvas for a balanced flow.
- **Painter & Critic Loop:** A VLM-powered loop that renders content and self-corrects layout issues.

---

### 📊 The Slides Agent: *From Data to Dazzling Slides*
Transforms documents into polished presentations, ensuring every key insight is captured via its RAG-powered core.

**Click on a preview to view the full PDF presentation:**

<div align="center">

| Academic Style | Creative Style (Totoro) |
|:---:|:---:|
| [![Academic Slides](assets/academic_slides_preview.png)](assets/academic_slides.pdf) | [![Totoro Slides](assets/totoro_slides_preview.png)](assets/totoro_slides.pdf) |
| 📄 *View Academic PDF* | 📄 *View Totoro PDF* |

</div>

**Internal Workflow:**
- **RAG Engine:** Indexes the paper to build a searchable knowledge base, preventing hallucinations.
- **Planning Agent:** Creates a blueprint mapping the narrative to a logical sequence of slides.
- **Creation Agent:** Renders final visuals with high-quality styling.

---

### 🎥 The Video Agent: *From Manuscript to Motion*
Produces dynamic video abstracts by translating academic concepts into animations, talking-head segments, and visually narrated slides.

#### 🧠 Strategic Workflow
Our Video Agent orchestrates a complex internal economy of specialist sub-agents to ensure high-fidelity results.

<p align="center">
  <img src="assets/video_agent_planning_logic.png" alt="Video Planning Logic" width="90%">
  <br>
  <em><b>Fig 1. Strategic Blueprinting:</b> The agent employs a Progressive Chain-of-Thought (P-CoT) to decompose theoretical text into granular scene instructions.</em>
</p>

<p align="center">
  <img src="assets/video_agent_orchestration.png" alt="Video Orchestration" width="90%">
  <br>
  <em><b>Fig 2. The Multimodal Assembly Line:</b> A closed-loop system where generators execute rendering code and visual critics provide real-time feedback.</em>
</p>

#### 📺 Live Demo: Autonomous Video Abstract

<div align="center">
  <table style="border: none; border-collapse: collapse;">
    <tr>
      <td align="center" style="border: 2px solid #58a6ff; border-radius: 10px; padding: 10px; background-color: #0d1117;">
        <!-- استبدل الرابط أدناه بالرابط الذي ظهر لك عند سحب الفيديو -->
        <video src="ضع_الرابط_الذي_نسخته_هنا" width="100%" controls autoplay loop muted style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.5);"></video>
        <p style="margin-top: 10px; font-size: 14px; color: #8b949e;">
          <em><b>Case Study:</b> "A Fast Algorithm for Particle Simulations" <br> 
          Notice the autonomous coordination between narration and mathematical Manim animations.</em>
        </p>
      </td>
    </tr>
  </table>
</div>

---

### 🎙️ The Podcast Agent: *From Text to Talk Show*
Transforms a dense research paper into a lively, conversational audio podcast.

**Internal Workflow:**
- **Scriptwriting Agent:** Converts jargon into a natural, two-host dialogue script.
- **Audio Synthesis Engine:** Uses multi-voice TTS to generate distinct, natural voices.
- **Transcript Generator:** Provides a full text transcript alongside the `.mp3` output.

---

## 🧠 The Agentic Brain: Core Principles
1.  **Hierarchical Task Decomposition:** High-level goals are broken down into granular executable tasks.
2.  **Autonomous Self-Correction:** "Critic" agents evaluate outputs and provide iterative feedback.
3.  **Domain-Specific Expertise:** Specialists for `Manim` animations, `PyMOL` structures, and `pptx` rendering.
4.  **Headless & Modular:** Designed to run autonomously via CLI for massive research workflows.

---

## 🚀 Getting Started

### 1. Clone the Suite
```bash
git clone https://github.com/YOUR-USERNAME/SPAS.git
cd SPAS
```

### 2. Configure API Keys
Configure your API keys (OpenAI, Gemini, etc.) in the `config.yml` or `.env` files within each agent's directory.

### 3. Run an Agent (Example: Video Agent)
```bash
cd Video_Agent
python run_agent.py --input "paper.pdf"
```

---

## 💡 Our Vision for Agenticthon
SPAS is a statement about the future of agentic AI. We believe autonomous agents should **amplify human creativity**. By automating the friction-filled process of research communication, we empower thinkers to focus on their next big discovery.

---

## 🛠️ Built With
- **Core:** Python 3.10+
- **LLMs:** GPT-4o, Gemini 2.0, Llama 3.3
- **Visualization:** Manim, PyMOL, python-pptx
- **Audio/Video:** MoviePy, Pydub, FFmpeg

---

## 👥 The Team
- **Mohammad Karim Alzoubi**
- **Osama Shakaki**

**We are proud to present SPAS as our contribution to a future powered by intelligent, collaborative AI agents.**