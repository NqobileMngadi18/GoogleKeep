const API_BASE = "/api"; // frontend proxy handles localhost:5000


export async function getNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}


export async function createNote(note) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}


export async function getReminders() {
  const res = await fetch(`${API_BASE}/reminders`);
  if (!res.ok) throw new Error("Failed to fetch reminders");
  return res.json();
}
