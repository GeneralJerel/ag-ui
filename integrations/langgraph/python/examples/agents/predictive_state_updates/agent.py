"""
A demo of predictive state updates using LangGraph.
"""

import uuid
from typing import List, Any, Optional
import os

# LangGraph imports
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import SystemMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END, START
from langgraph.types import Command
from langgraph.graph import MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI

@tool
def write_document_local(document: str): # pylint: disable=unused-argument
    """
    Write a document. Use markdown formatting to format the document.
    It's good to format the document extensively so it's easy to read.
    You can use all kinds of markdown.
    However, do not use italic or strike-through formatting, it's reserved for another purpose.
    You MUST write the full document, even when changing only a few words.
    When making edits to the document, try to make them minimal - do not change every word.
    Keep stories SHORT!
    """
    return document

class AgentState(MessagesState):
    """
    The state of the agent.
    """
    document: Optional[str] = None
    tools: List[Any]


async def start_node(state: AgentState, config: RunnableConfig): # pylint: disable=unused-argument
    """
    This is the entry point for the flow.
    """
    return Command(
        goto="chat_node"
    )


async def chat_node(state: AgentState, config: Optional[RunnableConfig] = None):
    """
    Standard chat node.
    """

    system_prompt = f"""
    You are a helpful assistant that can write documents AND create visual diagrams.
    Choose the right tool for the task — do NOT mix them unless explicitly asked.

    ## Deciding which tool to use
    - If the user asks to WRITE, EDIT, or CHANGE the document → use write_document_local
    - If the user asks to VISUALIZE, DIAGRAM, DRAW, ILLUSTRATE, or CREATE A VISUAL → use Excalidraw tools
    - NEVER edit the document when the user only asked for a diagram. Read the document for context but do NOT modify it.

    ## Document Writing (write_document_local)
    Only use this when the user wants to create or modify the document text.
    You MUST write the full document, even when changing only a few words.
    When you wrote the document, DO NOT repeat it as a message.
    Just briefly summarize the changes you made. 2 sentences max.
    This is the current state of the document: ----\n {state.get('document')}\n-----

    ## Excalidraw Diagrams (Excalidraw:read_me + Excalidraw:create_view)
    Use these when the user asks to visualize or diagram something.
    You can read the current document for context without modifying it.

    Process:
    1. ALWAYS call Excalidraw:read_me FIRST — it returns the color palette, element syntax,
       camera sizes, and rules. Do NOT skip this step.

    2. Plan before drawing — think through:
       - What are the zones/sections? Assign one color per zone.
       - Colors: blue=#dbe4ff/#4a9eed, purple=#e5dbff/#8b5cf6, green=#d3f9d8/#22c55e, orange=#ffd8a8/#f59e0b
       - Plan 3-6 camera positions for progressive reveal.
       - Reading order: left-to-right or top-to-bottom.

    3. Key rules:
       - First element MUST be a cameraUpdate. Sizes MUST be 4:3 (400x300, 600x450, 800x600, 1200x900).
       - Use `label` property on shapes for text — NOT separate text elements.
       - Minimum shape size: 140x60. Leave 60-80px gaps between rows.
       - Draw order per section: zone background → zone label → nodes → arrows.
       - Use multiple cameraUpdates — pan to each section as you draw it.
       - Final element: wide cameraUpdate showing the full diagram.
       - No emoji. No fontSize below 14. Title fontSize: 26-28.
    """

    # Define the model
    model = ChatOpenAI(model="gpt-5.4-2026-03-05")

    # Define config for the model with emit_intermediate_state to stream tool calls to frontend
    if config is None:
        config = RunnableConfig(recursion_limit=25)

    # Use "predict_state" metadata to set up streaming for the write_document_local tool
    config["metadata"]["predict_state"] = [{
        "state_key": "document",
        "tool": "write_document_local",
        "tool_argument": "document"
    }]

    # Bind the tools to the model
    model_with_tools = model.bind_tools(
        [
            *state["tools"],
            write_document_local
        ],
        # Disable parallel tool calls to avoid race conditions
        parallel_tool_calls=False,
    )

    # Run the model to generate a response
    response = await model_with_tools.ainvoke([
        SystemMessage(content=system_prompt),
        *state["messages"],
    ], config)

    # Update messages with the response
    messages = state["messages"] + [response]

    # Extract any tool calls from the response
    if hasattr(response, "tool_calls") and response.tool_calls:
        tool_call = response.tool_calls[0]

        # Handle tool_call as a dictionary or an object
        if isinstance(tool_call, dict):
            tool_call_id = tool_call["id"]
            tool_call_name = tool_call["name"]
            tool_call_args = tool_call["args"]
        else:
            # Handle as an object (backward compatibility)
            tool_call_id = tool_call.id
            tool_call_name = tool_call.name
            tool_call_args = tool_call.args

        if tool_call_name == "write_document_local":
            # Add the tool response to messages
            tool_response = {
                "role": "tool",
                "content": "Document written.",
                "tool_call_id": tool_call_id
            }

            # Add confirmation tool call
            confirm_tool_call = {
                "role": "assistant",
                "content": "",
                "tool_calls": [{
                    "id": str(uuid.uuid4()),
                    "function": {
                        "name": "confirm_changes",
                        "arguments": "{}"
                    }
                }]
            }

            messages = messages + [tool_response, confirm_tool_call]

            # Return Command to route to end
            return Command(
                goto=END,
                update={
                    "messages": messages,
                    "document": tool_call_args["document"]
                }
            )

        # For other tools (e.g. Excalidraw MCP tools), add a placeholder
        # tool response and loop back so the agent can make follow-up calls
        tool_response = {
            "role": "tool",
            "content": f"Tool {tool_call_name} executed successfully.",
            "tool_call_id": tool_call_id
        }
        messages = messages + [tool_response]

        return Command(
            goto="chat_node",
            update={
                "messages": messages
            }
        )

    # If no tool was called, go to end
    return Command(
        goto=END,
        update={
            "messages": messages
        }
    )


# Define the graph
workflow = StateGraph(AgentState)
workflow.add_node("start_node", start_node)
workflow.add_node("chat_node", chat_node)
workflow.set_entry_point("start_node")
workflow.add_edge(START, "start_node")
workflow.add_edge("start_node", "chat_node")
workflow.add_edge("chat_node", END)

# Conditionally use a checkpointer based on the environment
# Check for multiple indicators that we're running in LangGraph dev/API mode
is_fast_api = os.environ.get("LANGGRAPH_FAST_API", "false").lower() == "true"

# Compile the graph
if is_fast_api:
    # For CopilotKit and other contexts, use MemorySaver
    from langgraph.checkpoint.memory import MemorySaver
    memory = MemorySaver()
    graph = workflow.compile(checkpointer=memory)
else:
    # When running in LangGraph API/dev, don't use a custom checkpointer
    graph = workflow.compile()

