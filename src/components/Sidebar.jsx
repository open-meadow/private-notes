
const CATEGORIES = [
  { key: "all",     icon: "🍽️", label: "All" },
  { key: "Food",    icon: "🍜", label: "Food" },
  { key: "Drink",   icon: "🥤", label: "Drink" },
  { key: "Dessert", icon: "🍰", label: "Dessert" },
  { key: "Item",    icon: "🛍️", label: "Item" },
];

export default function Sidebar({ activeCategory, onCategoryChange, onSearch, onAddNew, counts = {} }) {
  return (
    <aside style={styles.sidebar}>

      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.tagline}>Your Almighty Notes</div>
        <h1 style={styles.h1}>
          Paper<span style={{ color: "var(--gold)" }}>less</span>
        </h1>
      </div>

      {/* Search */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="🔍  Search notes..."
          style={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div style={styles.categories}>
        <div style={styles.catLabel}>Categories</div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            style={{
              ...styles.catBtn,
              ...(activeCategory === cat.key ? styles.catBtnActive : {}),
            }}
            onClick={() => onCategoryChange(cat.key)}
          >
            <span>{cat.icon}</span>
            <span style={{ flexGrow: 1 }}>{cat.label}</span>
            <span style={{
              ...styles.countBadge,
              ...(activeCategory === cat.key ? styles.countBadgeActive : {}),
            }}>
              {cat.key === "all" ? counts.all ?? 0 : counts[cat.key] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Add Button */}
      <div style={styles.bottom}>
        <button style={styles.addBtn} onClick={onAddNew}>
          ＋ Add New Note
        </button>
      </div>

  

    </aside>
  );
}

const styles = {
  sidebar: {
    position: "fixed", left: 0, top: 0, bottom: 0, width: "260px",
    background: "var(--brown-deep)", display: "flex",
    flexDirection: "column", boxShadow: "4px 0 30px rgba(44,26,14,0.25)",
    zIndex: 100,
  },
  logo: {
    padding: "36px 28px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  tagline: {
    fontFamily: "Lora, serif", fontStyle: "italic",
    fontSize: "11px", color: "rgba(255,255,255,0.4)",
    letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px",
  },
  h1: {
    fontFamily: "Playfair Display, serif", fontSize: "22px",
    fontWeight: 700, color: "var(--cream)",
  },
  searchBox: { padding: "20px 20px 0" },
  searchInput: {
    width: "100%", background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px",
    padding: "10px 14px", color: "var(--cream)",
    fontFamily: "DM Sans, sans-serif", fontSize: "13px", outline: "none",
  },
  categories: { padding: "20px 16px 10px" },
  catLabel: {
    fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)", padding: "0 12px", marginBottom: "8px",
  },
  catBtn: {
    display: "flex", alignItems: "center", gap: "10px",
    width: "100%", padding: "10px 12px",
    background: "transparent", border: "none", borderRadius: "10px",
    color: "rgba(255,255,255,0.65)", fontFamily: "DM Sans, sans-serif",
    fontSize: "13.5px", cursor: "pointer", textAlign: "left",
  },
  catBtnActive: {
    background: "rgba(200,150,62,0.18)",
    color: "var(--gold)",
  },
  countBadge: {
    fontSize: "11px", background: "rgba(255,255,255,0.1)",
    borderRadius: "20px", padding: "1px 8px",
    color: "rgba(255,255,255,0.4)", minWidth: "24px", textAlign: "center",
  },
  countBadgeActive: {
    background: "rgba(200,150,62,0.3)",
    color: "var(--gold)",
  },
  bottom: {
    marginTop: "auto", padding: "20px 20px 12px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  addBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", width: "100%", background: "var(--terracotta)",
    border: "none", borderRadius: "12px", color: "#fff",
    fontFamily: "DM Sans, sans-serif", fontSize: "14px",
    fontWeight: 500, padding: "13px", cursor: "pointer",
  },
};
