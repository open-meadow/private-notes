import { useState, useEffect } from "react"
import RecipeCard   from "./components/RecipeCard"
import DetailModal  from "./components/DetailModal"
import AddItemModal from "./components/AddItemModal"
import Toast        from "./components/Toast"
import Sidebar      from "./components/Sidebar"
import itemApi from "./api/itemApi" 

const CATEGORY_MAP = {
  1: "Food",
  2: "Drink",
  3: "Dessert",
  4: "Item",
}


export default function App() {
  const [items, setItems]               = useState([])
  const [activeCategory, setCategory]   = useState("all")
  const [search, setSearch]             = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editItem, setEditItem]         = useState(null)
  const [toast, setToast]               = useState(null)
  const [sortBy, setSortBy]             = useState("id_asc")  

  //connect to http://127.0.0.1:8000/items
 useEffect(() => {
  const loadItems = async () => {
    try {
      const data = await itemApi.getAll();
      const normalized = data.map(item => ({
        ...item,
        name:        item.name,          
        category:    CATEGORY_MAP[item.category],  
        materials:   item.ingredients,   
        description: item.description,   
        image:       item.extra,         
      }))
      setItems(normalized);
    } catch (err) {
      console.error("Failed to load items:", err);
    }
  };
  loadItems();
}, []);
  // Filter + Search
  const filtered = items.filter(item => {
  const matchCat    = activeCategory === "all" || item.category === activeCategory
  const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase())
                   || item.materials?.toLowerCase().includes(search.toLowerCase())
  return matchCat && matchSearch
})

  // Sort 
  const sorted = [...filtered].sort((a, b) => {
  if (sortBy === "id_asc")   return a.id - b.id
  if (sortBy === "id_desc")  return b.id - a.id
  if (sortBy === "name_az")  return (a.name || "").localeCompare(b.name || "")
  if (sortBy === "name_za")  return (b.name || "").localeCompare(a.name || "")
  return 0
})

  // Counts
  const counts = {
    all:     items.length,
    Food:    items.filter(i => i.category === "Food").length,
    Drink:   items.filter(i => i.category === "Drink").length,
    Dessert: items.filter(i => i.category === "Dessert").length,
    Item:    items.filter(i => i.category === "Item").length,
  }

  const showToast = (msg, type = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = async (newItem) => {
  try {
    const result = await itemApi.addItem(newItem)

    // Normalize item from API
    const normalized = {
      ...result,
      name:        result.name,
      category:    CATEGORY_MAP[result.category],
      materials:   result.ingredients,
      description: result.description,
      image:       result.extra,
    }

    setItems(prev => [...prev, normalized])
    setShowAddModal(false)
    showToast(" Note added!")
  } catch (err) {
    console.error(err)
    showToast(" Failed to add note!", "error")
  }
}

  const handleEdit = (updatedItem) => {
    setItems(prev => prev.map(i =>
      i.id === editItem.id ? { ...updatedItem, id: editItem.id } : i
    ))
    setEditItem(null)
    showToast("✅ Note updated!")
  }

  const handleDelete = (id) => {
    if (!window.confirm("Delete this note?")) return
    setItems(prev => prev.filter(i => i.id !== id))
    showToast("🗑️ Note deleted!", "error")
  }

  return (
    <>
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setCategory}
        onSearch={setSearch}
        onAddNew={() => setShowAddModal(true)}
        counts={counts}
      />

      <main style={{ marginLeft: "260px", padding: "32px 44px" }}>

        {/* Topbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "36px", color: "var(--brown-deep)" }}>
            Your{" "}
            <em style={{
                fontStyle: "italic",
               background: "linear-gradient(270deg, #C4622D, #C8963E, #A0622A, #e8b86d, #C4622D)",
               backgroundSize: "300% 300%",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               backgroundClip: "text",
               animation: "gradientFlow 4s ease infinite",
                       }}>
                    Lovely Notes
            </em>
          </h2>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {filtered.length} note{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Sort bar  */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase" }}>
               Sort by
           </span>
          <select
              value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={sortSelectStyle}
          >
            <option value="id_asc">ID ↑ Ascending</option>
            <option value="id_desc">ID ↓ Descending</option>
            <option value="name_az">Name A → Z</option>
            <option value="name_za">Name Z → A</option>
          </select>
        </div>

        {/* Empty state */}
        {sorted.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>📝</div>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", color: "var(--brown-mid)", marginBottom: "8px" }}>
              No notes found
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
              Try a different search or add a new note!
            </p>
          </div>
        )}

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "22px" }}>
          {sorted.map(item => (   // 
            <RecipeCard
              key={item.id}
              item={item}
              onClick={setSelectedItem}
              onEdit={setEditItem}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} onSave={handleAdd} />
      )}

      {editItem && (
        <AddItemModal
          onClose={() => setEditItem(null)}
          onSave={handleEdit}
          editItem={editItem}
        />
      )}

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </>
  )
}

// sortbar style
const sortSelectStyle = {
  padding: "7px 14px", borderRadius: "10px",
  border: "1.5px solid var(--border)", background: "#fff",
  color: "var(--brown-deep)", fontSize: "13px",
  fontFamily: "DM Sans, sans-serif", cursor: "pointer", outline: "none",
}