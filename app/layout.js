import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "BloodConnect",
  description:
    "CSE student who builds full-stack web applications from backend logic to working frontend.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}