import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa";
//import axios from "axios";
import axiosInstance from "../axiosInstance";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [auth, setAuth] = useState(false);
  // const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  axiosInstance.defaults.withCredentials = true;

  useEffect(() => {
    const userToken = sessionStorage.getItem('user_token');
    console.log("userToken in navbar useffect: ", userToken);
    const username = sessionStorage.getItem('username');
    console.log("username: ", username);
    try {
      if (username) {
        setAuth(true);
        if (auth) {
          console.log("auth", auth);
        }
        setName(username);
        // Set the token as a common header for all requests
        // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

        // const arrayToken = userToken.split('.');
        // console.log("arrayToken", arrayToken);
        // const tokenPayload = JSON.parse(atob(arrayToken[1]));
        // console.log("tokenPayload", tokenPayload);

        // setAuth(true);
        // sessionStorage.setItem("username", tokenPayload.username);
        // const username = sessionStorage.getItem('username');
        // setName(username);
        // sessionStorage.setItem("id", tokenPayload.id);
        // const id = sessionStorage.getItem('id');
        // console.log("id ", id);


        // Make the request to '/'
        // axiosInstance.get('/')
        //   .then(res => {
        //     if (res.data.Status === "Success") {
        //       setAuth(true)
        //       setName(res.data.username)
        //       console.log("Username ", res.data.username)
        //     } else {
        //       setAuth(false)
        //       setMessage(res.data.Error)
        //       console.log("Username NOT set")
        //     }
        //   })
        //   .catch(err => console.log(err));
      }
    } catch (error) {
      console.log("error in useEffect: ", error);
      setAuth(false);
      // setMessage("Not Authenticated");
    }


    // if (userToken) {
    //   // Set the token as a common header for all requests
    //   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

    //   // get '/' => route at 'api/' => verifyUser 
    //   axiosInstance.get('/')
    //     // axios.get('http://localhost:5000/')
    //     .then(res => {
    //       if (res.data.Status === "Success") {
    //         setAuth(true)
    //         setName(res.data.username)
    //         console.log("Username:", res.data.username);
    //       }
    //       else {
    //         setAuth(false)
    //         console.log("error with navbar: ", message);
    //         setMessage(res.data.Error)
    //       }
    //     })
    //     .catch(err => console.log(err));
    // }

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
      <Link to="/" className="text-3xl font-bold text-skin-header m-4">
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
