const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000/api";

export async function getIncidents() {
  const res = await fetch(`${API_URL}/incidents`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch incidents (${res.status})`);
  }

  return res.json();
}