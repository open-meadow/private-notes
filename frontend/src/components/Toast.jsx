export default function Toast({ message, type = "success" }) {
  return (
    <div style={{
      ...styles.toast,
      borderLeft: type === "success"
        ? "4px solid #6abf69"
        : "4px solid #e57373",
    }}>
      {message}
    </div>
  );
}


const styles = {
  toast: {
    position: "fixed", bottom: "28px", right: "28px", zIndex: 500,
    background: "var(--brown-deep)", color: "var(--cream)",
    padding: "14px 22px", borderRadius: "12px", fontSize: "14px",
    boxShadow: "0 8px 30px rgba(44,26,14,0.25)",
    fontFamily: "DM Sans, sans-serif",
    animation: "slideUp 0.3s ease",
  },
};