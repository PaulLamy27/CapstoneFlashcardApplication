import React, { useState, useEffect } from "react";
import { Link, Outlet, BrowserRouter as Router } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000')
    .then(res => {
      if(res.data.Status === "Success") {
        setAuth(true)
        setName(res.data.username)
        console.log("Username:", res.data.username);
      }
      else {
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleNav = () => {
    setNav(!nav);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Show the scroll-to-top button when the user scrolls past a certain threshold (adjust as needed)
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {
            auth ?
            <Link to="/your-decks">Decks</Link>
            :
            <Link to="/login">Decks</Link>
          }
        </li>
        <li className="p-4">
          {
            auth ?
            <Link to="/study">Study</Link>
            :
            <Link to="/login">Study</Link>
          }
        </li>
        <li>
          {
            auth ?
            null
            :
            <button className="text-[#13163b] bg-[#00df9a] w-[60px] rounded-md font-medium my-4">
            <Link to="/login">Login</Link>
          </button>
          }
        </li>
        <li>
          {
            auth ?
            <button className="text-[#13163b] bg-[#00df9a] w-[80px] rounded-md font-medium my-4">
            <Link to="/profile">{name}</Link>
            </button>
            :
            null            
          }
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
          {
            auth ?
            <Link to="/your-decks">Decks</Link>
            :
            <Link to="/login">Decks</Link>
          }
          </li>
          <li className="p-4 border-b border-gray-600">
          {
            auth ?
            <Link to="/study">Study</Link>
            :
            <Link to="/login">Study</Link>
          }
          </li>
          <li>
            {
              auth ?
              null
              :
              <button className="text-[#13163b] bg-[#00df9a] w-[75px] rounded-md font-medium my-6 mx-1 uppercase">
              <Link to="/login">Login</Link>
            </button>
            }
          </li>
        </ul>
      </div>
      <FaAngleUp
        size={40}
        className={
          showScrollToTop ? "fixed bottom-4 right-4 text-[#00df9a]" : "hidden"
        }
        onClick={scrollToTop}
      />
    </div>
  );
};

export default Navbar;
