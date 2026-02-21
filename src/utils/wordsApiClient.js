export const fetchWordData = async (word) => {
  const normalized = (word || "").trim();
  if (!normalized) {
    throw new Error("A word is required.");
  }

  const response = await fetch(`/api/words?word=${encodeURIComponent(normalized)}`);
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const detail = payload?.error || payload?.message || `Request failed (${response.status})`;
    throw new Error(detail);
  }

  return payload;
};
