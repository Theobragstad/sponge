import React, { useEffect, useState } from 'react';

const ContentResizer = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // Initial font size in pixels

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && (event.key === '+' || event.key === '=')) {
        // Increase font size by 10, with a maximum of 40px
        setFontSize((prevSize) => Math.min(prevSize + 10, 100));
        event.preventDefault(); // Prevent the default browser zoom
      } else if (event.metaKey && event.key === '-') {
        // Decrease font size by 10, with a minimum of 5px
        setFontSize((prevSize) => Math.max(5, prevSize - 10));
        event.preventDefault(); // Prevent the default browser zoom
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    // <div style={{ fontSize: `${fontSize}px`,cursor:'pointer' }}>
    //   {children}
    // </div>
    <div style={{ fontSize: `${fontSize}px`, cursor: 'pointer' }}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          style: { fontSize: `${fontSize}px` },
        })
      )}
    </div>
  );
};

export default ContentResizer;



