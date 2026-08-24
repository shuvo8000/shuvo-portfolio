import Disclosure from "./Disclosure";
import "./disclosure.css";

export default function DisclosurePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Disclosure</h1>

      <p>
        An accessible disclosure component following the WAI-ARIA pattern.
      </p>

      <Disclosure />
    </main>
  );
}