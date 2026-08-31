import "./globals.css";
import Navbar from "../components/layout/Navbar";

export const metadata = {
  title: "BloodConnect | Blood Donor Management",
  description:
    "BloodConnect is a web application for finding blood donors, managing donor information, and accessing blood bank resources.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "BloodConnect | Blood Donor Management",
    description:
      "A web application for finding blood donors and managing blood donation resources.",
    type: "website",
    url: "https://shuvo-portfolio-taupe.vercel.app/",
    siteName: "BloodConnect",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}