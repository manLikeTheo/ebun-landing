export async function submitWaitlist(payload: {
  whatsapp: string;
  email?: string;
  hp: string;
  ref: string | null;
}): Promise<{ id: string; queueNumber: number }> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong. Try again.");
  }
  return res.json();
}

export async function fetchWaitlistStatus(id: string) {
  const res = await fetch(`/api/waitlist/status?id=${id}`);
  if (!res.ok) return null;
  return res.json() as Promise<{ queueNumber: number; referralCount: number; position: number }>;
}