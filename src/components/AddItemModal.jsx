import { useState, useEffect } from "react";

export default function AddItemModal({ onClose, onSave, editItem = null }) {
  const [name, setName]               = useState("");
  const [materials, setMaterials]     = useState("");
  const [category, setCategory]       = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview]         = useState(null);

  // Nếu là edit → điền sẵn dữ liệu cũ
  useEffect(() => {
    if (editItem) {
      setName(editItem.name || "");
      setMaterials(editItem.materials || "");
      setCategory(editItem.category || "");
      setDescription(editItem.description || "");
      setPreview(editItem.image || null);
    }
  }, [editItem]);

  const isEditing = !!editItem;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!name)     { alert("⚠️ Please enter a name!"); return; }
    if (!category) { alert("⚠️ Please choose a category!"); return; }
    onSave({ name, materials, category, description, image: preview });
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>
            {isEditing ? "✏️ Edit Note" : "📝 Add New Note"}
          </h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.body}>

          {/* Name */}
          <div style={styles.group}>
            <label style={styles.label}>Title *</label>
            <input
              style={styles.input}
              placeholder="eg: Beef Stew, How to fix a bike..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div style={styles.group}>
            <label style={styles.label}>Category *</label>
            <select style={styles.input} value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">-- Choose a category --</option>
              <option value="Food">🍜 Food</option>
              <option value="Drink">🥤 Drink</option>
              <option value="Dessert">🍰 Dessert</option>
              <option value="Item">🛍️ Item</option>
            </select>
          </div>

          {/* Materials */}
          <div style={styles.group}>
            <label style={styles.label}>Materials / Ingredients</label>
            <textarea
              style={{ ...styles.input, minHeight: "90px", resize: "vertical", lineHeight: 1.6 }}
              placeholder="eg: Beef, Onion, Garlic... or Step 1, Step 2..."
              value={materials}
              onChange={e => setMaterials(e.target.value)}
            />
          </div>

          {/* Description */}
          <div style={styles.group}>
            <label style={styles.label}>
              Description <span style={{ textTransform: "none", letterSpacing: 0, fontSize: "11px" }}>(optional)</span>
            </label>
            <textarea
              style={{ ...styles.input, minHeight: "80px", resize: "vertical", lineHeight: 1.6 }}
              placeholder="eg: A hearty winter stew, best served hot..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Image */}
          <div style={styles.group}>
            <label style={styles.label}>
              Image <span style={{ textTransform: "none", letterSpacing: 0, fontSize: "11px" }}>(optional)</span>
            </label>
            {preview ? (
              <div>
                <img src={preview} alt="preview" style={styles.previewImg} />
                <button style={styles.removeImg} onClick={() => setPreview(null)}>✕ Remove image</button>
              </div>
            ) : (
              <label style={styles.uploadBtn}>
                📷 Choose image
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button style={styles.saveBtn} onClick={handleSave}>
              {isEditing ? "💾 Save Changes" : "💾 Save Note"}
            </button>
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
    width: "100%", maxWidth: "500px", maxHeight: "90vh",
    overflowY: "auto", boxShadow: "0 30px 80px rgba(44,26,14,0.3)",
    animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
  },
  header: {
    padding: "28px 32px 20px", borderBottom: "1px solid var(--border)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Playfair Display, serif", fontSize: "22px",
    fontWeight: 700, color: "var(--brown-deep)",
  },
  closeBtn: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: "var(--cream-dark)", border: "none", cursor: "pointer", fontSize: "16px",
  },
  body: { padding: "24px 32px 32px" },
  group: { marginBottom: "18px" },
  label: {
    display: "block", fontSize: "12px", fontWeight: 500,
    letterSpacing: "1px", textTransform: "uppercase",
    color: "var(--text-muted)", marginBottom: "7px",
  },
  input: {
    width: "100%", padding: "11px 14px", background: "#fff",
    border: "1.5px solid var(--border)", borderRadius: "10px",
    fontFamily: "DM Sans, sans-serif", fontSize: "14px",
    color: "var(--text-main)", outline: "none",
  },
  previewImg: {
    width: "100%", height: "180px", objectFit: "cover",
    borderRadius: "12px", marginBottom: "8px",
  },
  removeImg: {
    background: "transparent", border: "1.5px solid var(--border)",
    borderRadius: "8px", padding: "5px 12px", fontSize: "12px",
    cursor: "pointer", color: "var(--text-muted)",
  },
  uploadBtn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "10px 20px", borderRadius: "10px",
    border: "1.5px dashed var(--border)", cursor: "pointer",
    fontSize: "14px", color: "var(--text-muted)", background: "#fff",
  },
  actions: {
    display: "flex", gap: "10px", justifyContent: "flex-end",
    marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)",
  },
  cancelBtn: {
    padding: "11px 22px", borderRadius: "10px", background: "transparent",
    border: "1.5px solid var(--border)", fontFamily: "DM Sans, sans-serif",
    fontSize: "14px", color: "var(--text-muted)", cursor: "pointer",
  },
  saveBtn: {
    padding: "11px 28px", borderRadius: "10px", background: "var(--terracotta)",
    border: "none", fontFamily: "DM Sans, sans-serif", fontSize: "14px",
    fontWeight: 500, color: "#fff", cursor: "pointer",
  },
};