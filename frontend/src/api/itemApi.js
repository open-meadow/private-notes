const BASE = "http://127.0.0.1:8000";

const itemApi = {
  
  getAll: async () => {
    const res = await fetch(`${BASE}/items`);
    if (!res.ok) throw new Error("Cannot get the data!");
    return res.json();
  },

  addItem: async (item) => {
    const res = await fetch(`${BASE}/add_item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        category: item.categoryId,
        ingredients: item.materials,
        description: item.description,
        extra: item.image ?? null,
      }),
    });
    if (!res.ok) throw new Error("Failed to add item");
    return res.json();
  },

  editItem: async (id, item) => {
    const res = await fetch(`${BASE}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        category: item.categoryId,
        ingredients: item.materials,
        description: item.description,
        image: item.image ?? null,
      }),
    });
    if (!res.ok) throw new Error("Failed to update item");
    return res.json();
  },
};

export default itemApi;  