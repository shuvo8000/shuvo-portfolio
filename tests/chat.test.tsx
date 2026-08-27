import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

import ChatPage from "../app/chat/page";
import { useChat } from "@ai-sdk/react";

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

const mockedUseChat = vi.mocked(useChat);

let mockSendMessage: ReturnType<typeof vi.fn>;
let mockRegenerate: ReturnType<typeof vi.fn>;
let mockStop: ReturnType<typeof vi.fn>;

// IMPORTANT:
// Remove the previous rendered page after every test.
afterEach(() => {
  cleanup();
});

const getChatInput = () =>
  screen.getAllByPlaceholderText("Try: Find O+ donors in Dhaka")[0];

const getSendButton = () =>
  screen.getAllByRole("button", {
    name: "Send message",
  })[0];

const getStopButton = () =>
  screen.getAllByRole("button", {
    name: "Stop AI response",
  })[0];

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

    expect(
      screen.getByText("BloodConnect AI")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "AI-assisted blood donor search and guidance"
      )
    ).toBeInTheDocument();

    expect(getSendButton()).toBeInTheDocument();
  });

  it("keeps Send disabled when the input is empty", () => {
    render(<ChatPage />);

    expect(getSendButton()).toBeDisabled();
  });

  it("enables Send when the user enters a message", () => {
    render(<ChatPage />);

    const input = getChatInput();

    fireEvent.change(input, {
      target: {
        value: "Find O+ donors in Dhaka",
      },
    });

    expect(getSendButton()).toBeEnabled();
  });

  it("sends a message when the Send button is clicked", async () => {
    render(<ChatPage />);

    const input = getChatInput();

    fireEvent.change(input, {
      target: {
        value: "Find O+ donors in Dhaka",
      },
    });

    fireEvent.click(getSendButton());

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

    expect(
      screen.getByText("AI is working...")
    ).toBeInTheDocument();

    const stopButton = getStopButton();

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

    fireEvent.click(getStopButton());

    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  it("shows the success state after sending", async () => {
    render(<ChatPage />);

    const input = getChatInput();

    fireEvent.change(input, {
      target: {
        value: "Find O+ donors in Dhaka",
      },
    });

    fireEvent.click(getSendButton());

    await waitFor(() => {
      expect(
        screen.getByText("✓ Sent")
      ).toBeInTheDocument();
    });
  });

  it("shows the error state when sending fails", async () => {
    mockSendMessage = vi
      .fn()
      .mockRejectedValue(
        new Error("Request failed")
      );

    mockedUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: "ready",
      error: undefined,
      stop: mockStop,
      regenerate: mockRegenerate,
    } as any);

    render(<ChatPage />);

    const input = getChatInput();

    fireEvent.change(input, {
      target: {
        value: "Find AB+ donors in Dhaka",
      },
    });

    fireEvent.click(getSendButton());

    await waitFor(() => {
      expect(
        screen.getByText("⚠ Failed")
      ).toBeInTheDocument();
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

    expect(
      screen.getByText("Rahim")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Available Donors:")
    ).toBeInTheDocument();

    expect(
      screen.getByText("O+ · Dhaka")
    ).toBeInTheDocument();
  });
});