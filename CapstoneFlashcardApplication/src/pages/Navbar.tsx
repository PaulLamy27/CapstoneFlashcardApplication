import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa";
import logo from '../assets/logo.png'
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
        if (res.data.Status === "Success") {
          setAuth(true)
          setName(res.data.username)
          console.log("Username:", res.data.username);
        }
        else {
          setAuth(false)
          console.log(message);
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

  const refCallback = (node) => {
    if (node) {
      document.querySelectorAll("ul > li >  a").forEach(i => i.className = "hover:bg-skin-button p-1");
    }
  }

  return (
    <div ref={refCallback} className="flex justify-between item-center h-24 max-w-[1240px] mx-auto px-4 text-skin-base">
      <Link to="/">
        <div className="flex">
          <svg width="300" height="300" className="flex relative ml-[-235px]">
            <image href={logo} height="100%" width="100%" />
          </svg>
          <p className="text-3xl font-bold  text-skin-header m-4 ml-[-40px] mb-[240px]">
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
              <Link to="/user">Search user</Link>
              :
              <Link to="/login">Search user</Link>
          }
        </li>
        <li className="p-4">
          <Link to="/PublicDecks">Search Public Decks</Link>
        </li>
        <li>
          {
            auth ?
              null
              :
              <button className="text-skin-dark bg-skin-button w-[60px] rounded-md font-medium my-4">
                <Link to="/login">Login</Link>
              </button>
          }
        </li>
        <li>
          {
            auth ?
              <button className="text-skin-dark bg-skin-button w-[80px] rounded-md font-medium my-4">
                <Link to={`/profile/${name}`}><p>{name}</p></Link>
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
            ? "fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-600 bg-skin-bg ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="uppercase p-4">
          <Link to="/" className="text-3xl font-bold text-skin-header m-4">
            CARDMENTOR.
          </Link>
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
            <Link to="/PublicDecks">Search Public Decks</Link>
          </li>
          <li>
            {
              auth ?
                null
                :
                <button className="text-skin-dark bg-skin-button w-[75px] rounded-md font-medium my-6 mx-1 uppercase">
                  <Link to="/login">Login</Link>
                </button>
            }
          </li>
          <li>
            {
              auth ?
                <button className="text-skin-dark bg-skin-button w-[80px] rounded-md font-medium my-4">
                  <Link to={`/profile/${name}`}>{name}</Link>
                </button>
                :
                null
            }
          </li>
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
