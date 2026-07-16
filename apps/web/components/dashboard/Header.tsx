export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-800 pb-6">
      <div>
        <h1 className="text-4xl font-bold">
          ⚽ FIFA SmartStadium AI
        </h1>

        <p className="mt-2 text-gray-400">
          Real-Time Stadium Operations & AI Command Center
        </p>
      </div>

      <div className="text-right">
        <div className="text-green-400 font-semibold">
          ● LIVE
        </div>

        <p className="text-sm text-gray-400">
          All Systems Operational
        </p>
      </div>
    </header>
  );
}