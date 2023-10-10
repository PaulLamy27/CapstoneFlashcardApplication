import React, { useState } from "react";
import { Link, Outlet, BrowserRouter as Router } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between item-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <Link to="/" className="text-3xl font-bold text-[#00df9a] m-4">
        CARDMENTOR.
      </Link>
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/deck">Deck</Link>
        </li>
        <li className="p-4">
          <Link to="/study">Study</Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-600 bg-[#13163b] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="uppercase p-4">
          <Link to="/" className="text-3xl font-bold text-[#00df9a] m-4">
            CARDMENTOR.
          </Link>
          <li className="p-4 border-b border-gray-600">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/deck">Deck</Link>
          </li>
          <li className="p-4">
            <Link to="/study">Study</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
