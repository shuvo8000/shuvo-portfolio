"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

type Donor = {
  id: number;
  name: string;
  bloodGroup: string;
  location: string;
  available: boolean;
};

type DonorToolResult = {
  success: boolean;
  bloodGroup?: string;
  location?: string;
  total?: number;
  donors?: Donor[];
  error?: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
  } = useChat();

  const loading =
    status === "submitted" || status === "streaming";

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const message = input.trim();

    setInput("");

    await sendMessage({
      text: message,
    });
  };

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "5px",
        }}
      >
        BloodConnect AI
      </h1>

      <p
        style={{
          marginTop: 0,
          color: "#555",
        }}
      >
        AI-assisted blood donor search and guidance
      </p>

      {/* Chat area */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "18px",
          minHeight: "400px",
          marginTop: "20px",
          background: "#fff",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#777" }}>
            Ask about blood donors or donation.
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: "20px",
            }}
          >
            {/* Message header */}
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background:
                  message.role === "user"
                    ? "#f1f5f9"
                    : "#ffffff",
                border:
                  message.role === "assistant"
                    ? "1px solid #eee"
                    : "none",
              }}
            >
              <strong>
                {message.role === "user"
                  ? "You"
                  : "AI"}
              </strong>

              {/* Message parts */}
              {message.parts.map((part, index) => {
                /* -------------------------
                   Normal AI text
                ------------------------- */
                if (part.type === "text") {
                  return (
                    <p
                      key={index}
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.5,
                      }}
                    >
                      {part.text}
                    </p>
                  );
                }

                /* -------------------------
                   Blood donor tool
                ------------------------- */
                if (
                  part.type ===
                  "tool-searchBloodDonors"
                ) {
                  /* Tool input */
                  if (
                    part.state ===
                    "input-streaming"
                  ) {
                    return (
                      <div
                        key={index}
                        style={{
                          marginTop: "12px",
                          padding: "12px",
                          background: "#fff7ed",
                          border:
                            "1px solid #fed7aa",
                          borderRadius: "8px",
                        }}
                      >
                        🔎 Searching for blood
                        donors...
                      </div>
                    );
                  }

                  /* Tool input received */
                  if (
                    part.state ===
                    "input-available"
                  ) {
                    const toolInput =
                      part.input as {
                        bloodGroup: string;
                        location: string;
                      };

                    return (
                      <div
                        key={index}
                        style={{
                          marginTop: "12px",
                          padding: "12px",
                          background: "#eff6ff",
                          border:
                            "1px solid #bfdbfe",
                          borderRadius: "8px",
                        }}
                      >
                        <strong>
                          🔎 Searching blood
                          donors...
                        </strong>

                        <p
                          style={{
                            marginBottom: 0,
                          }}
                        >
                          Blood group:{" "}
                          {toolInput.bloodGroup}
                          <br />
                          Location:{" "}
                          {toolInput.location}
                        </p>
                      </div>
                    );
                  }

                  /* Tool result */
                  if (
                    part.state ===
                    "output-available"
                  ) {
                    const result =
                      part.output as DonorToolResult;

                    /* Tool returned error */
                    if (!result.success) {
                      return (
                        <div
                          key={index}
                          style={{
                            marginTop: "12px",
                            padding: "14px",
                            background:
                              "#fef2f2",
                            border:
                              "1px solid #fecaca",
                            borderRadius: "8px",
                            color: "#991b1b",
                          }}
                        >
                          <strong>
                            ⚠️ Search failed
                          </strong>

                          <p>
                            {result.error ||
                              "Unable to search donor information."}
                          </p>
                        </div>
                      );
                    }

                    /* Successful tool result */
                    return (
                      <div
                        key={index}
                        style={{
                          marginTop: "12px",
                          padding: "16px",
                          background:
                            "#f0fdf4",
                          border:
                            "1px solid #bbf7d0",
                          borderRadius: "8px",
                        }}
                      >
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: "12px",
                          }}
                        >
                          🩸 Blood Donor
                          Search Result
                        </h3>

                        <p>
                          <strong>
                            Blood Group:
                          </strong>{" "}
                          {result.bloodGroup}
                        </p>

                        <p>
                          <strong>
                            Location:
                          </strong>{" "}
                          {result.location}
                        </p>

                        <p>
                          <strong>
                            Available Donors:
                          </strong>{" "}
                          {result.total ?? 0}
                        </p>

                        {result.donors &&
                          result.donors.length >
                            0 && (
                            <div
                              style={{
                                marginTop:
                                  "12px",
                              }}
                            >
                              {result.donors.map(
                                (donor) => (
                                  <div
                                    key={
                                      donor.id
                                    }
                                    style={{
                                      padding:
                                        "10px",
                                      marginBottom:
                                        "8px",
                                      background:
                                        "#ffffff",
                                      border:
                                        "1px solid #ddd",
                                      borderRadius:
                                        "6px",
                                    }}
                                  >
                                    <strong>
                                      {
                                        donor.name
                                      }
                                    </strong>

                                    <div
                                      style={{
                                        marginTop:
                                          "4px",
                                        color:
                                          "#555",
                                      }}
                                    >
                                      {
                                        donor.bloodGroup
                                      }{" "}
                                      ·{" "}
                                      {
                                        donor.location
                                      }
                                    </div>

                                    <div
                                      style={{
                                        marginTop:
                                          "4px",
                                        fontSize:
                                          "13px",
                                        color:
                                          "#15803d",
                                      }}
                                    >
                                      ● Available
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                        {result.total === 0 && (
                          <p
                            style={{
                              color: "#666",
                            }}
                          >
                            No available donors
                            were found for this
                            search.
                          </p>
                        )}
                      </div>
                    );
                  }

                  /* Tool execution error */
                  if (
                    part.state ===
                    "output-error"
                  ) {
                    return (
                      <div
                        key={index}
                        style={{
                          marginTop: "12px",
                          padding: "14px",
                          background:
                            "#fef2f2",
                          border:
                            "1px solid #fecaca",
                          borderRadius: "8px",
                          color: "#991b1b",
                        }}
                      >
                        <strong>
                          ⚠️ Tool execution
                          failed
                        </strong>

                        <p>
                          The donor search
                          could not be
                          completed. Please
                          try again.
                        </p>
                      </div>
                    );
                  }
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div
            style={{
              marginTop: "10px",
              color: "#666",
            }}
          >
            AI is working...
          </div>
        )}

        {/* General error */}
        {error && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#991b1b",
            }}
          >
            ⚠️ Something went wrong.
            <br />
            Please try again.
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Try: Find O+ donors in Dhaka"
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            outline: "none",
          }}
        />

        {loading ? (
          <button
            type="button"
            onClick={stop}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              background: "#dc2626",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              padding: "12px 20px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: input.trim()
                ? "#fff"
                : "#f3f4f6",
              cursor: input.trim()
                ? "pointer"
                : "not-allowed",
            }}
          >
            Send
          </button>
        )}
      </div>
    </main>
  );
}