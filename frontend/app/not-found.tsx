import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-stadium-dark">404</h1>
      <p className="mt-2 text-gray-600">This page doesn&apos;t exist — like a gate that was never built.</p>
      <Link href="/" className="btn-primary inline-block mt-6">
        Back to home
      </Link>
    </div>
  );
}
