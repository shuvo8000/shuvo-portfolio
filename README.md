# BloodConnect

BloodConnect is a blood donation management project with a modern Next.js portfolio interface. It presents blood donor and blood bank related features together with an AI chat interface and an interactive WebGL/GLSL shader hero.

## Live Demo

**Production Website:**  
https://shuvo-portfolio-taupe.vercel.app/

**GitHub Repository:**  
https://github.com/shuvo8000/shuvo-portfolio

**Demo Video:**  
https://drive.google.com/file/d/1XpfRjn0ZtODJa_65JLcUL2R1FlY2xbXj/view?usp=sharing

---

## Overview

BloodConnect is designed to demonstrate a practical blood donation management interface.

The project is intended for users who need to explore blood donation related information, search for donors, register donor information, view blood bank information, and interact with an AI-assisted chat interface.

The project was developed as part of my FlyRank internship work under the Front-end AI Engineering track.

---

## Main Features

### Blood Donor Search

The project includes a donor search interface for finding available donors based on blood group and location.

Example:

```text
Blood Group: O+
Location: Dhaka


The current demonstration dataset contains sample donor information.

Donor Registration

A dedicated donor registration page is included as part of the application structure.

Blood Bank

The project includes a Blood Bank section for presenting blood bank related information.

AI Chat

The project includes an AI chat interface designed to help users interact with the BloodConnect system.

The AI assistant can use a donor-search tool to search the available donor dataset.

Portfolio

The homepage also works as a developer portfolio and presents:

Featured projects
Technology stack
Project descriptions
Contact section
Internship credential area
Interactive WebGL Shader Hero

The portfolio homepage contains a custom fullscreen WebGL fragment shader.

The shader is implemented using:

WebGL
GLSL
Fragment shaders
u_time
u_resolution
u_mouse

The shader creates an animated visual background behind the hero content.

Technology Stack
Frontend
Next.js
React
JavaScript
HTML
CSS
Tailwind CSS
Backend / Data
Python
Flask
SQLite
AI
AI SDK
Groq
Tool calling
Zod schema validation
Graphics
WebGL
GLSL
Fragment Shader
Deployment
GitHub
Vercel
Project Structure
shuvo-portfolio/
│
├── app/
│   ├── api/
│   │   └── chat/
│   ├── blood-bank/
│   ├── chat/
│   ├── contact/
│   ├── donors/
│   ├── health/
│   ├── playground/
│   ├── register/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   └── layout/
│       ├── Footer.js
│       ├── Navbar.js
│       ├── PagePlaceholder.js
│       └── ShaderHero.jsx
│
├── public/
│
├── package.json
├── package-lock.json
└── README.md
Getting Started
Prerequisites

Make sure the following are installed:

Node.js
npm
Git
1. Clone the repository
git clone https://github.com/shuvo8000/shuvo-portfolio.git
2. Enter the project directory
cd shuvo-portfolio
3. Install dependencies
npm install
4. Start the development server
npm run dev

The application will normally be available at:

http://localhost:3000

Open the address in a browser.

Production Build

To test the production build locally:

npm run build

If the build completes successfully, start the production server with:

npm start
Usage

After starting the application, a user can:

Open the homepage.
Explore the interactive shader hero.
View featured projects.
Explore the BloodConnect sections.
Open Donor Search.
Open Register Donor.
View Blood Bank information.
Open the AI Chat interface.
Check the Health page.
Explore the portfolio playground.
Architecture

The application uses a component-based Next.js structure.

                    User
                      │
                      ▼
              Next.js Application
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
     Portfolio UI            BloodConnect UI
          │                       │
          │             ┌─────────┼─────────┐
          │             │         │         │
          ▼             ▼         ▼         ▼
     ShaderHero      Donor     Blood Bank  AI Chat
          │          Search        │         │
          │             │          │         │
          ▼             └────┬─────┘         ▼
     WebGL / GLSL             │          API Route
                              │              │
                              ▼              ▼
                         Donor Data     AI Model / Tool
WebGL Shader Architecture

The fullscreen shader is implemented as a reusable React component.

Home Page
    │
    ▼
ShaderHero.jsx
    │
    ▼
HTML Canvas
    │
    ▼
WebGL Context
    │
    ├── Vertex Shader
    │
    └── Fragment Shader
            │
            ├── u_time
            ├── u_resolution
            └── u_mouse

The fragment shader generates the visual effect directly on the GPU.

Shader Implementation

The shader uses a fullscreen canvas and renders a fragment shader across the entire hero area.

u_time

u_time controls the time-based animation.

This allows the shader pattern to change continuously.

u_resolution

u_resolution provides the canvas dimensions to the shader.

It is used to keep the visual effect correctly scaled across different screen sizes.

u_mouse

u_mouse receives the mouse position and provides an interaction input for the shader.

Performance Considerations

The shader implementation includes several performance considerations:

The device pixel ratio is capped.
The shader is rendered using WebGL.
The animation can be stopped when reduced motion is requested.
The canvas is resized according to the display dimensions.
The shader is kept separate from the actual text content.
Design Decisions
Why use a WebGL shader?

A static image could have been used for the hero background, but I wanted the portfolio to have a distinctive visual identity.

A custom shader provides:

Animation
Interactivity
GPU-based rendering
A unique visual signature

It also demonstrates knowledge of WebGL and GLSL rather than relying only on standard CSS effects.

Why keep content above the shader?

The shader is treated as a background visual rather than the primary content.

The heading and supporting text remain in a separate layer so that users can still read the important information while the animation is running.

Evaluation and Testing

The project was tested locally and after production deployment.

Build Test

The production build was tested using:

npm run build

The build completed successfully.

Deployment Test

The production website was checked using:

https://shuvo-portfolio-taupe.vercel.app/

The homepage and shader hero were verified after deployment.

Manual Testing

The following areas were checked:

Homepage
Navigation
Donor Search page
Register Donor page
Blood Bank page
AI Chat page
Contact page
Playground page
Responsive layout
Shader rendering
V2 Evaluation Results

The V2 evaluation focused on the updated portfolio implementation and interactive shader hero.

Area	Result
Production deployment	Passed
Homepage loading	Passed
Shader hero rendering	Passed
Mouse interaction	Passed
Responsive hero layout	Tested
Reduced-motion handling	Implemented
Production build	Passed
GitHub repository	Available
Live deployment	Available

The evaluation was primarily based on manual functional testing and production deployment verification.

Limitations

The current project has several known limitations.

1. Sample donor data

The donor search demonstration uses a limited sample dataset rather than a large production database.

2. Some pages are demonstration/placeholder pages

Some BloodConnect sections currently demonstrate the intended interface structure rather than a complete production workflow.

3. AI chat dependency

The AI chat depends on the configured AI provider and API environment.

If the required API configuration is unavailable or the service request fails, the AI functionality may not respond normally.

4. WebGL support

The shader requires browser WebGL support.

Older or low-powered devices may provide lower visual performance.

5. Placeholder project images

Some portfolio project cards still use placeholder areas instead of final project screenshots.

AI Usage and Transparency

AI tools were used during development, including Claude, for:

Code generation
Debugging assistance
Component implementation ideas
WebGL/GLSL implementation assistance
README drafting
Problem analysis

I reviewed, tested, modified, and integrated the generated code myself.

The final implementation was tested locally and after deployment rather than being accepted blindly from AI output.

Demo Video

The 3–5 minute live demonstration shows the actual deployed application rather than slides.

The demonstration covers:

The live portfolio
BloodConnect interface
Interactive shader hero
Navigation
Design decision behind the shader
One limitation of the current implementation

Demo Video:

https://drive.google.com/file/d/1XpfRjn0ZtODJa_65JLcUL2R1FlY2xbXj/view?usp=sharing

Repository

GitHub repository:

https://github.com/shuvo8000/shuvo-portfolio

Live application:

https://shuvo-portfolio-taupe.vercel.app/

Internship Information

Program: FlyRank AI Internship

Track: Front-end AI Engineering

Project: BloodConnect Portfolio

Student: Shuvo Biswas

Future Improvements

Future versions could include:

A real database for donor records
Authentication and authorization
Real donor registration
Advanced donor filtering
Blood inventory management
Improved AI assistant capabilities
Better API security and rate limiting
Real project screenshots
Improved mobile shader performance
More advanced WebGL interactions
Production-ready backend integration
License

This project was created for educational and internship purposes.