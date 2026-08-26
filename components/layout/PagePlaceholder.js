export default function PagePlaceholder({ title, description, children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--color-brand-dark)] sm:text-3xl">
        {title}
      </h1>

      {description && (
        <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
          {description}
        </p>
      )}

      <div className="mt-8 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-sm text-gray-500">
        {children ??
          "This screen is a placeholder. Full functionality will be implemented in a later milestone."}
      </div>
    </section>
  );
}