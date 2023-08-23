import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("home");

  const handleClick = (link: string, e: any) => {
    e.preventDefault();
    setActiveLink(link);
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-56 p-4 mx-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <ul>
        <li
          className={`mb-2 cursor-pointer ${
            activeLink === "contact" && "text-red-400"
          }`}
          onClick={(e) => handleClick("contact", e)}
        >
          <Link to="/contact">Contact</Link>
        </li>
        <li
          className={`mb-2 cursor-pointer  ${
            activeLink === "map" && "text-red-400"
          }`}
          onClick={(e) => handleClick("map", e)}
        >
          <Link to="/map">Chart and Map</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
