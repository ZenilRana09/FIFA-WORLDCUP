const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getIncidents() {
  if (!API_URL) {
    return { data: [] };
  }

  try {
    const res = await fetch(`${API_URL}/incidents`, {
  cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch incidents");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return { data: [] };
  }
}