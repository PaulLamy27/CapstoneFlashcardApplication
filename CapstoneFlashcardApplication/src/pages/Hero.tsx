
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios';
import axiosInstance from '../axiosInstance';

const Hero = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  axiosInstance.defaults.withCredentials = true;
  useEffect(() => {
    const userToken = sessionStorage.getItem('user_token');

    console.log("userToken", userToken);

    try {
      if (userToken) {
        // Set the token as a common header for all requests
        // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

        const arrayToken = userToken.split('.');
        console.log("arrayToken", arrayToken);
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        console.log("tokenPayload", tokenPayload);

        setAuth(true);
        sessionStorage.setItem("username", tokenPayload.username);
        const username = sessionStorage.getItem('username');
        setName(username);
        sessionStorage.setItem("id", tokenPayload.id);
        const id = sessionStorage.getItem('id');
        console.log("id ", id);
        

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
      setMessage("Not Authenticated");
    }
  }, [])

  const handleDelete = () => {
    // axiosInstance.get('/logout')
    //   .then(res => {
    //     console.log("res: ", res);
    //     location.reload();
    //   }).catch(err => console.log(err));
    console.log("handleDelete");
  }

  return (
    <>
      <div className='text-white'>
        {
          auth ?
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
              <p className='text-[#00df9a] font-bold p-2'>GROWING WITH FLASHCARDS</p>
              <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Be your own mentor.</h1>
              <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Use CardMentor for</p>
              </div>
              <p className='md:text-2xl text-xl font-bold text-gray-500'>Create decks and add cards to study for that next big test or to simply learn</p>
              <h3>You are authorized: {name}</h3>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[#13163b]' onClick={handleDelete}>Logout</button>
            </div>
            :
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
              <p className='text-[#00df9a] font-bold p-2'>GROWING WITH FLASHCARDS</p>
              <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Be your own mentor.</h1>
              <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Use CardMentor for</p>
              </div>
              <p className='md:text-2xl text-xl font-bold text-gray-500'>Create decks and add cards to study for that next big test or to simply learn</p>
              <h3>{message}</h3>
              <Link to="/login" className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[#13163b]'>Login</Link>
            </div>
        }
      </div>
    </>

  )
}

export default Hero
