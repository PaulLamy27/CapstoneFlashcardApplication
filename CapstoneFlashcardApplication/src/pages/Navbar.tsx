import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa";
import logo from '../assets/logo.png'
import axiosInstance from "../axiosInstance";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [auth, setAuth] = useState(false);
  // const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  const location = useLocation();

  // make axios use specified URL to correct API endpoint
  axiosInstance.defaults.withCredentials = true;

  // handle auth 
  useEffect(() => {
    const userToken = sessionStorage.getItem('user_token');

    if (userToken) {
      // split token and parse to access the username
      const arrayToken = userToken.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      const username = tokenPayload.username;
      // sessionStorage.setItem("username", tokenPayload.username);
      // const username = sessionStorage.getItem("username");

      // set username for profile and auth
      if (username) {
        sessionStorage.setItem("username", username);
        setName(username);
        setAuth(true);
      } else {
        console.log("username not found and thus not authed!");
        setAuth(false);
      }
    }
  }, [sessionStorage.getItem('user_token')]);

  // handle location change
  useEffect(() => {
    // Close the navbar when the location changes
    setNav(false);
  }, [location]);

  const handleNav = () => {
    setNav(!nav);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // handle scrolling
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

  const refCallback = (node) => {
    if (node) {
      document.querySelectorAll("ul > li >  a").forEach(i => i.className = "hover:bg-skin-button p-1");
    }
  }

  return (
    <div ref={refCallback} className="flex justify-between item-center h-24 max-w-full mx-auto px-4 text-skin-base">
      <Link to="/">
        <div className="flex">
          <svg width="75" height="75">
            <image href={logo} height="100%" width="100%" />
          </svg>
          <p className="text-3xl font-bold  text-skin-header">
            CARDMENTOR.
          </p>
        </div>
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
        <li className="p-4">
          {
            auth ?
              <Link to="/user">Search User</Link>
              :
              <Link to="/login">Search User</Link>
          }
        </li>
        <li className="p-4">
          {
            auth ?
              <Link to="/PublicDecks">Search Public Decks</Link>
              :
              <Link to="/login">Search user</Link>
          }
        </li>
        {
          auth ?
            <li className="p-4">
              <Link to={`/profile/${name}`}>{name}</Link>
            </li>
            :
            <li className="p-4">
              <Link to="/login">Login</Link>
            </li>
        }
      </ul>
      <div onClick={handleNav} className="block md:hidden mt-3">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-600 bg-skin-bg ease-in-out duration-500 z-50"
            : "fixed left-[-100%]"
        }
      >
        <ul className="uppercase">
          <li className="p-4 border-b border-skin-dark">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-skin-dark">
            {
              auth ?
                <Link to="/your-decks">Decks</Link>
                :
                <Link to="/login">Decks</Link>
            }
          </li>
          <li className="p-4 border-b border-skin-dark">
            {
              auth ?
                <Link to="/study">Study</Link>
                :
                <Link to="/login">Study</Link>
            }
          </li>
          <li className="p-4 border-b border-skin-dark">
            {
              auth ?
                <Link to="/user">Search user</Link>
                :
                <Link to="/login">Search user</Link>
            }
          </li>
          <li className="p-4 border-b border-skin-dark">
            {
              auth ?
                <Link to="/PublicDecks">Search Public Decks</Link>
                :
                <Link to="/login">Search user</Link>
            }
          </li>
          {
            auth ?
              <li className="p-4">
                <Link to={`/profile/${name}`}>{name}</Link>
              </li>
              :
              <li className="p-4">
                <Link to="/login">Login</Link>
              </li>
          }
        </ul>
      </div>
      <FaAngleUp
        size={40}
        className={
          showScrollToTop ? "fixed bottom-4 right-4 text-skin-header" : "hidden"
        }
        onClick={scrollToTop}
      />
    </div>
  );
};

export default Navbar;
