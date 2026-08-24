"use client";

import { useRef, useState } from "react";
import "./tabs.css";

type Tab = {
  id: string;
  label: string;
  content: string;
};

const tabs: Tab[] = [
  {
    id: "overview",
    label: "Overview",
    content: "This is the overview panel.",
  },
  {
    id: "details",
    label: "Details",
    content: "This is the details panel.",
  },
  {
    id: "settings",
    label: "Settings",
    content: "This is the settings panel.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="tabs">
      <div
        className="tab-list"
        role="tablist"
        aria-label="Example tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tabs[activeTab].id}`}
        aria-labelledby={`tab-${tabs[activeTab].id}`}
        tabIndex={0}
        className="tab-panel"
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}