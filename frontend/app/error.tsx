"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-stadium-dark">Something went wrong</h1>
      <p className="mt-2 text-gray-600">We hit an unexpected issue. Please try again.</p>
      <button onClick={() => reset()} className="btn-primary inline-block mt-6">
        Try again
      </button>
    </div>
  );
}
