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
    regenerate,
  } = useChat();

  const loading =
    status === "submitted" || status === "streaming";

  const handleSend = async (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || loading) return;

    setInput("");

    try {
      await sendMessage({
        text: message,
      });
    } catch {
      // useChat exposes the error through `error`
    }
  };

  const handleRetry = async () => {
    if (loading) return;

    try {
      await regenerate();
    } catch {
      // Error remains visible through the useChat error state
    }
  };

  return (
    <>
      <style jsx>{`
        .page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        }

        .chat-area {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 18px;
          min-height: 400px;
          margin-top: 20px;
          background: #fff;
        }

        .input-area {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .chat-input {
          flex: 1;
          min-width: 0;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
        }

        .send-button,
        .stop-button,
        .retry-button {
          padding: 12px 20px;
          border-radius: 6px;
          cursor: pointer;
        }

        .send-button {
          border: 1px solid #ccc;
          background: white;
        }

        .stop-button {
          border: none;
          background: #dc2626;
          color: white;
        }

        .retry-button {
          border: 1px solid #dc2626;
          background: white;
          color: #b91c1c;
          margin-top: 8px;
        }

        .examples {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
        }

        .example-button {
          padding: 9px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #f8fafc;
          cursor: pointer;
        }

        .example-button:hover {
          background: #f1f5f9;
        }

        @media (max-width: 600px) {
          .page {
            padding: 20px 12px;
          }

          .chat-area {
            min-height: 350px;
            padding: 12px;
          }

          .input-area {
            flex-direction: column;
          }

          .chat-input,
          .send-button,
          .stop-button {
            width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>

      <main className="page">
        <h1 style={{ marginBottom: "5px" }}>
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

        <div className="chat-area">
          {/* Empty conversation state */}
          {messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "50px 10px",
                color: "#666",
              }}
            >
              <h3 style={{ color: "#222" }}>
                🩸 Find a blood donor
              </h3>

              <p>
                Ask BloodConnect AI to find available
                donors by blood group and location.
              </p>

              <div className="examples">
                <button
                  className="example-button"
                  onClick={() =>
                    handleSend("Find O+ donors in Dhaka")
                  }
                >
                  Find O+ donors in Dhaka
                </button>

                <button
                  className="example-button"
                  onClick={() =>
                    handleSend("Find AB+ donors in Dhaka")
                  }
                >
                  Find AB+ donors in Dhaka
                </button>

                <button
                  className="example-button"
                  onClick={() =>
                    handleSend("Find A+ donors in Dhaka")
                  }
                >
                  Find A+ donors in Dhaka
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: "20px",
              }}
            >
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

                {message.parts.map((part, index) => {
                  {/* Normal AI text */}
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

                  {/* Blood donor tool */}
                  if (
                    part.type ===
                    "tool-searchBloodDonors"
                  ) {
                    {/* Tool input streaming */}
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

                    {/* Tool input received */}
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
                            🔎 Searching blood donors...
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

                    {/* Tool result */}
                    if (
                      part.state ===
                      "output-available"
                    ) {
                      const result =
                        part.output as DonorToolResult;

                      {/* Tool returned error */}
                      if (!result.success) {
                        return (
                          <div
                            key={index}
                            style={{
                              marginTop: "12px",
                              padding: "14px",
                              background: "#fef2f2",
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

                            <button
                              className="retry-button"
                              onClick={handleRetry}
                              disabled={loading}
                            >
                              🔄 Retry search
                            </button>
                          </div>
                        );
                      }

                      {/* Successful result */}
                      return (
                        <div
                          key={index}
                          style={{
                            marginTop: "12px",
                            padding: "16px",
                            background: "#f0fdf4",
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
                            🩸 Blood Donor Search Result
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

                          {/* Donor cards */}
                          {result.donors &&
                            result.donors.length > 0 && (
                              <div
                                style={{
                                  marginTop: "12px",
                                }}
                              >
                                {result.donors.map(
                                  (donor) => (
                                    <div
                                      key={donor.id}
                                      style={{
                                        padding: "10px",
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
                                        {donor.name}
                                      </strong>

                                      <div
                                        style={{
                                          marginTop:
                                            "4px",
                                          color: "#555",
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

                          {/* Empty result */}
                          {result.total === 0 && (
                            <div
                              style={{
                                marginTop: "12px",
                                padding: "12px",
                                background: "#f8fafc",
                                borderRadius: "6px",
                              }}
                            >
                              <strong>
                                No donors found
                              </strong>

                              <p
                                style={{
                                  marginBottom: 0,
                                  color: "#666",
                                }}
                              >
                                No available donors were
                                found for this search.
                                Try another blood group
                                or location.
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }

                    {/* Tool execution error */}
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
                            background: "#fef2f2",
                            border:
                              "1px solid #fecaca",
                            borderRadius: "8px",
                            color: "#991b1b",
                          }}
                        >
                          <strong>
                            ⚠️ Tool execution failed
                          </strong>

                          <p>
                            The donor search could not
                            be completed.
                          </p>

                          <button
                            className="retry-button"
                            onClick={handleRetry}
                            disabled={loading}
                          >
                            🔄 Retry search
                          </button>
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
                padding: "14px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#991b1b",
              }}
            >
              <strong>
                ⚠️ Something went wrong
              </strong>

              <p>
                The request could not be completed.
                Please try again.
              </p>

              <button
                className="retry-button"
                onClick={handleRetry}
                disabled={loading}
              >
                🔄 Retry failed request
              </button>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="input-area">
          <input
            className="chat-input"
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
          />

          {loading ? (
            <button
              type="button"
              className="stop-button"
              onClick={stop}
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              className="send-button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
            >
              Send
            </button>
          )}
        </div>
      </main>
    </>
  );
}