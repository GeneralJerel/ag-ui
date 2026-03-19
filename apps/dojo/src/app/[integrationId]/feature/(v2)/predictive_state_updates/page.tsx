"use client";
import "@copilotkit/react-core/v2/styles.css";
import "./style.css";

import MarkdownIt from "markdown-it";
import React from "react";

import { diffWords } from "diff";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState, useRef } from "react";
import {
  useAgent,
  useAgentContext,
  UseAgentUpdate,
  useHumanInTheLoop,
  useConfigureSuggestions,
  useDefaultRenderTool,
  CopilotChat,
  CopilotSidebar,
} from "@copilotkit/react-core/v2";
import { z } from "zod";
import { McpWidgetZoom } from "@/components/mcp-widget-zoom";
import { AGENT_SKILLS } from "./skills";
import { useMobileView } from "@/utils/use-mobile-view";
import { useMobileChat } from "@/utils/use-mobile-chat";
import { useURLParams } from "@/contexts/url-params-context";
import { CopilotKit } from "@copilotkit/react-core";

const extensions = [StarterKit];

interface PredictiveStateUpdatesProps {
  params: Promise<{
    integrationId: string;
  }>;
}

export default function PredictiveStateUpdates({ params }: PredictiveStateUpdatesProps) {
  const { integrationId } = React.use(params);
  const { isMobile } = useMobileView();
  const { chatDefaultOpen } = useURLParams();
  const defaultChatHeight = 50;
  const { isChatOpen, setChatHeight, setIsChatOpen, isDragging, chatHeight, handleDragStart } =
    useMobileChat(defaultChatHeight);
  const chatTitle = "AI Document Editor";
  const chatDescription = "Ask me to create or edit a document";

  return (
    <CopilotKit
      runtimeUrl={`/api/copilotkit/${integrationId}`}
      showDevConsole={false}
      agent="predictive_state_updates"
    >
      <div
        className="min-h-screen w-full"
        style={
          {
            // "--copilot-kit-primary-color": "#222",
            // "--copilot-kit-separator-color": "#CCC",
          } as React.CSSProperties
        }
      >
        {isMobile ? (
          <>
            {/* Chat Toggle Button */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
              <div className="bg-gradient-to-t from-white via-white to-transparent h-6"></div>
              <div
                className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between cursor-pointer shadow-lg"
                onClick={() => {
                  if (!isChatOpen) {
                    setChatHeight(defaultChatHeight); // Reset to good default when opening
                  }
                  setIsChatOpen(!isChatOpen);
                }}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-gray-900">{chatTitle}</div>
                    <div className="text-sm text-gray-500">{chatDescription}</div>
                  </div>
                </div>
                <div
                  className={`transform transition-transform duration-300 ${isChatOpen ? "rotate-180" : ""}`}
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pull-Up Chat Container */}
            <div
              className={`fixed inset-x-0 bottom-0 z-40 bg-white rounded-t-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] transform transition-all duration-300 ease-in-out flex flex-col ${
                isChatOpen ? "translate-y-0" : "translate-y-full"
              } ${isDragging ? "transition-none" : ""}`}
              style={{
                height: `${chatHeight}vh`,
                paddingBottom: "env(safe-area-inset-bottom)", // Handle iPhone bottom padding
              }}
            >
              {/* Drag Handle Bar */}
              <div
                className="flex justify-center pt-3 pb-2 flex-shrink-0 cursor-grab active:cursor-grabbing"
                onMouseDown={handleDragStart}
              >
                <div className="w-12 h-1 bg-gray-400 rounded-full hover:bg-gray-500 transition-colors"></div>
              </div>

              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{chatTitle}</h3>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Content - Flexible container for messages and input */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden pb-16">
                <CopilotChat
                  agentId="predictive_state_updates"
                  className="h-full flex flex-col"
                />
              </div>
            </div>

            {/* Backdrop */}
            {isChatOpen && (
              <div className="fixed inset-0 z-30" onClick={() => setIsChatOpen(false)} />
            )}
          </>
        ) : (
          <CopilotSidebar
            agentId="predictive_state_updates"
            defaultOpen={chatDefaultOpen}
            labels={{
              modalHeaderTitle: chatTitle,
            }}
          />
        )}
        <DocumentEditor />
        <McpWidgetZoom />
      </div>
    </CopilotKit>
  );
}

interface AgentState {
  document: string;
}

const DocumentEditor = () => {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "min-h-screen p-10" },
    },
  });
  const [placeholderVisible, setPlaceholderVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Stores the markdown document for diffing against agent state
  const currentDocumentRef = useRef("");
  // Stores the last plain text for detecting user edits
  const lastPlainTextRef = useRef("");
  const wasRunning = useRef(false);
  const isMountedRef = useRef(true);

  // Cleanup on unmount to prevent state updates after component is removed
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Track editor focus state
  useEffect(() => {
    if (!editor) return;
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    editor.on("focus", handleFocus);
    editor.on("blur", handleBlur);
    return () => {
      editor.off("focus", handleFocus);
      editor.off("blur", handleBlur);
    };
  }, [editor]);

  useConfigureSuggestions({
    suggestions: [
      {
        title: "Write a pirate story",
        message: "Please write a story about a pirate named Candy Beard.",
      },
      {
        title: "Write a mermaid story",
        message: "Please write a story about a mermaid named Luna.",
      },
      { title: "Add character", message: "Please add a character named Courage." },
      {
        title: "Visualize an algorithm",
        message: "Create an interactive visualization of a binary search algorithm.",
      },
    ],
    available: "always",
  });

  // Handle openLink messages from MCP widget iframes
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "open-link" && typeof e.data.url === "string") {
        window.open(e.data.url, "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Inject agent skills (Excalidraw diagrams, SVG, interactive widgets, etc.)
  useAgentContext({
    description: "Skills and instructions for generating Excalidraw diagrams, SVG visualizations, and interactive widgets",
    value: AGENT_SKILLS,
  });

  // Show tool calls in chat
  useDefaultRenderTool({
    render: ({ name, status, parameters }) => (
      <div className="text-xs text-gray-500 px-3 py-2 rounded bg-gray-50 my-1">
        <span className="font-medium">{name}</span>
        {status === "executing" && <span className="ml-2 animate-pulse">running...</span>}
        {status === "complete" && <span className="ml-2">done</span>}
      </div>
    ),
  });

  const { agent } = useAgent({
    agentId: "predictive_state_updates",
    updates: [UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged],
  });

  const agentState = agent.state as AgentState | undefined;
  const setAgentState = (s: AgentState) => agent.setState(s);
  const isLoading = agent.isRunning;

  // Handle loading state transitions
  useEffect(() => {
    if (isLoading) {
      // Snapshot the current markdown document before agent starts modifying it
      currentDocumentRef.current = agentState?.document || editor?.getText() || "";
    }
    editor?.setEditable(!isLoading);
  }, [isLoading, editor]);

  // Handle final state update when run completes
  useEffect(() => {
    if (!isMountedRef.current) return;

    if (wasRunning.current && !isLoading) {
      const saved = currentDocumentRef.current;
      const newDoc = agentState?.document || "";
      if (saved.trim().length > 0 && saved !== newDoc) {
        const diff = diffPartialText(saved, newDoc, true);
        editor?.commands.setContent(fromMarkdown(diff));
      }
      // Update refs to match the final state
      currentDocumentRef.current = newDoc;
      lastPlainTextRef.current = editor?.getText() || "";
    }
    wasRunning.current = isLoading;
  }, [isLoading]);

  // Handle streaming updates while agent is running
  useEffect(() => {
    if (isLoading) {
      const saved = currentDocumentRef.current;
      const newDoc = agentState?.document || "";
      if (saved.trim().length > 0) {
        const diff = diffPartialText(saved, newDoc);
        editor?.commands.setContent(fromMarkdown(diff));
      } else {
        editor?.commands.setContent(fromMarkdown(newDoc));
      }
    }
  }, [agentState?.document]);

  const text = editor?.getText() || "";

  // Sync user edits to agent state
  useEffect(() => {
    if (!isMountedRef.current) return;
    setPlaceholderVisible(text.length === 0 && !isFocused);

    if (!isLoading && text !== lastPlainTextRef.current) {
      lastPlainTextRef.current = text;
      currentDocumentRef.current = text;
      setAgentState({
        document: text,
      });
    }
  }, [text, isLoading, isFocused, setAgentState]);

  // Auto-accept confirm_changes and write_document tool calls
  useHumanInTheLoop(
    {
      agentId: "predictive_state_updates",
      name: "confirm_changes",
      render: ({ respond, status }) => {
        if (status === "executing" && respond) {
          respond({ accepted: true });
        }
        return <></>;
      },
    },
    [],
  );

  useHumanInTheLoop(
    {
      agentId: "predictive_state_updates",
      name: "write_document",
      description: `Present the proposed changes to the user for review`,
      parameters: z.object({
        document: z.string().describe("The full updated document in markdown format"),
      }),
      render({ status, respond }: { status: string; respond?: (result: unknown) => Promise<void> }) {
        if (status === "executing" && respond) {
          respond({ accepted: true });
        }
        return <></>;
      },
    },
    [],
  );

  return (
    <div className="relative min-h-screen w-full">
      {placeholderVisible && (
        <div className="absolute top-6 left-6 m-4 pointer-events-none text-gray-400">
          Write whatever you want here in Markdown format...
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};


function fromMarkdown(text: string) {
  const md = new MarkdownIt({
    typographer: true,
    html: true,
  });

  return md.render(text);
}

function diffPartialText(oldText: string, newText: string, isComplete: boolean = false) {
  let oldTextToCompare = oldText;
  if (oldText.length > newText.length && !isComplete) {
    // make oldText shorter
    oldTextToCompare = oldText.slice(0, newText.length);
  }

  const changes = diffWords(oldTextToCompare, newText);

  let result = "";
  changes.forEach((part) => {
    if (part.added) {
      result += `<em>${part.value}</em>`;
    } else if (part.removed) {
      result += `<s>${part.value}</s>`;
    } else {
      result += part.value;
    }
  });

  if (oldText.length > newText.length && !isComplete) {
    result += oldText.slice(newText.length);
  }

  return result;
}

function isAlpha(text: string) {
  return /[a-zA-Z\u00C0-\u017F]/.test(text.trim());
}
