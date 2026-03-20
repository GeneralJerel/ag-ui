
# <img src="https://github.com/user-attachments/assets/ebc0dd08-8732-4519-9b6c-452ce54d8058" alt="ag-ui Logo" width="22"/> AG-UI: The Agent-User Interaction Protocol

AG-UI is an open, lightweight, event-based protocol that standardizes how AI agents connect to user-facing applications.
Built for simplicity and flexibility, it enables seamless integration between AI agents, real time user context, and user interfaces.

---


<br>


[![Version](https://img.shields.io/npm/v/@ag-ui/core?label=Version&color=6963ff&logo=npm&logoColor=white)](https://www.npmjs.com/package/@ag-ui/core)
![MIT](https://img.shields.io/github/license/copilotkit/copilotkit?color=%236963ff&label=License)
![Discord](https://img.shields.io/discord/1379082175625953370?logo=discord&logoColor=%23FFFFFF&label=Discord&color=%236963ff)

<a href="https://discord.gg/Jd3FzfdJa8" target="_blank"> Join our Discord → </a> &nbsp;&nbsp;&nbsp; <a href="https://ag-ui.com/" target="_blank"> Read the Docs → </a> &nbsp;&nbsp;&nbsp; <a href="https://dojo.ag-ui.com/" target="_blank"> Go to the AG-UI Dojo → </a> &nbsp;&nbsp;&nbsp; <a href="https://x.com/CopilotKit" target="_blank"> Follow us → </a>


<img width="1600" height="680" alt="1600x680" src="https://github.com/user-attachments/assets/cd0376f3-0a3d-4cc3-a931-2b166c4efe5e" />



## 🚀 Getting Started
Create a new AG-UI application in seconds:
```bash
npx create-ag-ui-app my-agent-app
```

<h3> Useful Links:</h3>

- [The AG-UI Dojo](https://dojo.ag-ui.com/)
- [Build AG-UI-powered applications(Quickstart)](https://docs.ag-ui.com/quickstart/applications)
- [Build new AG-UI framework integrations (Quickstart)](https://go.copilotkit.ai/agui-contribute)
- [Book a call to discuss an AG-UI integration with a new framework](https://calendly.com/markus-copilotkit/ag-ui)
- [Join the Discord Community](https://discord.gg/Jd3FzfdJa8)

## What is AG-UI?

AG-UI is an open, lightweight, event-based protocol for agent-human interaction, designed for simplicity & flexibility:

- During agent executions, agent backends **emit events _compatible_ with one of AG-UI's ~16 standard event types**
- Agent backends can **accept one of a few simple AG-UI compatible inputs** as arguments

**AG-UI includes a flexible middleware layer** that ensures compatibility across diverse environments:

- Works with **any event transport** (SSE, WebSockets, webhooks, etc.)
- Allows for **loose event format matching**, enabling broad agent and app interoperability

It also ships with a **reference HTTP implementation** and **default connector** to help teams get started fast.


[Learn more about the specs →](https://go.copilotkit.ai/ag-ui-introduction)


## Why AG-UI?

AG-UI was developed based on real-world requirements and practical experience building in-app agent interactions.


## Where does AGUI fit in the agentic protocol stack?
AG-UI is complementary to the other 2 top agentic protocols
- MCP gives agents tools
- A2A allows agents to communicate with other agents
- AG-UI brings agents into user-facing applications

<div align="center">
  <img width="2048" height="1182" alt="The Agent Protocol Stack" src="https://github.com/user-attachments/assets/41138f71-50be-4812-98aa-20e0ad595716" />
</div>

## 🚀 Features

- 💬 Real-time agentic chat with streaming
- 🔄 Bi-directional state synchronization
- 🧩 Generative UI and structured messages
- 🧠 Real-time context enrichment
- 🛠️ Frontend tool integration
- 🧑‍💻 Human-in-the-loop collaboration
- 🎨 **Open Generative UI via MCP Apps** — agents render rich, interactive visuals directly in the chat

## 🎨 Open Generative UI

AG-UI supports **Open Generative UI** through the [MCP Apps](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/) specification, enabling agents to render rich, interactive visual content — not just text — directly inside user-facing applications.

📖 **[Read the Open Generative UI docs →](https://docs.copilotkit.ai/generative-ui/mcp-apps)**

Any MCP server that exposes UI-enabled tools can become a generative UI surface. The agent calls the tool, and the result renders inline as an interactive widget, diagram, or visualization — no custom frontend code required per tool.

### Excalidraw MCP Integration

The AG-UI Dojo includes a live integration with the [Excalidraw MCP server](https://mcp.excalidraw.com), demonstrating how agents can generate beautiful, animated, hand-drawn diagrams on the fly:

- Agent calls `read_me` to learn the Excalidraw element format
- Agent calls `create_view` with a JSON array of elements
- Elements stream in one by one with draw-on animations and progressive camera reveals
- Users can expand, zoom, and interact with the diagram in fullscreen
- Diagrams support editing, checkpoints, and incremental updates

This works with **any LLM** — the Excalidraw MCP server handles all rendering. The agent just needs to produce the right element JSON.

**Try it:** [AG-UI Dojo → Predictive State Updates](https://dojo.ag-ui.com/langgraph/feature/predictive_state_updates) — ask the agent to *"create an excalidraw diagram explaining how WebSockets work"*

### How It Works

```
User prompt → Agent (any LLM) → calls Excalidraw MCP tools → elements stream to iframe → animated diagram
```

The integration uses the `MCPAppsMiddleware` to connect any AG-UI agent to MCP servers with UI-enabled tools. The middleware:

1. Discovers tools with `ui/resourceUri` metadata from configured MCP servers
2. Injects those tools into the agent's available tool set
3. Executes tool calls against the MCP server when the agent uses them
4. Renders results in a sandboxed iframe with the MCP app's UI

This pattern is **fully open** — any MCP server can provide generative UI surfaces, and any AG-UI agent can use them.


## 🛠 Supported Integrations

AG-UI was born from CopilotKit's initial **partnership** with LangGraph and CrewAI - and brings the incredibly popular agent-user-interactivity infrastructure to the wider agentic ecosystem.

**1st party** = the platforms that have AG‑UI built in and provide documentation for guidance.

## Frameworks

| Framework                                                          | Status                   | AG-UI Resources                                                                 |
| ------------------------------------------------------------------ | ------------------------ | -------------------------------------------------------------------------------- |
| Built-in Agent                                                | ✅ Supported             | ➡️ [Docs](https://docs.copilotkit.ai/direct-to-llm)  |

### 🤝 Partnerships
| Framework | Status | AG-UI Resources |
| ---------- | ------- | ---------------- |
| [LangGraph](https://www.langchain.com/langgraph) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/langgraph/) 🎮 [Demos](https://dojo.ag-ui.com/langgraph-fastapi/feature/shared_state) |
| [CrewAI](https://crewai.com/) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/crewai-flows) 🎮 [Demos](https://dojo.ag-ui.com/crewai/feature/shared_state) |

### 🧩 1st Party
| Framework | Status | AG-UI Resources |
| ---------- | ------- | ---------------- |
| [Microsoft Agent Framework](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/microsoft-agent-framework) 🎮 [Demos](https://dojo.ag-ui.com/microsoft-agent-framework-dotnet/feature/shared_state) |
| [Google ADK](https://google.github.io/adk-docs/get-started/) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/adk) 🎮 [Demos](https://dojo.ag-ui.com/adk-middleware/feature/shared_state?openCopilot=true) |
| [AWS Strands Agents](https://github.com/strands-agents/sdk-python) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/aws-strands) 🎮 [Demos](https://dojo.ag-ui.com/aws-strands/feature/shared_state) |
| [Mastra](https://mastra.ai/) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/mastra/) 🎮 [Demos](https://dojo.ag-ui.com/mastra/feature/tool_based_generative_ui) |
| [Pydantic AI](https://github.com/pydantic/pydantic-ai) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/pydantic-ai/) 🎮 [Demos](https://dojo.ag-ui.com/pydantic-ai/feature/shared_state) |
| [Agno](https://github.com/agno-agi/agno) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/agno/) 🎮 [Demos](https://dojo.ag-ui.com/agno/feature/tool_based_generative_ui) |
| [LlamaIndex](https://github.com/run-llama/llama_index) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/llamaindex/) 🎮 [Demos](https://dojo.ag-ui.com/llamaindex/feature/shared_state) |
| [AG2](https://ag2.ai/) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/ag2/)  🎮 [Demos](https://dojo.ag-ui.com/ag2/feature/shared_state) |
| [AWS Bedrock Agents](https://aws.amazon.com/bedrock/agents/) | 🛠️ In Progress | – |



### 🌐 Community
| Framework | Status | AG-UI Resources |
| ---------- | ------- | ---------------- |
| [OpenAI Agent SDK](https://openai.github.io/openai-agents-python/) | 🛠️ In Progress | – |
| [Cloudflare Agents](https://developers.cloudflare.com/agents/) | 🛠️ In Progress | – |


## Agent Interaction Protocols

| Protocols | Status | AG-UI Resources | Integrations |
| ---------- | ------- | ---------------- | ------------- |
| [A2A]() | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/a2a-protocol) | Partnership |


## Infrastructure / Deployment
| Platform | Status | AG-UI Resources | Integrations |
| ---------- | ------- | ---------------- | ------------- |
| [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) | ✅ Supported | ➡️ [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-agui.html) | 1st Party |


## Specification (standard)
| Framework | Status | AG-UI Resources |
| ---------- | ------- | ---------------- |
| [Oracle Agent Spec](http://oracle.github.io/agent-spec/) | ✅ Supported | ➡️ [Docs](https://go.copilotkit.ai/copilotkit-oracle-docs) 🎮 [Demos](https://dojo.ag-ui.com/agent-spec-langgraph/feature/tool_based_generative_ui) |

## Generative UI
| Framework | Status | AG-UI Resources |
| ---------- | ------- | ---------------- |
| [MCP Apps](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/) | ✅ Supported | ➡️ [Docs](https://docs.copilotkit.ai/generative-ui/mcp-apps) 🎮 [Demos]() |


## SDKs

| SDK | Status | AG-UI Resources | Integrations |
| --- | ------- | ---------------- | ------------- |
| [Kotlin]() | ✅ Supported | ➡️ [Getting Started](https://github.com/ag-ui-protocol/ag-ui/blob/main/docs/sdk/kotlin/overview.mdx) | Community |
| [Golang]() | ✅ Supported | ➡️ [Getting Started](https://github.com/ag-ui-protocol/ag-ui/blob/main/docs/sdk/go/overview.mdx) | Community |
| [Dart]() | ✅ Supported | ➡️ [Getting Started](https://github.com/ag-ui-protocol/ag-ui/tree/main/sdks/community/dart) | Community |
| [Java]() | ✅ Supported | ➡️ [Getting Started](https://github.com/ag-ui-protocol/ag-ui/blob/main/docs/sdk/java/overview.mdx) | Community |
| [Rust]() | ✅ Supported | ➡️ [Getting Started](https://github.com/ag-ui-protocol/ag-ui/tree/main/sdks/community/rust/crates/ag-ui-client) | Community |
| [Ruby]() | ✅ Supported | ➡️ [Getting Started](https://github.com/ag-ui-protocol/ag-ui/tree/main/sdks/community/ruby) | Community |
| [.NET]() | 🛠️ In Progress | ➡️ [PR](https://github.com/ag-ui-protocol/ag-ui/pull/38) | Community |
| [Nim]() | 🛠️ In Progress | ➡️ [PR](https://github.com/ag-ui-protocol/ag-ui/pull/29) | Community |
| [Flowise]() | 🛠️ In Progress | ➡️ [GitHub Source](https://github.com/ag-ui-protocol/ag-ui/issues/367) | Community |
| [Langflow]() | 🛠️ In Progress | ➡️ [GitHub Source](https://github.com/ag-ui-protocol/ag-ui/issues/366) | Community |

## Clients

| Client | Status | AG-UI Resources | Integrations |
| --- | ------- | ---------------- | ------------- |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | ✅ Supported | ➡️ [Getting Started](https://docs.copilotkit.ai/direct-to-llm/guides/quickstart) | 1st Party |
| [Terminal + Agent]() | ✅ Supported | ➡️ [Getting Started](https://docs.ag-ui.com/quickstart/clients) | Community |
| [React Native]() | 🛠️ Help Wanted | ➡️ [GitHub Source](https://github.com/ag-ui-protocol/ag-ui/issues/510) | Community |

[View all supported integrations →](https://docs.ag-ui.com/introduction#supported-integrations)

## Examples
### Hello World App

Video:

https://github.com/user-attachments/assets/18c03330-1ebc-4863-b2b8-cc6c3a4c7bae

https://agui-demo.vercel.app/



## The AG-UI Dojo (Building-Blocks Viewer)
The AG-UI Dojo demonstrates AG-UI's core building blocks through simple, focused examples—each just 50-200 lines of code.

View the source code for the Dojo and all framework integrations [here](https://github.com/ag-ui-protocol/ag-ui/tree/main/apps/dojo).

https://github.com/user-attachments/assets/c298eea8-3f39-4a94-b968-7712429b0c49



## 🙋🏽‍♂️ Contributing to AG-UI

Check out the [Contributing guide](https://github.com/ag-ui-protocol/ag-ui/blob/main/CONTRIBUTING.md)

- **[Bi-Weekely AG-UI Working Group](https://lu.ma/CopilotKit?k=c)**
  📅 Follow the CopilotKit Luma Events Calendar

## Roadmap

Check out the [AG-UI Roadmap](https://github.com/orgs/ag-ui-protocol/projects/1) to see what's being built and where you can jump in.


## 📄 License

AG-UI is open source software [licensed as MIT](https://opensource.org/licenses/MIT).
