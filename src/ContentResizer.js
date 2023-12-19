import React, { useEffect, useState } from "react";

const ContentResizer = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && (event.key === "+" || event.key === "=")) {
        setFontSize((prevSize) => Math.min(prevSize + 10, 100));
        event.preventDefault();
      } else if (event.metaKey && event.key === "-") {
        setFontSize((prevSize) => Math.max(5, prevSize - 10));
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={{ fontSize: `${fontSize}px`, cursor: "pointer" }}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          style: { fontSize: `${fontSize}px` },
        })
      )}
    </div>
  );
};

export default ContentResizer;
