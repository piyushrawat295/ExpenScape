import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed); // Adjust speed here if needed
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <p className="text-gray-800 text-lg font-serif ">{displayedText}</p>;
};

export default Typewriter;
