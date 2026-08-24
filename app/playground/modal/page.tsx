"use client";

import { useState } from "react";
import Modal from "./Modal";
import "./modal.css";

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Modal Dialog</h1>

      <p>
        This modal follows keyboard accessibility requirements.
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p>
          Are you sure you want to continue with this action?
        </p>
      </Modal>
    </main>
  );
}