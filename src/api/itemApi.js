const BASE = "http://127.0.0.1:8000";

const itemApi = {
  getAll: async () => {
    const res = await fetch(`${BASE}/items`);
    if (!res.ok) throw new Error("Cannot get the data!");
    return res.json();
  },
  add: async (item) => {
    const res = await fetch(`${BASE}/add_item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Cannot add new item!");
    return res.json();
  },
};

export default itemApi;  