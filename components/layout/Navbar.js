import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/donors", label: "Donor Search" },
  { href: "/register", label: "Register Donor" },
  { href: "/blood-bank", label: "Blood Bank" },
  { href: "/chat", label: "AI Chat" },
  { href: "/contact", label: "Contact" },
];
export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-bold text-[var(--color-brand)]">
          BloodConnect
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-700 transition-colors hover:text-[var(--color-brand)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
