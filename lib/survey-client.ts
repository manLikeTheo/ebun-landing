export async function saveSurveyProgress(payload: Record<string, unknown>) {
  try {
    await fetch("/api/wailist/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // best-effort autosave — never blocks the UI
  }
}