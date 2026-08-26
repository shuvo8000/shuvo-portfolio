import {
  streamText,
  tool,
  stepCountIs,
  convertToModelMessages,
  type UIMessage,
} from "ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";

type Donor = {
  id: number;
  name: string;
  bloodGroup: string;
  location: string;
  available: boolean;
};

const bloodDonors: Donor[] = [
  {
    id: 1,
    name: "Rahim",
    bloodGroup: "O+",
    location: "Dhaka",
    available: true,
  },
  {
    id: 2,
    name: "Karim",
    bloodGroup: "A+",
    location: "Dhaka",
    available: true,
  },
  {
    id: 3,
    name: "Sadia",
    bloodGroup: "O+",
    location: "Chittagong",
    available: true,
  },
  {
    id: 4,
    name: "Nabila",
    bloodGroup: "B+",
    location: "Dhaka",
    available: false,
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages = body.messages as UIMessage[];

    const result = streamText({
      model: openai("gpt-4.1-mini"),

      system: `
You are BloodConnect AI.

You help users find blood donors.

Rules:
- When the user asks to find donors, ALWAYS use the searchBloodDonors tool.
- Never invent donor information.
- Only mention donors returned by the tool.
- If no donor is found, clearly say that no available donor was found.
- After using the tool, give a short and clear answer.
- Do not claim that a donor is available unless the tool says available: true.
`,

      messages: await convertToModelMessages(messages),

      tools: {
        searchBloodDonors: tool({
          description:
            "Search available blood donors by blood group and location.",

          inputSchema: z.object({
            bloodGroup: z
              .string()
              .describe("Blood group such as O+, A+, B+, AB+"),

            location: z
              .string()
              .describe("City or area such as Dhaka"),
          }),

          execute: async ({
            bloodGroup,
            location,
          }) => {
            const normalizedBloodGroup =
              bloodGroup.trim().toLowerCase();

            const normalizedLocation =
              location.trim().toLowerCase();

            const results = bloodDonors.filter(
              (donor) =>
                donor.bloodGroup.toLowerCase() ===
                  normalizedBloodGroup &&
                donor.location.toLowerCase() ===
                  normalizedLocation &&
                donor.available === true
            );

            return {
              success: true,
              bloodGroup,
              location,
              total: results.length,
              donors: results,
            };
          },
        }),
      },

      stopWhen: stepCountIs(3),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process chat request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}