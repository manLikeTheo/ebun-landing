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

export async function submitSurvey(payload: {
  sessionId: string;
  senderType: string;
  frustration: string;
  occasion: string;
}): Promise<boolean> {
  try {
    const res = await fetch("/api/waitlist/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: payload.sessionId,
        completed: true,
        sender_type: payload.senderType,
        frustration_tags: payload.frustration,
        reveal_usecase: payload.occasion,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      console.error("Waitlist survey submission failed:", res.status, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Waitlist survey request failed:", error);
    return false;
  }
}