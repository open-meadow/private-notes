import { useState } from "react"
import RecipeCard   from "./components/RecipeCard"
import DetailModal  from "./components/DetailModal"
import AddItemModal from "./components/AddItemModal"
import Toast        from "./components/Toast"
import Sidebar      from "./components/Sidebar"


const MOCK_DATA = [
  {
    id: 1, category: "Food",
    name: "Classic Beef Pho",
    materials: "Rice noodles, beef brisket, star anise, cinnamon, ginger, onion, fish sauce",
    description: "A traditional Vietnamese noodle soup with rich broth, slow-cooked for 6 hours.",
    image: null
  },
  {
    id: 2, category: "Drink",
    name: "Brown Sugar Bubble Tea",
    materials: "Black tea, fresh milk, brown sugar syrup, tapioca pearls, ice",
    description: "Creamy milk tea with chewy tapioca pearls and caramelized brown sugar.",
    image: null
  },
  {
    id: 3, category: "Dessert",
    name: "Caramel Flan",
    materials: "Eggs, whole milk, sugar, vanilla extract, caramel sauce",
    description: "Silky smooth custard with a golden caramel top. Chill overnight for best results.",
    image: null
  },
  {
    id: 4, category: "Food",
    name: "Garlic Butter Pasta",
    materials: "Spaghetti, butter, garlic, parmesan, parsley, black pepper, olive oil",
    description: "Quick and easy pasta tossed in rich garlic butter sauce. Ready in 20 minutes.",
    image: null
  },
  {
    id: 5, category: "Drink",
    name: "Fresh Lemonade",
    materials: "Lemon, water, sugar syrup, mint leaves, ice cubes",
    description: "Refreshing homemade lemonade. Add mint for an extra kick.",
    image: null
  },
  {
    id: 6, category: "Item",
    name: "How to Fix a Leaky Faucet",
    materials: "Wrench, replacement washer, plumber tape, screwdriver",
    description: "Step 1: Turn off water supply. Step 2: Remove handle. Step 3: Replace washer. Step 4: Reassemble.",
    image: null
  },
  {
    id: 7, category: "Dessert",
    name: "Chocolate Lava Cake",
    materials: "Dark chocolate, butter, eggs, sugar, flour, cocoa powder, vanilla",
    description: "Warm chocolate cake with a gooey molten center. Serve immediately with vanilla ice cream.",
    image: null
  },
  {
    id: 8, category: "Item",
    name: "Morning Productivity Routine",
    materials: "Journal, water bottle, workout clothes, phone (no social media)",
    description: "Wake at 6AM. Drink water. 20 min workout. Journal 3 goals. No phone for first hour.",
    image: null
  },
  {
    id: 9, category: "Food",
    name: "Avocado Toast",
    materials: "Sourdough bread, ripe avocado, lemon juice, chili flakes, sea salt, poached egg",
    description: "Smash avocado with lemon and salt. Spread on toasted sourdough. Top with a poached egg.",
    image: null
  },
  {
    id: 10, category: "Drink",
    name: "Matcha Latte",
    materials: "Matcha powder, oat milk, honey, hot water, ice (for iced version)",
    description: "Whisk matcha with hot water until frothy. Pour over steamed oat milk and sweeten with honey.",
    image: null
  },
  {
    id: 11, category: "Item",
    name: "Basic Guitar Chords",
    materials: "Guitar, chord chart, tuner, picks",
    description: "Start with G, C, D, Em. Practice switching between chords slowly. 15 mins daily is enough.",
    image: null
  },
  {
    id: 12, category: "Dessert",
    name: "Banana Pancakes",
    materials: "Ripe banana, eggs, oat flour, baking powder, cinnamon, maple syrup, butter",
    description: "Mash banana with eggs. Mix in flour and baking powder. Cook on medium heat 2 min per side.",
    image: null
  },
  {
    id: 13, category: "Food",
    name: "Caesar Salad",
    materials: "Romaine lettuce, parmesan, croutons, caesar dressing, black pepper, lemon",
    description: "Toss lettuce with dressing. Top with croutons and shaved parmesan. Serve chilled.",
    image: null
  },
]

export default function App() {
  const [items, setItems]               = useState(MOCK_DATA)
  const [activeCategory, setCategory]   = useState("all")
  const [search, setSearch]             = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editItem, setEditItem]         = useState(null)
  const [toast, setToast]               = useState(null)
  const [sortBy, setSortBy]             = useState("id_asc")  // ← thêm

  // Filter + Search
  const filtered = items.filter(item => {
    const matchCat    = activeCategory === "all" || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
                     || item.materials?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // Sort 
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "id_asc")   return a.id - b.id
    if (sortBy === "id_desc")  return b.id - a.id
    if (sortBy === "name_az")  return a.name.localeCompare(b.name)
    if (sortBy === "name_za")  return b.name.localeCompare(a.name)
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

  const handleAdd = (newItem) => {
    const itemWithId = { ...newItem, id: items.length + 1 }
    setItems(prev => [...prev, itemWithId])
    setShowAddModal(false)
    showToast("✅ Note added!")
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