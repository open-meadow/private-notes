const ICONS = { Food: "🍜", Drink: "🥤", Dessert: "🍰", Item: "🛍️" };

export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>

        {/* Image or Icon */}
        <div style={styles.hero}>
          {item.image
            ? <img src={item.image} alt={item.name} style={styles.heroImg} />
            : <div style={styles.heroIcon}>{ICONS[item.category] || "🍽️"}</div>
          }
          <div style={styles.badge}># {item.id}</div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
          <div style={styles.heroFade} />
        </div>

        {/* Body */}
        <div style={styles.body}>
          <div style={styles.cat}>{item.category}</div>
          <div style={styles.title}>{item.name}</div>
          <div style={styles.divider} />

          {/* Materials */}
          <div style={styles.sectionLabel}>📝 Materials</div>
          <div style={{
            ...styles.textBox,
            ...(item.materials ? {} : styles.textBoxEmpty)
          }}>
            {item.materials
              ? item.materials.split(",").map((m, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start",
                  gap: "8px", marginBottom: "6px",
                }}>
                  <span style={{ color: "var(--terracotta)", marginTop: "1px" }}>•</span>
                  <span>{m.trim()}</span>
                </div>
              )) : "No materials yet."
            }
          </div>

          <div style={styles.divider} />

          {/* Description */}
          <div style={styles.sectionLabel}>📋 Description</div>
          <div style={{
            ...styles.textBox,
            ...(item.description ? {} : styles.textBoxEmpty)
          }}>
            {item.description || "Description not available."}
          </div>
        </div>

      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0, zIndex: 200,
    background: "rgba(44,26,14,0.55)", backdropFilter: "blur(6px)",
  },
  modal: {
    position: "fixed", top: "50%", left: "50%", zIndex: 201,
    transform: "translate(-50%, -50%)",
    background: "var(--cream)", borderRadius: "24px",
    width: "100%", maxWidth: "520px", maxHeight: "88vh",
    overflowY: "auto", boxShadow: "0 30px 80px rgba(44,26,14,0.3)",
    animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
  },
  hero: {
    height: "200px", background: "var(--brown-deep)",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "24px 24px 0 0", overflow: "hidden", position: "relative",
  },
  heroImg: { width: "100%", height: "100%", objectFit: "cover" },
  heroIcon: { fontSize: "72px" },
  heroFade: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
    background: "linear-gradient(to top, var(--cream), transparent)",
  },
  badge: {
    position: "absolute", top: "16px", left: "16px",
    background: "var(--gold)", color: "var(--brown-deep)",
    fontFamily: "Playfair Display, serif", fontSize: "11px",
    fontWeight: 700, padding: "4px 12px", borderRadius: "20px",
  },
  closeBtn: {
    position: "absolute", top: "16px", right: "16px",
    width: "36px", height: "36px", borderRadius: "50%",
    background: "rgba(255,255,255,0.9)", border: "none",
    cursor: "pointer", fontSize: "16px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  body: { padding: "8px 32px 36px" },
  cat: {
    fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "var(--terracotta)", fontWeight: 500, marginBottom: "6px",
    marginTop: "16px",
  },
  title: {
    fontFamily: "Playfair Display, serif", fontSize: "28px",
    fontWeight: 700, lineHeight: 1.2, color: "var(--brown-deep)",
    marginBottom: "10px",
  },
  divider: { height: "1px", background: "var(--border)", margin: "16px 0" },
  sectionLabel: {
    fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
    color: "var(--text-muted)", marginBottom: "10px", fontWeight: 500,
  },
  textBox: {
    fontSize: "14.5px", lineHeight: 1.8, color: "var(--text-main)",
    background: "#fff", borderRadius: "12px", padding: "16px 18px",
    border: "1px solid var(--border)",
  },
  textBoxEmpty: { color: "var(--text-muted)", fontStyle: "italic" },
};