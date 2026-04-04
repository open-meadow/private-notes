import { useState, useEffect } from "react";
import { getItems, addItem } from "../api/itemApi";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Get data from API when loading
  useEffect(() => {
    getItems()
      .then(data => setItems(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Add new item
  const handleAddItem = async (newItem) => {
    const result = await addItem(newItem);
    setItems(prev => [...prev, result.item]);
    return result;
  };

  // Filter
  const filtered = items.filter(item => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return {
    filtered, loading, error,
    activeCategory, setCategory,
    setSearch, handleAddItem,
  };
}