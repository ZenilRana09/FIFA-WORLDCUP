const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getIncidents() {

  if (!API_URL) {
    return {
      data: []
    };
  }

  const res = await fetch(
    `${API_URL}/incidents`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      data: []
    };
  }

  return res.json();
}