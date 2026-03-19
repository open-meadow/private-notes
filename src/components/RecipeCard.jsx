const ICONS = { Food: "🍜", Drink: "🥤", Dessert: "🍰", Item: "🛍️" };

export default function RecipeCard({ item, onClick, onDelete, onEdit }) {
  return (
    <div style={styles.card}>

      {/* image or icon */}
      <div style={styles.cardImg} onClick={() => onClick(item)}>
        {item.image
          ? <img src={item.image} alt={item.name} style={styles.img} />
          : <div style={styles.icon}>{ICONS[item.category] || "📝"}</div>
        }
        <div style={styles.badge}># {item.id}</div>
      </div>

      {/* the content on the main page*/}
      <div style={styles.body} onClick={() => onClick(item)}>
        <div style={styles.category}>{item.category}</div>
        <div style={styles.title}>{item.name}</div>
        {item.materials && (
          <div style={styles.materials}>
            📝 {item.materials.length > 60
              ? item.materials.substring(0, 60) + "..."
              : item.materials}
          </div>
        )}
      </div>

      {/* button to Edit and Delete*/}
      <div style={styles.footer}>
        <span style={styles.hint}>Click to view ›</span>
        <div style={styles.actions}>
          <button
            style={styles.editBtn}
            onClick={e => { e.stopPropagation(); onEdit(item); }}
          >
            ✏️ Edit
          </button>
          <button
            style={styles.deleteBtn}
            onClick={e => { e.stopPropagation(); onDelete(item.id); }}
          >
            🗑️
          </button>
        </div>
      </div>

    </div>
  );
}

const styles = {
  card: {
    background: "#fff", borderRadius: "16px", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(44,26,14,0.07)",
    animation: "fadeUp 0.5s ease both",
    display: "flex", flexDirection: "column",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
  cardImg: {
    height: "160px", background: "var(--cream-dark)",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden", cursor: "pointer",
  },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  icon: { fontSize: "52px" },
  badge: {
    position: "absolute", top: "10px", left: "10px",
    background: "var(--brown-deep)", color: "var(--gold)",
    fontFamily: "Playfair Display, serif", fontSize: "11px",
    fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
  },
  body: {
    padding: "16px 18px 12px", cursor: "pointer", flexGrow: 1,
  },
  category: {
    fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    color: "var(--terracotta)", marginBottom: "6px", fontWeight: 500,
  },
  title: {
    fontFamily: "Playfair Display, serif", fontSize: "17px",
    fontWeight: 600, lineHeight: 1.35, color: "var(--brown-deep)",
    marginBottom: "8px",
  },
  materials: {
    fontSize: "12px", color: "var(--text-muted)",
    lineHeight: 1.5, fontStyle: "italic",
  },
  footer: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 14px 12px", borderTop: "1px solid var(--cream-dark)",
  },
  hint: {
    fontSize: "11px", color: "rgba(160,98,42,0.6)", fontStyle: "italic",
  },
  actions: { display: "flex", gap: "6px" },
  editBtn: {
    padding: "5px 12px", borderRadius: "8px", fontSize: "12px",
    background: "var(--cream)", border: "1px solid var(--border)",
    cursor: "pointer", color: "var(--brown-mid)", fontFamily: "DM Sans, sans-serif",
  },
  deleteBtn: {
    padding: "5px 10px", borderRadius: "8px", fontSize: "13px",
    background: "#fff0f0", border: "1px solid #ffcccc",
    cursor: "pointer",
  },
};