import React, { useEffect, useState } from 'react'
import lightButton from '../../assets/Dark.png'
import darkButton from '../../assets/Light.png'

const DarkMode = () => {
    const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
    
  const element = document.documentElement;

   useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
    }, [theme]);

  return (
    <div className="relative">

      <img
        src={lightButton}
        alt="Switch to dark mode"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-10 cursor-pointer transition-all duration-300 absolute right-0 top-0 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />

   
      <img
        src={darkButton}
        alt="Switch to light mode"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`w-10 cursor-pointer transition-all duration-300 absolute right-0 top-0 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default DarkMode;