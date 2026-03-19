const BASE = "/api";

export const getItems = async () => {
  const res = await fetch(`${BASE}/items`);
  if (!res.ok) throw new Error("Cannot get the data!");
  return res.json();
};

export const addItem = async (item) => {
  const res = await fetch(`${BASE}/add_item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Cannot add new item!");
  return res.json();
};