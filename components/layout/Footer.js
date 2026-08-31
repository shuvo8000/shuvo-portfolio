import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 text-center">
        
        <span className="text-sm text-gray-500">
          BloodConnect — Capstone skeleton. Built with Next.js.
        </span>

        {/* FlyRank AI Internship Badge */}
        <a
          href="https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=SHUVO"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verify SHUVO BISWAS's FlyRank AI Internship credential FR-D1-T668H-R789R"
          style={{
            boxSizing: "border-box",
            padding: "10px 14px",
            border: "1px solid #DDE4E7",
            background: "#FFFFFF",
            textDecoration: "none",
            fontFamily:
              "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "14px",
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="96" height="96" rx="22" fill="#051F21" />
            <path
              d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
              fill="#54E399"
            />
          </svg>

          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              textAlign: "left",
            }}
          >
            <span
              style={{
                color: "rgba(5,31,33,0.5)",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily:
                  "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
                fontSize: "8px",
              }}
            >
              FlyRank AI Internship
            </span>

            <span
              style={{
                color: "#051F21",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Verified credential
            </span>

            <span
              style={{
                color: "#1A7A4A",
                fontFamily:
                  "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
                fontSize: "10px",
              }}
            >
              FR-D1-T668H-R789R
            </span>
          </span>

          <span
            style={{
              padding: "5px 9px",
              border: "1px solid rgba(84,227,153,0.28)",
              background: "rgba(84,227,153,0.12)",
              color: "#1A7A4A",
              fontWeight: "600",
              borderRadius: "9999px",
              fontSize: "11px",
            }}
          >
            Verify
          </span>
        </a>

        <Link
          href="/health"
          className="text-xs font-medium text-gray-400 transition-colors hover:text-[var(--color-brand)]"
        >
          Health Check
        </Link>
      </div>
    </footer>
  );
}