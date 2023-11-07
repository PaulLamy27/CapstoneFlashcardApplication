
import React, { useState, useEffect } from 'react'
//import ReactTyped from 'react-typed'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Hero = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    // fix this
    axios.get('http://localhost:5000')
    .then(res => {
      if(res.data.Status === "Success") {
        setAuth(true)
        setName(res.data.name)
      }
      else {
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
    .then(err => console.log(err));
  }, [])

  const handleDelete = () => {
    axios.get('http://localhost:5000/logout')
    .then(res => {
      location.reload();
    }).catch(err => console.log(err));
  }
  return (
    <div className='text-white'>
      {
        auth ?
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold p-2'>GROWING WITH FLASHCARDS</p>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Be your own mentor.</h1>
          <div className='flex justify-center items-center'>
            <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Use CardMentor for</p>
            {/* <ReactTyped className='md:text-5xl sm:text:4xl text-xl font-bold md:pl-4 pl-2' strings={['languages', 'math', 'science', 'anything']} typeSpeed={120} backSpeed={140} loop /> */}
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
            {/* <ReactTyped className='md:text-5xl sm:text:4xl text-xl font-bold md:pl-4 pl-2' strings={['languages', 'math', 'science', 'anything']} typeSpeed={120} backSpeed={140} loop /> */}
          </div>
          <p className='md:text-2xl text-xl font-bold text-gray-500'>Create decks and add cards to study for that next big test or to simply learn</p>
          <h3>{message}</h3>
          <Link to="/login" className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[#13163b]'>Login</Link>
        </div>
      }
    </div>

  )
}

export default Hero