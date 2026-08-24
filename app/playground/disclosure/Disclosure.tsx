"use client";

import { useId, useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="disclosure">
      <button
        type="button"
        className="disclosure-trigger"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>More Information</span>
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div
          id={contentId}
          className="disclosure-content"
        >
          <p>
            This section contains additional information that can be
            shown or hidden by the user.
          </p>
        </div>
      )}
    </div>
  );
}