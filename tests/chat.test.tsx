import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import ChatPage from "../app/chat/page";
import { useChat } from "@ai-sdk/react";

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

const mockedUseChat = vi.mocked(useChat);

let mockSendMessage: ReturnType<typeof vi.fn>;
let mockRegenerate: ReturnType<typeof vi.fn>;
let mockStop: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockSendMessage = vi.fn().mockResolvedValue(undefined);
  mockRegenerate = vi.fn().mockResolvedValue(undefined);
  mockStop = vi.fn();

  mockedUseChat.mockReturnValue({
    messages: [],
    sendMessage: mockSendMessage,
    status: "ready",
    error: undefined,
    stop: mockStop,
    regenerate: mockRegenerate,
  } as any);
});

describe("BloodConnect AI Chat", () => {
  it("renders the chat page correctly", () => {
    render(<ChatPage />);

    expect(screen.getByText("BloodConnect AI")).toBeInTheDocument();

    expect(
      screen.getByText("AI-assisted blood donor search and guidance")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Send message" })
    ).toBeInTheDocument();
  });

  it("keeps Send disabled when the input is empty", () => {
    render(<ChatPage />);

    const sendButton = screen.getByRole("button", {
      name: "Send message",
    });

    expect(sendButton).toBeDisabled();
  });

  it("enables Send when the user enters a message", () => {
    render(<ChatPage />);

    const input = screen.getByRole("textbox", {
      name: "Ask BloodConnect AI",
    });

    fireEvent.change(input, {
      target: {
        value: "Find O+ donors in Dhaka",
      },
    });

    expect(
      screen.getByRole("button", { name: "Send message" })
    ).toBeEnabled();
  });

  it("sends a message when the Send button is clicked", async () => {
    render(<ChatPage />);

    const input = screen.getByRole("textbox", {
      name: "Ask BloodConnect AI",
    });

    fireEvent.change(input, {
      target: {
        value: "Find O+ donors in Dhaka",
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Send message" })
    );

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith({
        text: "Find O+ donors in Dhaka",
      });
    });
  });

  it("shows the loading state and Stop button", () => {
    mockedUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      stop: mockStop,
      regenerate: mockRegenerate,
    } as any);

    render(<ChatPage />);

    expect(screen.getByText("AI is working...")).toBeInTheDocument();

    const stopButton = screen.getByRole("button", {
      name: "Stop AI response",
    });

    expect(stopButton).toBeInTheDocument();
    expect(stopButton).toHaveTextContent("Stop");
  });

  it("calls stop when the Stop button is clicked", () => {
    mockedUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "streaming",
      error: undefined,
      stop: mockStop,
      regenerate: mockRegenerate,
    } as any);

    render(<ChatPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Stop AI response",
      })
    );

    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  it("shows the success state after sending", async () => {
    render(<ChatPage />);

    const input = screen.getByRole("textbox", {
      name: "Ask BloodConnect AI",
    });

    fireEvent.change(input, {
      target: {
        value: "Find O+ donors in Dhaka",
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Send message" })
    );

    await waitFor(() => {
      expect(screen.getByText("✓ Sent")).toBeInTheDocument();
    });
  });

  it("shows the error state when sending fails", async () => {
    mockSendMessage = vi
      .fn()
      .mockRejectedValue(new Error("Request failed"));

    mockedUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      stop: mockStop,
      regenerate: mockRegenerate,
    } as any);

    render(<ChatPage />);

    const input = screen.getByRole("textbox", {
      name: "Ask BloodConnect AI",
    });

    fireEvent.change(input, {
      target: {
        value: "Find AB+ donors in Dhaka",
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Send message" })
    );

    await waitFor(() => {
      expect(screen.getByText("⚠ Failed")).toBeInTheDocument();
    });
  });

  it("renders a successful donor tool result", () => {
    mockedUseChat.mockReturnValue({
      messages: [
        {
          id: "1",
          role: "assistant",
          parts: [
            {
              type: "tool-searchBloodDonors",
              state: "output-available",
              output: {
                success: true,
                bloodGroup: "O+",
                location: "Dhaka",
                total: 1,
                donors: [
                  {
                    id: 1,
                    name: "Rahim",
                    bloodGroup: "O+",
                    location: "Dhaka",
                    available: true,
                  },
                ],
              },
            },
          ],
        },
      ],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      stop: mockStop,
      regenerate: mockRegenerate,
    } as any);

    render(<ChatPage />);

    expect(
      screen.getByText("🩸 Blood Donor Search Result")
    ).toBeInTheDocument();

    expect(screen.getByText("Rahim")).toBeInTheDocument();

    expect(
      screen.getByText("Available Donors:")
    ).toBeInTheDocument();

    expect(
      screen.getByText("O+ · Dhaka")
    ).toBeInTheDocument();
  });
});