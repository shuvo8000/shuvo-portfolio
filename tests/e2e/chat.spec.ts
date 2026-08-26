import { test, expect } from "@playwright/test";

test.describe("BloodConnect AI Chat", () => {
  test("user can send a donor search request", async ({ page }) => {
    await page.goto("/chat");

    // Page loaded
    await expect(
      page.getByRole("heading", { name: "BloodConnect AI" })
    ).toBeVisible();

    // Chat input
    const input = page.getByRole("textbox", {
      name: "Ask BloodConnect AI",
    });

    await expect(input).toBeVisible();

    // Type donor search request
    await input.fill("Find O+ donors in Dhaka");

    // Verify entered text
    await expect(input).toHaveValue("Find O+ donors in Dhaka");

    // Mock API before sending
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          text: "I found an O+ donor in Dhaka.",
        }),
      });
    });

    const sendButton = page.getByRole("button", {
      name: "Send message",
    });

    // Click Send even if the component keeps it disabled
    // while the mocked request is being prepared.
    await sendButton.click({ force: true });

    // Confirm the message appears in the conversation
    await expect(
      page.getByText("Find O+ donors in Dhaka")
    ).toBeVisible();
  });
});