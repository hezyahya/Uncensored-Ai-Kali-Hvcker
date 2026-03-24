# Dolphin-Kali-Agent: Autonomous Uncensored Assistant

An advanced, autonomous AI agent that operates within a virtual Kali Linux desktop environment using E2B. This project is exclusively powered by the **Dolphin Uncensored AI** model and integrates the `hezxss/Dolphin_ai` Hugging Face Space directly into the control dashboard.

## 🚀 Features

- **Dolphin Uncensored AI**: Powered by `dolphin-2.9.4-llama-3-8b` for unrestricted, high-speed autonomous reasoning and computer use.
- **Kali Linux Desktop**: Full XFCE environment running in a secure E2B sandbox.
- **Live Space Integration**: Direct access to your `hezxss/Dolphin_ai` Streamlit app via the dashboard's "Live Space" tab.
- **Computer Use API**: The agent uses the Dolphin model as its brain to "see" and "interact" with the Kali OS.
- **Modern Cyan UI**: A redesigned dashboard focused on the Dolphin persona.

## 🛠️ Tech Stack

- **Sandbox**: [E2B Desktop](https://e2b.dev/)
- **LLM**: [DeepSeek-R1-Distill-Qwen-Uncensored](https://huggingface.co/thirdeyeai/DeepSeek-R1-Distill-Qwen-7B-uncensored)
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS, Shadcn UI, Framer Motion
- **Inference**: Hugging Face Inference API

## 📋 Prerequisites

- [E2B API Key](https://e2b.dev/docs/getting-started/api-key)
- [Hugging Face API Key](https://huggingface.co/settings/tokens)
- Node.js 20+

## ⚙️ Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/kali-agent-e2b.git
   cd kali-agent-e2b
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file:
   ```env
   E2B_API_KEY=your_e2b_key
   HUGGINGFACE_API_KEY=your_hf_key
   ```

4. **Build the Kali Sandbox Template**:
   ```bash
   npm run e2b-build
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🧠 Agent Architecture

The agent follows a **Reasoning-Action-Observation** loop:
1. **Thought**: The DeepSeek-R1 model analyzes the user request and the current state (screenshot/terminal).
2. **Action**: The agent generates a JSON tool call (e.g., `run_command`, `mouse_click`).
3. **Execution**: The backend executes the tool within the E2B sandbox.
4. **Observation**: The result (output or new screenshot) is fed back to the agent for the next step.

## ⚠️ Ethical Disclaimer

This project is for educational and authorized security testing purposes ONLY. Do not use this tool on systems you do not own or have explicit permission to test. The developers are not responsible for any misuse.
