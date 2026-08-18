import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description:
    "CSE student who builds full-stack web applications from backend logic to working frontend.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}