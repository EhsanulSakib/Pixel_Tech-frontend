// src/components/ThemeScript.js

'use client';  // This is a client-side component

import { useEffect } from "react";

const ThemeScript = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;  

    const toggleTheme = () => {
      const currentTheme = document.body.className === 'light' ? 'dark' : 'light';
      document.body.className = currentTheme;
      localStorage.setItem('theme', currentTheme);  
    };

    
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', toggleTheme);
      }
    };
  }, []);

  return null;
};

export default ThemeScript;
