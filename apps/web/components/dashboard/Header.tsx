export default function Header() {
  return (
    <header
      className="flex items-center justify-between border-b border-gray-800 pb-6"
      role="banner"
    >
      <div>
        <h1 className="text-4xl font-bold">
          ⚽ FIFA SmartStadium AI
        </h1>

        <p
          className="mt-2 text-gray-300"
          id="dashboard-description"
        >
          Real-Time Stadium Operations & AI Command Center
        </p>
      </div>

      <div
        className="text-right"
        role="status"
        aria-live="polite"
      >
        <div
          className="font-semibold text-green-400"
          aria-label="System status: Live"
        >
          ● LIVE
        </div>

        <p className="text-sm text-gray-300">
          All Systems Operational
        </p>
      </div>
    </header>
  );
}