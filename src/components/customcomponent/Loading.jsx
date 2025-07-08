import React from "react";

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <div style={styles.text}>
        Loading
        <span style={styles.dots}>...</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#3b82f6",
    fontFamily: "Arial, sans-serif",
    fontSize: "1.5rem",
  },
  spinner: {
    width: 60,
    height: 60,
    border: "6px solid #3b82f6",
    borderTop: "6px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: 20,
  },
  text: {
    fontWeight: "bold",
  },
  dots: {
    animation: "blink 1.4s infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "@keyframes blink": {
    "0%, 80%, 100%": { opacity: 0 },
    "40%": { opacity: 1 },
  },
};

// For inline styles, keyframe animations must be added in CSS separately.
// So, add this CSS somewhere in your global CSS or style tag:

/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
*/

export default Loading;
