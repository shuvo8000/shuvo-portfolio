import { fetchMockHealthData } from "../../data/mockHealthData";

export const metadata = {
  title: "Health Check | BloodConnect",
};

export default async function HealthPage() {
  const records = await fetchMockHealthData();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--color-brand-dark)] sm:text-3xl">
        Health Check
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
        This page renders data returned by a local mock source (
        <code className="rounded bg-[var(--color-surface)] px-1 py-0.5 text-xs">
          data/mockHealthData.js
        </code>
        ) through a simulated async call. No external API is used — this
        confirms the app can fetch and render data end to end ahead of a real
        backend being connected.
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-[var(--color-border)]">
        <table className="min-w-full divide-y divide-[var(--color-border)] text-sm">
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Check
              </th>

              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-border)] bg-white">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-4 py-3 text-gray-700">
                  {record.label}
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-[var(--color-brand-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-brand-dark)]">
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}