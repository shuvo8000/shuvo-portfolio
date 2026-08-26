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

  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
    setButtonState("loading");

    try {
      await sendMessage({
        text: message,
      });

      // Small success feedback
      setButtonState("success");

      window.setTimeout(() => {
        setButtonState("idle");
      }, 1200);
    } catch {
      setButtonState("error");
    }
  };

  const handleRetry = async () => {
    if (loading) return;

    setButtonState("loading");

    try {
      await regenerate();

      setButtonState("success");

      window.setTimeout(() => {
        setButtonState("idle");
      }, 1200);
    } catch {
      setButtonState("error");
    }
  };

  const handleStop = () => {
    stop();
    setButtonState("idle");
  };

  const getButtonText = () => {
    if (buttonState === "loading") {
      return (
        <span className="button-content">
          <span className="spinner" />
          Sending...
        </span>
      );
    }

    if (buttonState === "success") {
      return "✓ Sent";
    }

    if (buttonState === "error") {
      return "⚠ Failed";
    }

    return "Send";
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
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .chat-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .send-button,
        .stop-button,
        .retry-button {
          padding: 12px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .send-button {
          min-width: 110px;
          border: 1px solid #2563eb;
          background: #2563eb;
          color: white;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            opacity 0.2s ease;
        }

        .send-button:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #1d4ed8;
        }

        .send-button:active:not(:disabled) {
          transform: scale(0.97);
        }

        .send-button:focus-visible {
          outline: 3px solid rgba(37, 99, 235, 0.3);
          outline-offset: 2px;
        }

        .send-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .send-button.success {
          background: #16a34a;
          border-color: #16a34a;
        }

        .send-button.error {
          background: #dc2626;
          border-color: #dc2626;
        }

        .stop-button {
          min-width: 110px;
          border: none;
          background: #dc2626;
          color: white;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .stop-button:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }

        .stop-button:active {
          transform: scale(0.97);
        }

        .stop-button:focus-visible {
          outline: 3px solid rgba(220, 38, 38, 0.3);
          outline-offset: 2px;
        }

        .retry-button {
          border: 1px solid #dc2626;
          background: white;
          color: #b91c1c;
          margin-top: 8px;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .retry-button:hover:not(:disabled) {
          background: #fef2f2;
          transform: translateY(-1px);
        }

        .retry-button:focus-visible {
          outline: 3px solid rgba(37, 99, 235, 0.25);
          outline-offset: 2px;
        }

        .retry-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .button-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .examples {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
        }

        .example-button {
          padding: 9px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #f8fafc;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .example-button:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .example-button:focus-visible {
          outline: 3px solid rgba(37, 99, 235, 0.2);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .send-button,
          .stop-button,
          .retry-button,
          .example-button,
          .chat-input,
          .spinner {
            transition: none;
            animation: none;
          }
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
        <h1>BloodConnect AI</h1>

        <p
          style={{
            marginTop: 0,
            color: "#555",
          }}
        >
          AI-assisted blood donor search and guidance
        </p>

        <div className="chat-area">
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

                  if (
                    part.type ===
                    "tool-searchBloodDonors"
                  ) {
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

                    if (
                      part.state ===
                      "output-available"
                    ) {
                      const result =
                        part.output as DonorToolResult;

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
            aria-label="Ask BloodConnect AI"
          />

          {loading ? (
            <button
              type="button"
              className="stop-button"
              onClick={handleStop}
              aria-label="Stop AI response"
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              className={`send-button ${
                buttonState === "success"
                  ? "success"
                  : buttonState === "error"
                    ? "error"
                    : ""
              }`}
              onClick={() => handleSend()}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              {getButtonText()}
            </button>
          )}
        </div>
      </main>
    </>
  );
}