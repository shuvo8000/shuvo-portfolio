"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // Auto-scroll
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setThinking(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = "";

      // Add empty AI message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      // Read streaming response
      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        // First token has arrived
        setThinking(false);

        const chunk = decoder.decode(value, {
          stream: true,
        });

        assistantMessage += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };

          return updated;
        });
      }
    } catch (error: unknown) {
      // User stopped generation
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        console.log("Generation stopped.");
        return;
      }

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
      setThinking(false);
      setAbortController(null);
    }
  };

  const stopGeneration = () => {
    abortController?.abort();
  };

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1>AI Chat</h1>

      <p>Streaming AI chat interface</p>

      {/* Chat area */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          minHeight: "400px",
          marginTop: "20px",
        }}
      >
        {messages.length === 0 && (
          <p>Start a conversation...</p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              padding: "12px",
              background:
                message.role === "user"
                  ? "#f1f5f9"
                  : "#ffffff",
              borderRadius: "8px",
            }}
          >
            <strong>
              {message.role === "user" ? "You" : "AI"}
            </strong>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {message.content}
            </p>
          </div>
        ))}

        {/* Thinking indicator */}
        {thinking && (
          <p>
            <strong>AI</strong>
            <br />
            AI is thinking...
          </p>
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <button
          type="button"
          onClick={
            loading ? stopGeneration : sendMessage
          }
          disabled={!loading && !input.trim()}
          style={{
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          {loading ? "Stop" : "Send"}
        </button>
      </div>
    </main>
  );
}