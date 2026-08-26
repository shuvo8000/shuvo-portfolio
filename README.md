# BloodConnect AI

AI-assisted blood donor search and guidance application built with Next.js, React, TypeScript, AI SDK, Groq, and Zod.

## Project Overview

BloodConnect AI helps users search for available blood donors using natural-language queries. The AI interprets the user's request and uses a structured donor-search tool to return matching donor information.

Example:

> Find O+ donors in Dhaka

The application then displays the tool result directly in the UI and provides a short AI-generated explanation.

---

## Features

- Natural-language blood donor search
- Structured AI tool calling
- Blood group and location based filtering
- Available donor results
- Empty-result handling
- Error state handling
- Structured tool-result UI
- Responsive chat interface
- TypeScript-based implementation

---

## Technology Stack

- Next.js
- React
- TypeScript
- AI SDK
- Groq
- Zod
- CSS

---

## AI Integration

The application uses the Groq provider through the AI SDK.

The AI model is used to understand the user's request and decide when the donor-search tool should be called.

### Model

```text
openai/gpt-oss-120b
