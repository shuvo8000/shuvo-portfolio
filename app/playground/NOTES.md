# Accessible Component Notes

## Modal Dialog

I built the modal from scratch following the WAI-ARIA dialog pattern.

### What I handled manually
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` for the dialog title
- Escape key closes the dialog
- Focus moves into the dialog when opened
- Focus returns to the trigger when closed
- Clicking the overlay closes the dialog
- Keyboard-accessible close button

### What shadcn/ui would provide
shadcn/ui provides an accessible dialog structure and handles many accessibility details such as focus management, keyboard interaction, and ARIA attributes.

---

## Tabs

I built the tabs from scratch following the WAI-ARIA tabs pattern.

### What I handled manually
- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- `aria-labelledby`
- Arrow-key navigation between tabs
- Keyboard focus management
- Active tab state

### What shadcn/ui would provide
shadcn/ui provides an accessible tabs implementation with the required ARIA structure and keyboard behavior, reducing the amount of accessibility logic that needs to be written manually.

---

## Disclosure

I built the disclosure from scratch following the WAI-ARIA disclosure pattern.

### What I handled manually
- Toggle open/closed state
- `aria-expanded`
- `aria-controls`
- Keyboard activation through the native button
- Visible focus styling
- Show/hide content

### What shadcn/ui would provide
shadcn/ui provides reusable accessible components and handles common interaction and accessibility patterns, allowing developers to focus more on the application content and styling.

---

## Key Learning

Building these components manually showed me that accessible components require more than visual styling. Keyboard interaction, focus management, semantic roles, and ARIA attributes are important parts of the implementation.